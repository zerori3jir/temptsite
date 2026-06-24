export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 py-8 px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-neutral-400">
        <span className="font-semibold tracking-tight text-neutral-900">TEMPT</span>
<span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
