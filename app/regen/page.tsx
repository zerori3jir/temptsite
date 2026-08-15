"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Nav from "@/app/components/Nav";

interface Params {
  mass: number;
  motorPower: number;
  motorKv: number;
  batteryVoltage: number;
  batteryCapacity: number;
  regenAggression: number;
  wheelRadius: number;
}

interface SimState {
  speed: number;
  soc: number;
  power: number;
  energyRecovered: number;
  accelerating: boolean;
  active: boolean;
}

const MAX_REGEN_CURRENT = 15;
const REGEN_EFFICIENCY = 0.85;
const MOTOR_EFFICIENCY = 0.88;
const MAX_REGEN_DECEL = 1.2;
const HISTORY_LEN = 300;
const MAX_SPEED_MS = 50 / 3.6;
const MAX_DRIVE_FORCE = 120;
const CR = 0.005;        // rolling resistance coefficient (tyre on pavement)
const CDA = 0.55;        // drag coefficient × frontal area (m²), upright cyclist
const RHO = 1.225;       // air density (kg/m³)

const DEFAULT_PARAMS: Params = {
  mass: 85,
  motorPower: 500,
  motorKv: 4,
  batteryVoltage: 48,
  batteryCapacity: 480,
  regenAggression: 1.0,
  wheelRadius: 0.33,
};

function makeInitialState(): SimState {
  return { speed: 0, soc: 0.8, power: 0, energyRecovered: 0, accelerating: false, active: false };
}


