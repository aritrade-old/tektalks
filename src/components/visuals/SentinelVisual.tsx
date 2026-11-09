const nodes = [
  { x: 60, y: 70 },
  { x: 120, y: 40 },
  { x: 330, y: 50 },
  { x: 370, y: 120 },
  { x: 50, y: 200 },
  { x: 350, y: 230 },
  { x: 110, y: 260 },
  { x: 300, y: 285 },
];

/** Abstract session-security illustration: layered shield, monitored sessions and a flagged anomaly. */
export function SentinelVisual() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(ellipse_at_center,#14204a_0%,#0b1020_70%)]">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50" />
      <svg viewBox="0 0 420 320" className="absolute inset-0 size-full" role="img" aria-label="Illustration of layered session security monitoring network activity">
        <defs>
          <radialGradient id="sl-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3867FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3867FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sl-line" x1="0" x2="1">
            <stop offset="0%" stopColor="#8AA6FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#8AA6FF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8AA6FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {nodes.map((node, index) => (
          <g key={index}>
            <line x1={node.x} y1={node.y} x2="210" y2="160" stroke="url(#sl-line)" strokeWidth="1" />
            <circle cx={node.x} cy={node.y} r="4" fill={index === 5 ? "#F87171" : "#8AA6FF"} />
            <circle cx={node.x} cy={node.y} r="9" fill="none" stroke={index === 5 ? "#F87171" : "#8AA6FF"} strokeOpacity="0.3" />
          </g>
        ))}

        <circle cx="210" cy="160" r="120" fill="url(#sl-core)" />
        {[96, 74, 52].map((radius, index) => (
          <circle
            key={radius}
            cx="210"
            cy="160"
            r={radius}
            fill="none"
            stroke="#3867FF"
            strokeOpacity={0.25 + index * 0.2}
            strokeWidth="1.2"
            strokeDasharray={index === 0 ? "4 6" : index === 1 ? "2 4" : undefined}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`${index % 2 ? 360 : 0} 210 160`}
              to={`${index % 2 ? 0 : 360} 210 160`}
              dur={`${36 - index * 8}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        <path
          d="M210 128 l26 10 v20 c0 18 -11 30 -26 36 c-15 -6 -26 -18 -26 -36 v-20 z"
          fill="#0B1020"
          stroke="#8AA6FF"
          strokeWidth="1.6"
        />
        <path d="M199 160 l8 8 l15 -16" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

        <g>
          <circle cx="350" cy="230" r="16" fill="none" stroke="#F87171" strokeOpacity="0.8">
            <animate attributeName="r" values="10;22;10" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-navy/80 px-3 py-1.5 font-mono text-[0.65rem] tracking-wider text-electric-300 backdrop-blur">
        <span className="size-1.5 rounded-full bg-emerald-400" />
        SESSION MONITORING
      </div>
      <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/10 bg-navy/85 p-3 backdrop-blur sm:right-auto sm:w-64">
        <div className="flex items-center justify-between font-mono text-[0.62rem] tracking-wider text-steel">
          <span>POST-LOGIN SESSION</span>
          <span className="text-red-300">ANOMALY FLAGGED</span>
        </div>
        <div className="relative mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="animate-scan absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-electric to-transparent" />
        </div>
      </div>
    </div>
  );
}
