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

      {/* Outer C shape */}
      <path
        d="M135 65 A80 80 0 0 0 65 135"
        fill="none"
        stroke="url(#blueGradient)"
        strokeWidth="28"
        strokeLinecap="round"
      />

      {/* Angle brackets */}
      <g transform="translate(80, 84) rotate(-8)">
        <polyline
          points="22,0 0,22 22,44"
          fill="none"
          stroke="#5FB3D5"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g transform="translate(102, 84) rotate(8)">
        <polyline
          points="0,0 22,22 0,44"
          fill="none"
          stroke="#5FB3D5"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Orange accent */}
      <path
        d="M92 70 L112 130"
        stroke="#FF9500"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}
