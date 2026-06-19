interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className = '', width = 32, height = 32 }: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4FA3C1', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#1B5E7A', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Outer C circle */}
      <circle
        cx="100"
        cy="100"
        r="85"
        fill="none"
        stroke="url(#blueGradient)"
        strokeWidth="28"
        strokeDasharray="267"
        strokeDashoffset="80"
      />

      {/* Code brackets < in light blue */}
      <g transform="translate(70, 75)">
        <polyline
          points="15,0 0,15 15,30"
          fill="none"
          stroke="#5FB3D5"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Code brackets > in light blue */}
      <g transform="translate(110, 75)">
        <polyline
          points="0,0 15,15 0,30"
          fill="none"
          stroke="#5FB3D5"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Orange slash / */}
      <line
        x1="92"
        y1="60"
        x2="108"
        y2="140"
        stroke="#FF9500"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}
