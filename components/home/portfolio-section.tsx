"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useSection } from "@/components/content/providers/ContentProvider";
import { SectionContainer } from "@/components/ui/section-container";
import { Typography } from "@/components/ui/typography";

// Helper function to truncate text after a certain number of words
const truncateWords = (text: string, maxWords: number) => {
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
};

export function PortfolioSection() {
  const { data: portfolioContent, isLoaded } = useSection("portfolio");
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Create default portfolio items as fallback
  const defaultPortfolioItems = [
    {
      id: 1,
      category: "Performance Marketing",
      client: "Cloxvox",
      description: "During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
      bgColor: "bg-[#fcfcf4]",
      textColor: "text-[#1e1e1e]",
      borderColor: "border-[#dedacf]",
      logo: "https://www.figma.com/api/mcp/asset/6d632dbb-9fff-4acb-b598-1f741917584c",
      itemImage: null,
      hasItemImage: false,
    },
    {
      id: 2,
      category: "Performance Marketing",
      client: "World ID",
      description: "During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
      bgColor: "bg-[#334e4d]",
      textColor: "text-white",
      borderColor: "border-[#dedacf]",
      logo: "https://www.figma.com/api/mcp/asset/5c2175c8-ffdb-41b6-a011-ec10823f36d7",
      itemImage: null,
      hasItemImage: false,
    },
    {
      id: 3,
      category: "Digital Media Buying",
      client: "Telkomsel",
      description: "During their launch in Indonesia, world maximize their visibility and acquisition using performance media strategy on Meta, Tiktok, and Google Ads.",
      bgColor: "bg-[#1e1e1e]",
      textColor: "text-white",
      borderColor: "border-[#dedacf]",
      logo: "https://www.figma.com/api/mcp/asset/619d5dcb-14d5-4c5a-8f44-f9157ff9037c",
      itemImage: null,
      hasItemImage: false,
    },
  ];

  // Map CMS items to portfolio items structure
  const portfolioItems = (isLoaded && portfolioContent?.items ? portfolioContent.items : defaultPortfolioItems).map((item: any, index: number) => ({
    id: item.id || `portfolio-${index}`,
    category: item.subtitle || "Project",
    client: item.title,
    description: item.description,
    bgColor: index === 0 ? "bg-[#fcfcf4]" : index === 1 ? "bg-[#334e4d]" : "bg-[#1e1e1e]",
    textColor: index === 0 ? "text-[#1e1e1e]" : "text-white",
    borderColor: "border-[#dedacf]",
    logo: item.logo_image?.url || item.logo_image?.supabase_url || defaultPortfolioItems[index % 3].logo,
    itemImage: item.item_image?.url || item.item_image?.supabase_url || null,
    hasItemImage: !!(item.item_image?.url || item.item_image?.supabase_url),
  }));

  // Reset active index when portfolio items change
  useEffect(() => {
    if (isLoaded && portfolioItems.length > 0) {
      setActiveIndex(0);
      setCurrentPage(0);
    }
  }, [isLoaded, portfolioItems.length]);

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

  // Get other items for display
  let otherItems = portfolioItems.filter((_: any, index: number) => index !== activeIndex);

  // If more than maxVisibleItems, show paginated items
  if (portfolioItems.length > maxVisibleItems) {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Get current page items, but exclude the selected item if it's in this page
    let pageItems = portfolioItems.slice(startIndex, endIndex);
    otherItems = pageItems.filter((_: any, index: number) => {
      const globalIndex = startIndex + index;
      return globalIndex !== activeIndex;
    });
  }

  return (
    <SectionContainer background="light" padding="xl" maxWidth="xl" nodeId="201:96">
      {/* Header */}
      <div className="text-center mb-12 lg:mb-16">
        <Typography variant="section-label" className="mb-4">
          {isLoaded && portfolioContent?.title ? portfolioContent.title : "Our Portfolio"}
        </Typography>
        <Typography variant="section-title" className="text-center leading-tight">
          {isLoaded && portfolioContent?.subtitle ? portfolioContent.subtitle : (
            <>
              Our Work Speaks for Itself
              <br className="hidden sm:block" />
              A Showcase of What We Do Best
            </>
          )}
        </Typography>
      </div>

        {/* Portfolio Layout */}
        <div className={`${portfolioItems.length === 1 ? 'flex justify-center items-center' : 'lg:flex lg:flex-row'} gap-8 lg:gap-12 items-start lg:items-start`}>
          {/* Mobile & Tablet: Horizontal scroll carousel */}
          <div className={`lg:hidden ${portfolioItems.length === 1 ? 'max-w-[660px] w-full' : 'w-full overflow-hidden'}`}>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 -mx-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* Selected Card - Mobile & Tablet */}
              <div className={`flex-shrink-0 w-[85vw] md:w-[45vw] max-w-[342px] md:max-w-[400px] h-[342px] snap-center`}>
                <div
                  className={`
                    rounded-[16px]
                    border border-[#DEDACF]
                    bg-[#FCFCF4]
                    overflow-hidden
                    transition-all duration-300
                    hover:bg-[#334E4D]
                    hover:shadow-lg
                    relative
                    group
                    w-full
                    h-full
                    min-h-[342px]
                  `}
                >
                  {/* Logo */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className="w-[60px] h-[12px] overflow-hidden">
                      <img
                        src={selectedItem.logo}
                        alt={selectedItem.client}
                        className="w-full h-full object-contain filter invert"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-normal line-clamp-1 text-[#1e1e1e] opacity-90">
                          {selectedItem.category}
                        </p>
                        <p className="text-[12px] font-medium line-clamp-1 text-[#1e1e1e]">
                          {selectedItem.client}
                        </p>
                        <p className="text-[9px] font-normal leading-[12px] opacity-80 line-clamp-2 text-[#646464]">
                          {truncateWords(selectedItem.description, 8)}
                        </p>
                      </div>

                      {/* View Detail Button */}
                      <div className="flex items-center gap-1 cursor-pointer group/button">
                        <span className="text-[10px] font-normal text-right group-hover/button:opacity-80 transition-opacity text-[#5d93ad]">
                          View Detail
                        </span>
                        <div className="flex items-center justify-center w-3 h-3">
                          <ChevronRight
                            className="w-2 h-2 -rotate-90 group-hover/button:translate-x-0.5 transition-transform text-[#5d93ad]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Card Preview - Mobile & Tablet */}
              {otherItems.length > 0 && (
                <div className="flex-shrink-0 w-[60vw] md:w-[45vw] max-w-[240px] md:max-w-[400px] h-[342px] snap-center opacity-60">
                  <div
                    onClick={() => setActiveIndex(portfolioItems.findIndex((p: any) => p.id === otherItems[0].id))}
                    className={`
                      rounded-[16px]
                      border border-[#DEDACF]
                      bg-[#FCFCF4]
                      overflow-hidden
                      transition-all duration-300
                      hover:bg-[#334E4D]
                      hover:shadow-lg
                      cursor-pointer
                      relative
                      group
                      w-full
                      h-full
                      min-h-[342px]
                    `}
                  >
                    {/* Logo */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="w-[60px] h-[12px] overflow-hidden">
                        <img
                          src={otherItems[0].logo}
                          alt={otherItems[0].client}
                          className="w-full h-full object-contain filter invert group-hover:invert-0"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                          <p className="text-[10px] font-normal line-clamp-1 text-[#1e1e1e] opacity-90 group-hover:text-white">
                            {otherItems[0].category}
                          </p>
                          <p className="text-[12px] font-medium line-clamp-1 text-[#1e1e1e] group-hover:text-white">
                            {otherItems[0].client}
                          </p>
                          <p className="text-[9px] font-normal leading-[12px] opacity-80 line-clamp-2 text-[#646464] group-hover:text-white">
                            {truncateWords(otherItems[0].description, 8)}
                          </p>
                        </div>

                        {/* View Detail Button */}
                        <div className="flex items-center gap-1 cursor-pointer group/button">
                          <span className="text-[10px] font-normal text-right group-hover/button:opacity-80 transition-opacity text-[#5d93ad] group-hover:text-white">
                            View Detail
                          </span>
                          <div className="flex items-center justify-center w-3 h-3">
                            <ChevronRight
                              className="w-2 h-2 -rotate-90 group-hover/button:translate-x-0.5 transition-transform text-[#5d93ad] group-hover:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Cards for Tablet View (3 cards total) */}
              {otherItems.length > 1 && otherItems.slice(1, 3).map((item: any, index: number) => (
                <div key={item.id} className="hidden md:flex flex-shrink-0 w-[45vw] max-w-[400px] h-[342px] snap-center opacity-60">
                  <div
                    onClick={() => setActiveIndex(portfolioItems.findIndex((p: any) => p.id === item.id))}
                    className={`
                      rounded-[16px]
                      border border-[#DEDACF]
                      bg-[#FCFCF4]
                      overflow-hidden
                      transition-all duration-300
                      hover:bg-[#334E4D]
                      hover:shadow-lg
                      cursor-pointer
                      relative
                      group
                      w-full
                      h-full
                      min-h-[342px]
                    `}
                  >
                    {/* Logo */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="w-[60px] h-[12px] overflow-hidden">
                        <img
                          src={item.logo}
                          alt={item.client}
                          className="w-full h-full object-contain filter invert group-hover:invert-0"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                          <p className="text-[10px] font-normal line-clamp-1 text-[#1e1e1e] opacity-90 group-hover:text-white">
                            {item.category}
                          </p>
                          <p className="text-[12px] font-medium line-clamp-1 text-[#1e1e1e] group-hover:text-white">
                            {item.client}
                          </p>
                          <p className="text-[9px] font-normal leading-[12px] opacity-80 line-clamp-2 text-[#646464] group-hover:text-white">
                            {truncateWords(item.description, 8)}
                          </p>
                        </div>

                        {/* View Detail Button */}
                        <div className="flex items-center gap-1 cursor-pointer group/button">
                          <span className="text-[10px] font-normal text-right group-hover/button:opacity-80 transition-opacity text-[#5d93ad] group-hover:text-white">
                            View Detail
                          </span>
                          <div className="flex items-center justify-center w-3 h-3">
                            <ChevronRight
                              className="w-2 h-2 -rotate-90 group-hover/button:translate-x-0.5 transition-transform text-[#5d93ad] group-hover:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Original layout */}
          <div className={`${portfolioItems.length === 1 ? 'max-w-[660px] w-full' : 'hidden lg:block lg:flex-shrink-0'}`}>
            <div
              className={`
                ${selectedItem.bgColor}
                ${selectedItem.borderColor ? 'border' : ''}
                rounded-[16px] lg:rounded-[24px]
                border border-[#DEDACF] lg:border-none
                bg-[#FCFCF4] lg:bg-transparent
                overflow-hidden
                transition-all duration-300
                hover:bg-[#334E4D] lg:hover:bg-transparent
                hover:shadow-lg lg:hover:shadow-xl
                relative
                group
                w-full
                h-[342px] lg:h-[684px]
                lg:w-[660px]
              `}
              style={
                selectedItem.hasItemImage
                  ? {
                      backgroundImage: `url(${selectedItem.itemImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }
                  : {}
              }
            >
              {/* Overlay for text readability when using background image - Desktop only */}
              {selectedItem.hasItemImage && (
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-0" />
              )}
              {/* Logo */}
              <div className="absolute top-3 lg:top-12 left-3 lg:left-8 z-10">
                <div className="w-[60px] h-[12px] lg:w-[270px] lg:h-[50px] overflow-hidden">
                  <img
                    src={selectedItem.logo}
                    alt={selectedItem.client}
                    className="w-full h-full object-contain filter invert lg:invert-0"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-12">
                <div className="flex flex-col gap-2 lg:gap-8">
                  <div className="flex flex-col gap-1 lg:gap-4">
                    <p className="text-[10px] lg:text-[18px] font-normal line-clamp-1 text-[#1e1e1e] opacity-90 lg:opacity-90 lg:text-white">
                      {selectedItem.category}
                    </p>
                    <p className="text-[12px] lg:text-[32px] font-medium line-clamp-1 text-[#1e1e1e] lg:text-white">
                      {selectedItem.client}
                    </p>
                    <p className="text-[9px] lg:text-[18px] font-normal leading-[12px] lg:leading-[28px] opacity-80 line-clamp-2 lg:line-clamp-6 text-[#646464] lg:text-white lg:opacity-80">
                      {truncateWords(selectedItem.description, 8)}
                    </p>
                  </div>

                  {/* View Detail Button */}
                  <div className="flex items-center gap-1 lg:gap-2 cursor-pointer group/button">
                    <span className="text-[10px] lg:text-[16px] font-normal text-right group-hover/button:opacity-80 transition-opacity text-[#5d93ad] lg:text-white">
                      View Detail
                    </span>
                    <div className="flex items-center justify-center w-3 h-3 lg:w-6 lg:h-6">
                      <ChevronRight
                        className="w-2 h-2 lg:w-5 lg:h-5 -rotate-90 group-hover/button:translate-x-0.5 transition-transform text-[#5d93ad] lg:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Half-Sectioned Cards - Desktop only */}
          {portfolioItems.length > 1 && (
            <div className="hidden lg:block w-full" style={{ height: '342px' }}>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 h-full">
              {otherItems.length > 0 ? (
                otherItems.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveIndex(portfolioItems.findIndex((p: any) => p.id === item.id))}
                    className={`
                      rounded-[16px] lg:rounded-[24px]
                      border border-[#DEDACF]
                      bg-[#FCFCF4]
                      overflow-hidden
                      transition-all duration-300
                      hover:bg-[#334E4D]
                      hover:shadow-lg
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
                        <img
                          src={item.logo}
                          alt={item.client}
                          className="w-full h-full object-contain filter invert group-hover:invert-0"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                      <div className="flex flex-col gap-2 lg:gap-3">
                        <div className="flex flex-col gap-1">
                          <p className="text-[10px] lg:text-[12px] font-normal line-clamp-1 text-[#1e1e1e] opacity-90 group-hover:text-white">
                            {item.category}
                          </p>
                          <p className="text-[12px] lg:text-[14px] font-medium line-clamp-1 text-[#1e1e1e] group-hover:text-white">
                            {item.client}
                          </p>
                          <p className="text-[9px] lg:text-[11px] font-normal leading-[12px] lg:leading-[14px] opacity-80 line-clamp-2 text-[#646464] group-hover:text-white">
                            {truncateWords(item.description, 8)}
                          </p>
                        </div>

                        {/* View Detail Button */}
                        <div className="flex items-center gap-1 cursor-pointer group/button">
                          <span className="text-[10px] lg:text-[12px] font-normal text-right group-hover/button:opacity-80 transition-opacity text-[#5d93ad] group-hover:text-white">
                            View Detail
                          </span>
                          <div className="flex items-center justify-center w-3 h-3 lg:w-4 lg:h-4">
                            <ChevronRight
                              className="w-2 h-2 lg:w-3 h-3 -rotate-90 group-hover/button:translate-x-0.5 transition-transform text-[#5d93ad] group-hover:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 flex items-center justify-center text-gray-500">
                  <p>No other items to display</p>
                </div>
              )}
            </div>

            {/* Navigation Controls - Positioned at bottom of quartered cards */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={prevSlide}
                className="w-11 h-11 rounded-[12px] bg-[#eceae4] hover:bg-[#f1ff66] transition-colors flex items-center justify-center group"
                aria-label="Previous portfolio item"
              >
                <ChevronRight className="w-6 h-6 rotate-180 text-[#1e1e1e] group-hover:scale-110 transition-transform" />
              </button>

              {/* Progress Indicators */}
              <div className="flex-1 mx-4">
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
                onClick={nextSlide}
                className="w-11 h-11 rounded-[12px] bg-[#eceae4] hover:bg-[#f1ff66] transition-colors flex items-center justify-center group"
                aria-label="Next portfolio item"
              >
                <ChevronRight className="w-6 h-6 text-[#1e1e1e] group-hover:scale-110 transition-transform" />
              </button>
            </div>
            </div>
          )}

          {/* Mobile Navigation - Only show on mobile when there are multiple items */}
          {portfolioItems.length > 1 && (
            <div className="lg:hidden flex items-center gap-2 pt-2">
              {/* Progress Indicator Line - Takes full available space */}
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

              {/* Arrows Next to Each Other */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-11 h-11 rounded-[12px] bg-[#eceae4] hover:bg-[#f1ff66] transition-colors flex items-center justify-center group"
                  aria-label="Previous portfolio item"
                >
                  <ChevronRight className="w-6 h-6 rotate-180 text-[#1e1e1e] group-hover:scale-110 transition-transform" />
                </button>

                <button
                  onClick={nextSlide}
                  className="w-11 h-11 rounded-[12px] bg-[#eceae4] hover:bg-[#f1ff66] transition-colors flex items-center justify-center group"
                  aria-label="Next portfolio item"
                >
                  <ChevronRight className="w-6 h-6 text-[#1e1e1e] group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
    </SectionContainer>
  );
}