const bars = [38, 52, 46, 64, 58, 76, 88];

/** Abstract website and SaaS interface mockup built entirely with CSS. */
export function DevCreatesVisual() {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(ellipse_at_top_right,#1b2756_0%,#0b1020_65%)]"
      role="img"
      aria-label="Illustration of a website and SaaS dashboard interface"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />

      <div aria-hidden="true" className="absolute top-[12%] left-[7%] w-[70%] overflow-hidden rounded-xl border border-white/15 bg-[#0f1629] shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="ml-3 h-3 flex-1 rounded-full bg-white/8" />
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <span className="h-2.5 w-14 rounded-full bg-electric/80" />
            <span className="flex gap-2">
              <span className="h-2 w-8 rounded-full bg-white/15" />
              <span className="h-2 w-8 rounded-full bg-white/15" />
              <span className="h-2 w-8 rounded-full bg-white/15" />
            </span>
          </div>
          <div className="grid grid-cols-5 gap-3 pt-2">
            <div className="col-span-3 space-y-2">
              <span className="block h-3.5 w-full rounded bg-white/80" />
              <span className="block h-3.5 w-4/5 rounded bg-white/80" />
              <span className="block h-2 w-full rounded bg-white/15" />
              <span className="block h-2 w-3/4 rounded bg-white/15" />
              <span className="mt-3 block h-5 w-20 rounded-full bg-electric" />
            </div>
            <div className="col-span-2 rounded-lg bg-gradient-to-br from-electric/60 to-electric-300/20" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[0, 1, 2].map((item) => (
              <span key={item} className="h-10 rounded-md border border-white/10 bg-white/[0.04]" />
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="animate-float-slow absolute right-[6%] bottom-[10%] w-[46%] rounded-xl border border-white/15 bg-navy/90 p-3.5 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.6rem] tracking-wider text-steel">SAAS DASHBOARD</span>
          <span className="h-2 w-8 rounded-full bg-emerald-400/70" />
        </div>
        <div className="mt-3 flex h-16 items-end gap-1.5">
          {bars.map((height, index) => (
            <span
              key={index}
              className="flex-1 rounded-t bg-gradient-to-t from-electric/40 to-electric"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="absolute top-[8%] right-[6%] flex items-center gap-2 rounded-full border border-white/10 bg-navy/80 px-3 py-1.5 font-mono text-[0.65rem] tracking-wider text-electric-300 backdrop-blur">
        &lt;/&gt; WEB · SAAS
      </div>
    </div>
  );
}
