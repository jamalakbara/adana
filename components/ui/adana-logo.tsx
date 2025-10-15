import Image from "next/image";
import { cn } from "@/lib/utils";

const imgAdanaLogoGreen1 = "/adana-logo.png";

interface AdanaLogoProps {
  className?: string;
}

export function AdanaLogo({ className }: AdanaLogoProps) {
  return (
    <div
      className={cn("relative size-full group cursor-pointer", className)}
      data-name="Adana Logo_Green 1"
      data-node-id="115:10843"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
        <Image
          alt="Adana Logo"
          className="absolute h-[97.44%] left-[1.13%] max-w-none top-[2.56%] w-[97.74%] transition-filter duration-300 group-hover:brightness-110 group-active:brightness-95"
          src={imgAdanaLogoGreen1}
          width={100}
          height={100}
        />
      </div>
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-[#f1ff66]/20 to-transparent pointer-events-none"></div>
    </div>
  );
}