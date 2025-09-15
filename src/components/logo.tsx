interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* SVG Logo com elementos culinÃ¡rios */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          {/* Panela */}
          <path
            d="M8 18C8 16.8954 8.89543 16 10 16H30C31.1046 16 32 16.8954 32 18V28C32 30.2091 30.2091 32 28 32H12C9.79086 32 8 30.2091 8 28V18Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          {/* AlÃ§a da panela */}
          <path
            d="M6 20C6 19.4477 6.44772 19 7 19C7.55228 19 8 19.4477 8 20V24C8 24.5523 7.55228 25 7 25C6.44772 25 6 24.5523 6 24V20Z"
            fill="currentColor"
          />
          <path
            d="M32 20C32 19.4477 32.4477 19 33 19C33.5523 19 34 19.4477 34 20V24C34 24.5523 33.5523 25 33 25C32.4477 25 32 24.5523 32 24V20Z"
            fill="currentColor"
          />
          
          {/* Colher */}
          <path
            d="M22 8C22 6.89543 22.8954 6 24 6C25.1046 6 26 6.89543 26 8V12C26 13.1046 25.1046 14 24 14C22.8954 14 22 13.1046 22 12V8Z"
            fill="currentColor"
            fillOpacity="0.9"
          />
          <ellipse cx="24" cy="4" rx="2" ry="3" fill="currentColor" fillOpacity="0.9" />
          
          {/* Garfo */}
          <g transform="translate(14, 2)">
            <path d="M2 2V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 2V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M1 2H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          
          {/* Detalhes decorativos - vapor */}
          <g transform="translate(12, 10)" opacity="0.6">
            <path d="M4 0C4 1 3 1 3 2C3 3 4 3 4 4" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M7 0C7 1 6 1 6 2C6 3 7 3 7 4" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M10 0C10 1 9 1 9 2C9 3 10 3 10 4" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </div>
      
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-foreground leading-tight">
          Cozinha
        </h1>
        <span className="text-lg font-medium text-primary leading-tight">
          Criativa
        </span>
      </div>
    </div>
  );
}

