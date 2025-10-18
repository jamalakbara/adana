"use client";

import React from "react";
import Image from "next/image";
import { clientItems, ClientData } from "@/data";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const logoVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

function ClientLogo({ client, index }: { client: ClientData; index?: number }) {
  return (
    <motion.div
      className="flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg"
      style={{ height: `${client.height}px`, width: `${client.width}px` }}
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.6,
        delay: (index || 0) * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }}
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
    </motion.div>
  );
}

export function MarqueeClients() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      id="marquee-clients"
      className="relative bg-[#334e4d] h-[160px] overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Marquee content */}
      <div className="absolute h-[40px] top-[59px] overflow-hidden w-full">
        <div className="flex gap-[64px] items-center animate-marquee whitespace-nowrap group hover:animate-marquee-pause">
          {/* First set of client logos */}
          {clientItems.map((client, index) => (
            <ClientLogo key={`first-${client.id}`} client={client} index={index} />
          ))}

          {/* Second set of client logos for seamless loop */}
          {clientItems.map((client, index) => (
            <ClientLogo key={`second-${client.id}`} client={client} index={index + clientItems.length} />
          ))}

          {/* Third set of client logos for extra smoothness */}
          {clientItems.map((client, index) => (
            <ClientLogo key={`third-${client.id}`} client={client} index={index + (clientItems.length * 2)} />
          ))}
        </div>
      </div>

      {/* Left gradient fade */}
      <div className="absolute left-0 top-0 h-full w-[160px] bg-gradient-to-r from-[#334e4d] to-[rgba(51,78,77,0)] pointer-events-none z-10"></div>

      {/* Right gradient fade */}
      <div className="absolute right-0 top-0 h-full w-[160px] bg-gradient-to-l from-[#334e4d] to-[rgba(51,78,77,0)] pointer-events-none z-10"></div>
    </motion.section>
  );
}