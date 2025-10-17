"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Typography } from "@/components/ui/typography";
import { PortfolioModal } from "./portfolio-modal";
import { portfolioItems } from "@/data";

// Helper function to truncate text after a certain number of words
const truncateWords = (text: string, maxWords: number) => {
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
};

export function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedModalItem, setSelectedModalItem] = useState<typeof portfolioItems[0] | null>(null);

  const itemsPerPage = 4; // Show 4 small cards (2x2 grid)
  const maxVisibleItems = 5; // Maximum recommended items before showing pagination

  const nextSlide = () => {
    if (portfolioItems.length <= maxVisibleItems) {
      setActiveIndex((prev) => (prev + 1) % portfolioItems.length);
    } else {
      // If more than 5 items, navigate through pages
      const totalPages = Math.ceil(portfolioItems.length / itemsPerPage);
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }
  };

  const prevSlide = () => {
    if (portfolioItems.length <= maxVisibleItems) {
      setActiveIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
    } else {
      // If more than 5 items, navigate through pages
      const totalPages = Math.ceil(portfolioItems.length / itemsPerPage);
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    }
  };

  const selectedItem = portfolioItems[activeIndex];

  // Modal functions
  const openModal = (item: typeof portfolioItems[0]) => {
    setSelectedModalItem(item);
  };

  const closeModal = () => {
    setSelectedModalItem(null);
  };

  // Get other items for display
  let otherItems = portfolioItems.filter((_, index) => index !== activeIndex);

  // If more than maxVisibleItems, show paginated items
  if (portfolioItems.length > maxVisibleItems) {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Get current page items, but exclude the selected item if it's in this page
    const pageItems = portfolioItems.slice(startIndex, endIndex);
    otherItems = pageItems.filter((_, index) => {
      const globalIndex = startIndex + index;
      return globalIndex !== activeIndex;
    });
  }

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-[#fcfcf4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Typography variant="section-label" className="mb-4">
            Our Portfolio
          </Typography>
          <Typography variant="section-title" className="text-center">
            Our Work Speaks for Itself
            <br className="hidden sm:block" />
            A Showcase of What We Do Best
          </Typography>
        </div>

        {/* Portfolio Layout */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 items-start">
          {/* Large Selected Card - Left Side */}
          <div className="flex-shrink-0 w-full lg:w-[660px]">
            {/* Mobile/Tablet Card - Shows bgColor only */}
            <div
              className={`
                ${selectedItem.bgColor}
                rounded-[24px]
                overflow-hidden
                transition-all duration-500
                hover:shadow-xl
                relative
                group
                h-[200px] lg:hidden
              `}
            >
              {/* Mobile/Tablet Content */}
              {/* Logo */}
              <div className="absolute top-8 left-6 z-10">
                <div className="w-[130px] h-[21px] overflow-hidden">
                  <Image
                    src={selectedItem.logo}
                    alt={selectedItem.client}
                    width={130}
                    height={21}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-col gap-6">
                  {/* View Detail Button */}
                  <div
                    onClick={() => openModal(selectedItem)}
                    className="flex items-center gap-2 cursor-pointer group/button"
                  >
                    <span className={`text-[14px] font-normal text-right text-white group-hover/button:opacity-80 transition-opacity`}>
                      View Detail
                    </span>
                    <div className="flex items-center justify-center w-5 h-5">
                      <ChevronRight
                        className="w-4 h-4 -rotate-90 text-white group-hover/button:translate-x-0.5 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Card - Shows backgroundImage or bgColor */}
            <div
              className={`
                hidden lg:block
                ${selectedItem.bgColor}
                rounded-[24px]
                overflow-hidden
                transition-all duration-500
                hover:shadow-xl
                relative
                group
                h-[342px] lg:h-[684px]
              `}
              style={{
                ...(selectedItem.backgroundImage && {
                  backgroundImage: `url(${selectedItem.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                })
              }}
            >
              {/* Logo */}
              <div className="absolute top-8 lg:top-12 left-6 lg:left-8 z-10">
                <div className="w-[130px] h-[21px] lg:w-[270px] lg:h-[50px] overflow-hidden">
                  <Image
                    src={selectedItem.logo}
                    alt={selectedItem.client}
                    width={270}
                    height={50}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
                <div className="flex flex-col gap-6 lg:gap-8">
                  {/* Desktop: Category, Client, Description - Always Visible */}
                  <div className="flex flex-col gap-3 gap-4">
                    <p className={`text-[18px] font-normal ${
                      selectedItem.backgroundImage ? 'text-white' : selectedItem.textColor
                    } opacity-90`}>
                      {selectedItem.category}
                    </p>
                    <p className={`text-[32px] font-medium ${
                      selectedItem.backgroundImage ? 'text-white' : selectedItem.textColor
                    }`}>
                      {selectedItem.client}
                    </p>
                    <p className={`text-[18px] font-normal leading-[28px] ${
                      selectedItem.backgroundImage ? 'text-white opacity-80' :
                      (selectedItem.textColor === 'text-white' ? 'text-white opacity-80' : 'text-[#646464]')
                    } line-clamp-6`}>
                      {truncateWords(selectedItem.description, 15)}
                    </p>
                  </div>

                  {/* View Detail Button - Always Visible */}
                  <div
                    onClick={() => openModal(selectedItem)}
                    className="flex items-center gap-2 cursor-pointer group/button"
                  >
                    <span className="text-[16px] font-normal text-right text-white group-hover/button:opacity-80 transition-opacity">
                      View Detail
                    </span>
                    <div className="flex items-center justify-center w-6 h-6">
                      <ChevronRight
                        className="w-5 h-5 -rotate-90 text-white group-hover/button:translate-x-0.5 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
        </div>

          {/* Right Side - Half-Sectioned Cards */}
          <div className="w-full lg:w-auto lg:flex-1" style={{ height: '342px' }}>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 h-full">
              {otherItems.length > 0 ? (
                otherItems.map((item) => {
                  const itemGlobalIndex = portfolioItems.findIndex(p => p.id === item.id);
                  const isSelected = itemGlobalIndex === activeIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => openModal(item)}
                      className={`
                        rounded-[16px] lg:rounded-[24px]
                        border border-[#DEDACF]
                        ${isSelected ? 'bg-[#334E4D]' : 'bg-[#FCFCF4]'}
                        overflow-hidden
                        transition-all duration-300
                        ${!isSelected ? 'hover:bg-[#334E4D] hover:shadow-lg' : 'shadow-lg'}
                        cursor-pointer
                        relative
                        group
                        w-full
                        h-full
                      `}
                    >
                    {/* Logo */}
                    <div className="absolute top-3 lg:top-4 left-3 lg:left-4 z-10">
                      <div className="w-[60px] h-[12px] lg:w-[80px] lg:h-[14px] overflow-hidden">
                        <Image
                          src={item.logo}
                          alt={item.client}
                          width={80}
                          height={14}
                          className="w-full h-full object-contain filter invert group-hover:invert-0"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                      <div className="flex flex-col gap-2 lg:gap-3">
                        <div className="flex flex-col gap-1">
                          <p className={`text-[10px] lg:text-[12px] font-normal ${
                            isSelected ? 'text-white opacity-90' : 'text-[#1e1e1e] opacity-90 group-hover:text-white'
                          } line-clamp-1`}>
                            {item.category}
                          </p>
                          <p className={`text-[12px] lg:text-[14px] font-medium ${
                            isSelected ? 'text-white' : 'text-[#1e1e1e] group-hover:text-white'
                          } line-clamp-1`}>
                            {item.client}
                          </p>
                          <p className={`text-[9px] lg:text-[11px] font-normal leading-[12px] lg:leading-[14px] ${
                            isSelected ? 'text-white opacity-80' : 'text-[#646464] group-hover:text-white opacity-80'
                          } line-clamp-2`}>
                            {truncateWords(item.description, 8)}
                          </p>
                        </div>

                        {/* View Detail Button */}
                        <div
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(item);
                        }}
                        className="flex items-center gap-1 cursor-pointer group/button"
                      >
                          <span className={`text-[10px] lg:text-[12px] font-normal text-right ${
                            isSelected ? 'text-white' : 'text-[#5d93ad] group-hover:text-white'
                          } group-hover/button:opacity-80 transition-opacity`}>
                            View Detail
                          </span>
                          <div className="flex items-center justify-center w-3 h-3 lg:w-4 lg:h-4">
                            <ChevronRight
                              className={`w-2 h-2 lg:w-3 h-3 -rotate-90 ${
                                isSelected ? 'text-white' : 'text-[#5d93ad] group-hover:text-white'
                              } group-hover/button:translate-x-0.5 transition-transform`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })
              ) : (
                <div className="col-span-2 flex items-center justify-center text-gray-500">
                  <p>No other items to display</p>
                </div>
              )}
            </div>

            {/* Navigation Controls - Positioned at bottom of quartered cards */}
            <div className="flex items-center justify-between pt-2 gap-4">
              {/* Progress Indicators */}
              <div className="flex-1">
                <div className="relative w-full h-0.5 bg-[#eceae4]">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#334e4d] transition-all duration-300"
                    style={{
                      width: portfolioItems.length <= maxVisibleItems
                        ? `${((activeIndex + 1) / portfolioItems.length) * 100}%`
                        : `${((currentPage + 1) / Math.ceil(portfolioItems.length / itemsPerPage)) * 100}%`
                    }}
                  />
                </div>
              </div>

              <button
                onClick={prevSlide}
                className="w-11 h-11 rounded-[12px] bg-[#eceae4] hover:bg-[#f1ff66] active:bg-[#f1ff66] transition-colors flex items-center justify-center group cursor-pointer"
                aria-label="Previous portfolio item"
              >
                <ChevronRight className="w-6 h-6 rotate-180 text-[#1e1e1e] group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={nextSlide}
                className="w-11 h-11 rounded-[12px] bg-[#eceae4] hover:bg-[#f1ff66] active:bg-[#f1ff66] transition-colors flex items-center justify-center group cursor-pointer"
                aria-label="Next portfolio item"
              >
                <ChevronRight className="w-6 h-6 text-[#1e1e1e] group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Modal */}
      {selectedModalItem && (
        <PortfolioModal
          isOpen={!!selectedModalItem}
          onClose={closeModal}
          item={selectedModalItem}
        />
      )}
    </section>
  );
}