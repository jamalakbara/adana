import { cn } from "@/lib/utils";

const imgAdanaLogoGreen1 = "https://s3-alpha-sig.figma.com/img/39ac/3861/34f8ddf560e25c271b143a4f6b96529f?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=beLy1JRe5HmsgxFGm7JC~fQhx2NrR7wTVxJr8Bx1zEEEKD6mx9dK6iHqZR57hLnn2U337UnlQypNdFMnB3iVYRz3A1wvCAno~b6EXBhCDnggQNu6HLJkdF5f1n0TzPMcqxiechzLIlXbC6CU9cTE32GF0PtzfTeLSZZ5KfgzUXmxRqb~1XEp~-kke5AanlnQq0mbt1df0TSMSG5BFujeWG9DhKSgb6VSrIjiE~CiGbo8V7fYbDzNtb-FL-KxW5FUbRQujqtiCp3-8JxZEIPavY16-UcL~4zZYXRw6iX4GLQ9wdgG5toOwQZTa-xdeB4pqtF-5ooh2tLvWpF-bx9d~g__";

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
        <img
          alt="Adana Logo"
          className="absolute h-[97.44%] left-[1.13%] max-w-none top-[2.56%] w-[97.74%] transition-filter duration-300 group-hover:brightness-110 group-active:brightness-95"
          src={imgAdanaLogoGreen1}
        />
      </div>
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-[#f1ff66]/20 to-transparent pointer-events-none"></div>
    </div>
  );
}