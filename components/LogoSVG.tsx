export default function LogoSVG({ size = 48, color = "#B5451B", className = "" }: { size?: number, color?: string, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      {/* Palm trunk */}
      <path d="M16 60 Q20 40 18 20" />
      {/* Palm fronds */}
      <path d="M18 20 Q10 20 6 26" />
      <path d="M18 20 Q12 12 16 6" />
      <path d="M18 20 Q24 10 30 14" />
      <path d="M18 20 Q28 20 32 26" />
      <path d="M18 20 Q16 30 10 34" />

      {/* Archway doorway */}
      <path d="M30 60 V 38 A 12 12 0 0 1 54 38 V 60" />
      
      {/* Oval Pool at the base */}
      <ellipse cx="42" cy="62" rx="14" ry="4" />
      
      {/* Water line / ripples in pool */}
      <path d="M36 62 Q42 64 48 62" />
    </svg>
  );
}
