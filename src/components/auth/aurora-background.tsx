"use client";

interface AuroraBackgroundProps {
  variant?: "chat" | "compose";
  className?: string;
}

export default function AuroraBackground({ variant = "chat", className = "" }: AuroraBackgroundProps) {
  const layers = variant === "chat" 
    ? [
        { opacity: "opacity-70", height: "h-24 lg:h-64", blur: "blur-[20px] lg:blur-[40px]" },
        { opacity: "opacity-80", height: "h-20 lg:h-56", blur: "blur-[15px] lg:blur-[35px]", top: "top-8 lg:top-12" },
        { opacity: "opacity-60", height: "h-16 lg:h-48", blur: "blur-[25px] lg:blur-[45px]", top: "top-16 lg:top-24" },
        { opacity: "opacity-50", height: "h-12 lg:h-40", blur: "blur-[12px] lg:blur-[30px]", top: "top-24 lg:top-36" },
        { opacity: "opacity-40", height: "h-10 lg:h-32", blur: "blur-[15px] lg:blur-[35px]", top: "top-32 lg:top-48" },
      ]
    : [
        { opacity: "opacity-60", height: "h-28 lg:h-72", blur: "blur-[18px] lg:blur-[40px]" },
        { opacity: "opacity-70", height: "h-24 lg:h-64", blur: "blur-[12px] lg:blur-[35px]", top: "top-10 lg:top-16" },
        { opacity: "opacity-50", height: "h-20 lg:h-56", blur: "blur-[22px] lg:blur-[45px]", top: "top-20 lg:top-32" },
        { opacity: "opacity-40", height: "h-16 lg:h-48", blur: "blur-[10px] lg:blur-[30px]", top: "top-32 lg:top-48" },
        { opacity: "opacity-30", height: "h-12 lg:h-40", blur: "blur-[16px] lg:blur-[35px]", top: "top-44 lg:top-64" },
      ];

  return (
    <div className={`absolute top-0 left-0 w-full h-full aurora-container overflow-hidden ${className}`}>
      {layers.map((layer, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 aurora-layer w-full ${layer.opacity} ${layer.height} ${layer.blur} ${layer.top || ""}`}
        />
      ))}
    </div>
  );
}