export default function RegenPage() {
  const speedChartRef = useRef<HTMLCanvasElement>(null);
  const socChartRef = useRef<HTMLCanvasElement>(null);
  const powerChartRef = useRef<HTMLCanvasElement>(null);
  const driveBarRef = useRef<HTMLDivElement>(null);
  const regenBarRef = useRef<HTMLDivElement>(null);
  const barRegenFracRef = useRef(0);
  const barDriveFracRef = useRef(0);

  const [params, setParams] = useState<Params>(DEFAULT_PARAMS);
  const [display, setDisplay] = useState<SimState>(makeInitialState());
  const [paramsOpen, setParamsOpen] = useState(false);

  const stateRef = useRef<SimState>(makeInitialState());
  const paramsRef = useRef<Params>(DEFAULT_PARAMS);
  const historyRef = useRef<{ speed: number; soc: number; power: number }[]>([]);
  const lastTRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  paramsRef.current = params;

  const setParam = (key: keyof Params, value: number) =>
    setParams((p) => ({ ...p, [key]: value }));

  const physicsStep = useCallback((dt: number) => {
    const s = stateRef.current;
    const p = paramsRef.current;
    if (!s.active) return;

    let { speed, soc, energyRecovered } = s;
    let power = 0;

    const rollForce = CR * p.mass * 9.81;
    const dragForce = 0.5 * RHO * CDA * speed * speed;
    const resistForce = rollForce + dragForce;

    if (s.accelerating) {
      const driveForce = Math.min(p.motorPower / Math.max(speed, 0.5), MAX_DRIVE_FORCE);
      const netForce = driveForce - resistForce;
      speed = Math.min(Math.max(0, speed + (netForce / p.mass) * dt), MAX_SPEED_MS);
      const powerUsed = (driveForce * Math.max(speed, 0.1)) / MOTOR_EFFICIENCY;
      soc = Math.max(0, soc - (powerUsed * dt) / 3600 / p.batteryCapacity);
      power = -powerUsed;
    } else if (speed > 0.01) {
      const regenDecel = p.regenAggression * MAX_REGEN_DECEL;
      const passiveDecel = resistForce / p.mass;
      const prevSpeed = speed;
      speed = Math.max(0, speed - (regenDecel + passiveDecel) * dt);
      const avgSpeed = (prevSpeed + speed) / 2;
      // only the motor's regen portion generates electricity — passive drag does not
      const mechPower = regenDecel * p.mass * avgSpeed;
      power = Math.min(mechPower * REGEN_EFFICIENCY, MAX_REGEN_CURRENT * p.batteryVoltage * REGEN_EFFICIENCY);
      const dWh = (power * dt) / 3600;
      energyRecovered += dWh;
      soc = Math.min(1, soc + dWh / p.batteryCapacity);
    } else {
      speed = 0;
    }

    const next: SimState = { ...s, speed, soc, power, energyRecovered };
    stateRef.current = next;
    setDisplay(next);
    historyRef.current.push({ speed, soc, power });
    if (historyRef.current.length > HISTORY_LEN) historyRef.current.shift();
  }, []);

  const drawChart = useCallback(
    (canvas: HTMLCanvasElement | null, data: number[], color: string, label: string, unit: string) => {
      if (!canvas || data.length < 2) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const W = canvas.width, H = canvas.height;
      const PL = 44, PB = 18, PT = 24;
      const CW = W - PL - 8, CH = H - PT - PB;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#fafafa";
      ctx.fillRect(0, 0, W, H);

      const max = Math.max(...data, 1);

      ctx.strokeStyle = "#efefef";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 3; i++) {
        const y = PT + (CH * i) / 3;
        ctx.beginPath(); ctx.moveTo(PL, y); ctx.lineTo(W - 8, y); ctx.stroke();
      }

      ctx.fillStyle = "#a3a3a3";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(max.toFixed(0), PL - 4, PT + 4);
      ctx.fillText("0", PL - 4, PT + CH + 4);
      ctx.fillStyle = "#737373";
      ctx.textAlign = "left";
      ctx.fillText(`${label} (${unit})`, PL + 2, PT - 8);

      const pts = data.map((v, i) => ({
        x: PL + (i / (HISTORY_LEN - 1)) * CW,
        y: PT + CH - (Math.abs(v) / max) * CH,
      }));

      const splinePath = () => {
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 0; i < pts.length - 1; i++) {
          const p0 = pts[Math.max(0, i - 1)];
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const p3 = pts[Math.min(pts.length - 1, i + 2)];
          const cp1x = p1.x + (p2.x - p0.x) / 6;
          const cp1y = p1.y + (p2.y - p0.y) / 6;
          const cp2x = p2.x - (p3.x - p1.x) / 6;
          const cp2y = p2.y - (p3.y - p1.y) / 6;
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }
      };

      const lastX = pts[pts.length - 1].x;
      ctx.beginPath();
      splinePath();
      ctx.lineTo(lastX, PT + CH);
      ctx.lineTo(PL, PT + CH);
      ctx.closePath();
      ctx.fillStyle = color + "18";
      ctx.fill();

      ctx.beginPath();
      splinePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      ctx.stroke();
    },
    []
  );

  useEffect(() => {
    const loop = (t: number) => {
      if (lastTRef.current === 0) lastTRef.current = t;
      const dt = Math.min((t - lastTRef.current) / 1000, 0.05);
      lastTRef.current = t;
      physicsStep(dt);

      // Power bar — exponential smoothing toward physics target, frame-rate independent
      const ps = stateRef.current;
      const pp = paramsRef.current;
      const maxRegen = MAX_REGEN_CURRENT * pp.batteryVoltage * REGEN_EFFICIENCY;
      const targetRegen = ps.power > 0 ? Math.min(ps.power / maxRegen, 1) : 0;
      const targetDrive = ps.power < 0 ? Math.min(-ps.power / pp.motorPower, 1) : 0;
      const smooth = 1 - Math.exp(-dt / 0.12); // 120ms time constant
      barRegenFracRef.current += (targetRegen - barRegenFracRef.current) * smooth;
      barDriveFracRef.current += (targetDrive - barDriveFracRef.current) * smooth;
      if (regenBarRef.current) regenBarRef.current.style.height = `${barRegenFracRef.current * 50}%`;
      if (driveBarRef.current) driveBarRef.current.style.height = `${barDriveFracRef.current * 50}%`;

      const h = historyRef.current;
      drawChart(speedChartRef.current, h.map((x) => x.speed * 3.6), "#171717", "Speed", "km/h");
      drawChart(socChartRef.current, h.map((x) => x.soc * 100), "#3b82f6", "Battery", "%");
      drawChart(powerChartRef.current, h.map((x) => x.power), "#22c55e", "Power", "W");
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [physicsStep, drawChart]);

  const setAccelerating = (val: boolean) => {
    const next = { ...stateRef.current, accelerating: val, active: true };
    stateRef.current = next;
    setDisplay(next);
  };

  const handleReset = () => {
    historyRef.current = [];
    lastTRef.current = 0;
    const init = makeInitialState();
    stateRef.current = init;
    setDisplay(init);
  };

  const controls = [
    { key: "mass" as const, label: "Vehicle Mass", unit: "kg", min: 40, max: 200, step: 1 },
    { key: "motorPower" as const, label: "Motor Power", unit: "W", min: 100, max: 1500, step: 50 },
    { key: "motorKv" as const, label: "Motor Kv", unit: "RPM/V", min: 1, max: 20, step: 0.5 },
    { key: "batteryVoltage" as const, label: "Battery Voltage", unit: "V", min: 24, max: 72, step: 12 },
    { key: "batteryCapacity" as const, label: "Battery Capacity", unit: "Wh", min: 100, max: 1000, step: 50 },
    { key: "regenAggression" as const, label: "Regen Aggressiveness", unit: "%", min: 0.1, max: 1, step: 0.05 },
  ];

  const regenPower = display.power > 0 ? display.power : 0;
  const drivePower = display.power < 0 ? Math.abs(display.power) : 0;
  const recoveredMWh = display.energyRecovered * 1000;
  const recoveredPct = (display.energyRecovered / params.batteryCapacity) * 100;

  return (
    <>
      <Nav />
      <main className="max-w-screen-xl mx-auto px-6 py-8 flex flex-col gap-6">

        <h1 className="text-3xl font-semibold tracking-tight leading-none">Regen Braking</h1>

        <div className="grid grid-cols-[200px_1fr] gap-5 items-start">

          {/* Left: power bar + live stats */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] tracking-widest uppercase text-neutral-400 mb-1">Live</p>
            <div className="flex gap-2 items-stretch">
              <div className="w-4 self-stretch bg-neutral-100 relative overflow-hidden flex-shrink-0" style={{ borderRadius: 3 }}>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-300" style={{ transform: "translateY(-50%)" }} />
                <div ref={driveBarRef} className="absolute left-0 right-0 bg-neutral-300" style={{ bottom: "50%", height: "0%" }} />
                <div ref={regenBarRef} className="absolute left-0 right-0 bg-green-500" style={{ top: "50%", height: "0%" }} />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="bg-neutral-50 px-3 py-3 rounded-sm">
                  <p className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1">Speed</p>
                  <p className="text-4xl font-semibold font-mono leading-none tabular-nums">{(display.speed * 3.6).toFixed(1)}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">km/h</p>
                </div>
                <div className="bg-neutral-50 px-3 py-3 rounded-sm">
                  <p className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1">Battery</p>
                  <p className="text-4xl font-semibold font-mono leading-none tabular-nums">{(display.soc * 100).toFixed(1)}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">%</p>
                </div>
                <div className={`px-3 py-3 rounded-sm transition-colors duration-300 ${regenPower > 5 ? "bg-green-50" : "bg-neutral-50"}`}>
                  <p className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1">Regen Power</p>
                  <p className={`text-4xl font-semibold font-mono leading-none tabular-nums transition-colors duration-300 ${regenPower > 5 ? "text-green-700" : ""}`}>{regenPower.toFixed(0)}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">W</p>
                </div>
                <div className={`px-3 py-3 rounded-sm transition-colors duration-300 ${drivePower > 5 ? "bg-blue-50" : "bg-neutral-50"}`}>
                  <p className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1">Drive Power</p>
                  <p className={`text-4xl font-semibold font-mono leading-none tabular-nums transition-colors duration-300 ${drivePower > 5 ? "text-blue-700" : ""}`}>{drivePower.toFixed(0)}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">W</p>
                </div>
                <div className="bg-neutral-50 px-3 py-3 rounded-sm">
                  <p className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1">Recovered</p>
                  <p className="text-2xl font-semibold font-mono leading-none tabular-nums">{recoveredMWh.toFixed(1)}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">mWh</p>
                  <p className="text-sm font-semibold font-mono text-neutral-500 mt-1">+{recoveredPct.toFixed(3)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: charts */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] tracking-widest uppercase text-neutral-400 mb-1">History</p>
            <canvas ref={speedChartRef} width={600} height={120} className="w-full border border-neutral-100 rounded-sm" />
            <canvas ref={socChartRef} width={600} height={120} className="w-full border border-neutral-100 rounded-sm" />
            <canvas ref={powerChartRef} width={600} height={120} className="w-full border border-neutral-100 rounded-sm" />
          </div>
        </div>

        {/* Accelerate + Reset */}
        <div className="flex gap-2">
          <button
            onMouseDown={() => setAccelerating(true)}
            onMouseUp={() => setAccelerating(false)}
            onMouseLeave={() => setAccelerating(false)}
            onTouchStart={(e) => { e.preventDefault(); setAccelerating(true); }}
            onTouchEnd={() => setAccelerating(false)}
            className={`flex-1 text-white text-sm font-semibold py-4 rounded-sm select-none transition-colors duration-200 ${display.accelerating ? "bg-neutral-500" : "bg-neutral-900 hover:bg-neutral-700"}`}
            style={{ userSelect: "none", WebkitUserSelect: "none" }}
          >
            {display.accelerating ? "Accelerating..." : "Hold to Accelerate"}
          </button>
          <button onClick={handleReset} className="px-6 border border-neutral-200 text-neutral-500 text-sm rounded-sm hover:bg-neutral-50 transition-colors duration-200">
            Reset
          </button>
        </div>

        {/* Collapsible parameters */}
        <div className="border border-neutral-200 rounded-sm overflow-hidden">
          <button
            onClick={() => setParamsOpen((o) => !o)}
            className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
          >
            <span>Parameters</span>
            <span
              className="text-neutral-400 inline-block transition-transform duration-300"
              style={{ transform: paramsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              ▾
            </span>
          </button>
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: paramsOpen ? "300px" : "0px" }}
          >
            <div className="px-5 pb-5 pt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-5 border-t border-neutral-100">
              {controls.map(({ key, label, unit, min, max, step }) => {
                const raw = params[key];
                const val = key === "regenAggression" ? `${(raw * 100).toFixed(0)}%` : `${raw} ${unit}`;
                return (
                  <div key={key}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-neutral-500">{label}</span>
                      <span className="font-semibold font-mono text-neutral-900">{val}</span>
                    </div>
                    <input
                      type="range" min={min} max={max} step={step} value={raw}
                      onChange={(e) => setParam(key, parseFloat(e.target.value))}
                      className="w-full accent-neutral-900 h-1"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
