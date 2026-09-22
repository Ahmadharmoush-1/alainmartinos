/** Thin lavender rule with a small centered mark — the site's chapter divider. */
export function Divider({ className = "", light = false }: { className?: string; light?: boolean }) {
  const line = light ? "bg-night-hover/40" : "bg-night-hover";
  const mark = light ? "text-lilac" : "text-bright";
  return (
    <div aria-hidden="true" className={`flex items-center gap-4 ${className}`}>
      <span className={`h-px flex-1 ${line}`} />
      <svg viewBox="0 0 24 24" className={`h-4 w-4 ${mark}`} fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M12 3c0 5-3 7-3 9a3 3 0 0 0 6 0c0-2-3-4-3-9zM12 21v-6" strokeLinecap="round" />
      </svg>
      <span className={`h-px flex-1 ${line}`} />
    </div>
  );
}
