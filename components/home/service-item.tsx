"use client";

import React from "react";
import { DiscussButton } from "../ui/discuss-button";

interface ServiceItemProps {
  title: string;
  description: string;
  isExpanded: boolean;
  onToggle: () => void;
  nodeId: string;
  isFirst?: boolean;
}

export function ServiceItem({
  title,
  description,
  isExpanded,
  onToggle,
  nodeId,
  isFirst = false
}: ServiceItemProps) {
  return (
    <div className={`relative overflow-hidden transition-all duration-500 ease-in-out cursor-pointer ${isFirst ? 'border-t border-b' : 'border-b'} border-[#DEDACF]`} style={{ maxHeight: isExpanded ? '512px' : '92px' }}>
      <div className={`flex gap-52 transition-colors duration-300 ${isExpanded ? 'bg-[#334e4d]' : 'bg-[#FCFCF4] hover:bg-[#f5f5ed]'}`} onClick={onToggle}>
        <div className="flex flex-col justify-center p-6 flex-1">
          <h2
            style={{
              color: isExpanded ? "#FFF" : "#1E1E1E",
              fontFamily: '"Public Sans"',
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              alignSelf: "stretch"
            }}
          >
            {title}
          </h2>
          {isExpanded && (
            <>
              <div className="mb-[16px]"></div>
              <p
                style={{
                  color: "#FFF",
                  fontFamily: '"Public Sans"',
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "20px",
                  alignSelf: "stretch"
                }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
              <div className="mb-[24px]"></div>
              <DiscussButton className="w-fit" />
            </>
          )}
        </div>
        <div className="relative w-[366px] overflow-hidden" style={{ height: isExpanded ? '320px' : '92px' }}>
          {isExpanded && (
            <div className="absolute right-0 top-0 w-[366px] h-[320px]">
              <img
                src="https://s3-alpha-sig.figma.com/img/a6ca/e0eb/c62f77205434383aa4fa6abda5c879d2?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bc1vW0nSVsqCzJp-aLwT-5LNxLKokqNHDauxBQua0CoW~gThFF2DU3KPBbqkFGS-S48GutO7~kmrfIbQT9WZjYUgYskNd4FKkFEPi0zAs8LozbY7HZfD4Z0OQnDgxvfjPB5lxuizflRNZ~NdRiMD6ijpSnyeKT5hliROJjLk9MhQHe7iuQ3L3So4x0X5VJGXvmzcS7UiV91L3gJ76CJ8kShFtOqlmfgQRrzTep71EmeqkqI2FwJ0auXCZW-iCECBleeAHv50oKFX9PPlvSXPntjWaT1S9j3FEXSFRKdQO7plHY8BIJ2kVVWduxIxvDyG2~JnnNf~OHOgnjpKkRZRjg__"
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// export function ServiceItem({
//   title,
//   description,
//   isExpanded,
//   onToggle,
//   nodeId
// }: ServiceItemProps) {
//   return (
//     <div className="relative">
//       {/* Service Header */}
//       <div
//         className="relative cursor-pointer group h-[92px] w-full transition-all duration-300"
//         onClick={onToggle}
//       >
//         <div className={`h-full w-full transition-all duration-300 ${
//           isExpanded
//             ? 'bg-[#334e4d] border-y-0'
//             : 'bg-[#fcfcf4] border-y border-[#dedacf] border-solid group-hover:bg-[#f5f5ed]'
//         }`}>
//           {!isExpanded && (
//             <div className="absolute inset-x-[-1px] inset-y-[-1px] border-y border-[#dedacf] border-solid pointer-events-none" />
//           )}
//         </div>
//         <div
//           className={`font-['Public_Sans'] text-[24px] font-normal leading-[normal] absolute top-[26px] w-[546px] flex justify-between items-center transition-colors duration-300 ${
//             isExpanded ? 'text-white' : 'text-[#1E1E1E]'
//           }`}
//           style={{ left: "calc(50% - 558px)" }}
//           data-node-id={nodeId}
//         >
//           <span>{title}</span>
//           <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} group-hover:rotate-180`}>
//             <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//               <path d="M5 7.5L10 12.5L15 7.5" stroke={isExpanded ? "white" : "#1E1E1E"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* Detailed Service content */}
//       <div
//         className={`relative bg-[#334e4d] w-full transition-all duration-500 ease-in-out overflow-hidden ${
//           isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className="absolute -inset-1 border border-[#DEDACF] border-solid pointer-events-none" style={{ border: "1px solid #DEDACF" }} />

//         {/* Flex container */}
//         <div className="flex">
//           {/* Left content area */}
//           <div className="relative cursor-pointer group h-[92px] w-full transition-all duration-300">
//             <div
//               className="font-['Public_Sans'] text-[24px] font-normal leading-[normal] absolute top-[26px] w-[546px] flex justify-between items-center transition-colors duration-300 text-white"
//               style={{ left: "calc(50% - 558px)" }}
//               data-node-id={nodeId}
//             >
//               <span>{title}</span>
//             </div>
//             <div
//               className="text-white self-stretch space-y-[12px]"
//               style={{
//                 fontFamily: '"Public Sans"',
//                 fontSize: '14px',
//                 fontStyle: 'normal',
//                 fontWeight: '400',
//                 lineHeight: '20px'
//               }}
//               data-node-id="115:10813"
//             >
//               <p dangerouslySetInnerHTML={{ __html: description }} />
//             </div>
//             {/* CTA Button */}
//             <div className="font-['Funnel_Display:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#334e4d] text-[14px] whitespace-nowrap" data-node-id="115-10850">
//               <p className="leading-[normal]">Let's Discuss</p>
//             </div>
//           </div>

//           {/* Right side image */}
//           <div className="relative bg-[#334e4d] w-full">
//             <div className="absolute right-0 top-0 w-[366px] h-[320px]" data-node-id="115:10809">
//               <div className="relative w-full h-full overflow-hidden">
//                 <img
//                   src="https://s3-alpha-sig.figma.com/img/a6ca/e0eb/c62f77205434383aa4fa6abda5c879d2?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bc1vW0nSVsqCzJp-aLwT-5LNxLKokqNHDauxBQua0CoW~gThFF2DU3KPBbqkFGS-S48GutO7~kmrfIbQT9WZjYUgYskNd4FKkFEPi0zAs8LozbY7HZfD4Z0OQnDgxvfjPB5lxuizflRNZ~NdRiMD6ijpSnyeKT5hliROJjLk9MhQHe7iuQ3L3So4x0X5VJGXvmzcS7UiV91L3gJ76CJ8kShFtOqlmfgQRrzTep71EmeqkqI2FwJ0auXCZW-iCECBleeAHv50oKFX9PPlvSXPntjWaT1S9j3FEXSFRKdQO7plHY8BIJ2kVVWduxIxvDyG2~JnnNf~OHOgnjpKkRZRjg__"
//                   alt={title}
//                   className="absolute h-full left-[-1.64%] max-w-none top-0 w-[116.39%] object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }