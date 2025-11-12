import React from 'react';

const LogoIcon: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="coolSaffron" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF9933" />
        <stop offset="100%" stopColor="#FFD700" />
      </linearGradient>
      <linearGradient id="coolGreen" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#138808" />
        <stop offset="100%" stopColor="#20C997" />
      </linearGradient>
    </defs>

    {/* Saffron part - resembling a person or a flame */}
    <path 
      d="M100 20 C 40 40, 40 120, 100 180" 
      fill="url(#coolSaffron)"
    />
    
    {/* Green part - the other half */}
    <path 
      d="M100 20 C 160 40, 160 120, 100 180" 
      fill="url(#coolGreen)"
    />

    {/* Blue circle at the heart */}
    <circle cx="100" cy="100" r="35" fill="#000080" />

    {/* Inner White 'YR' */}
    <text
      x="100"
      y="108"
      fontFamily="Poppins, sans-serif"
      fontSize="40"
      fontWeight="bold"
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      YR
    </text>
  </svg>
);

export default LogoIcon;
