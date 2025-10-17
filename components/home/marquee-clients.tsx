"use client";

import React from "react";
import Image from "next/image";
import { clientItems, ClientData } from "@/data";

function ClientLogo({ client }: { client: ClientData }) {
  return (
    <div
      className="flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg"
      style={{ height: `${client.height}px`, width: `${client.width}px` }}
    >
      <div className="h-full w-full overflow-hidden">
        <Image
          src={client.src}
          alt={client.alt}
          width={client.width}
          height={client.height}
          className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
      </div>
    </div>
  );
}

export function MarqueeClients() {
  return (
    <section id="marquee-clients" className="relative bg-[#334e4d] h-[160px] overflow-hidden">
      {/* Marquee content */}
      <div className="absolute h-[40px] top-[59px] overflow-hidden w-full">
        <div className="flex gap-[64px] items-center animate-marquee whitespace-nowrap group hover:animate-marquee-pause">
          {/* First set of client logos */}
          {clientItems.map((client) => (
            <ClientLogo key={`first-${client.id}`} client={client} />
          ))}

          {/* Second set of client logos for seamless loop */}
          {clientItems.map((client) => (
            <ClientLogo key={`second-${client.id}`} client={client} />
          ))}

          {/* Third set of client logos for extra smoothness */}
          {clientItems.map((client) => (
            <ClientLogo key={`third-${client.id}`} client={client} />
          ))}
        </div>
      </div>

      {/* Left gradient fade */}
      <div className="absolute left-0 top-0 h-full w-[160px] bg-gradient-to-r from-[#334e4d] to-[rgba(51,78,77,0)] pointer-events-none z-10"></div>

      {/* Right gradient fade */}
      <div className="absolute right-0 top-0 h-full w-[160px] bg-gradient-to-l from-[#334e4d] to-[rgba(51,78,77,0)] pointer-events-none z-10"></div>
    </section>
  );
}