"use client";

import Image from "next/image"; // Make sure to import Image

// Add custom CSS for mobile animations
const mobileAnimationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .animation-delay-200 {
    animation-delay: 0.2s;
    opacity: 0;
  }
  
  .animation-delay-400 {
    animation-delay: 0.4s;
    opacity: 0;
  }
  
  .animation-delay-600 {
    animation-delay: 0.6s;
    opacity: 0;
  }
  
  @media (min-width: 768px) {
    .md\\:animate-none {
      animation: none !important;
      opacity: 1 !important;
    }
  }
`;

export default function HeroContent() {
  return (
    <>
      <style jsx>{mobileAnimationStyles}</style>
      <main className="absolute inset-0 flex items-center justify-center z-20 p-8">
        <div className="text-center max-w-2xl">
          {/* LOGO ADDED ABOVE TEXT */}
          <Image
            src="/csi-logo.png"
            alt="CSI Logo"
            width={160}
            height={64}
            className="h-22 w-auto mx-auto mb-8" // h-16 (64px)
          />

          {/* Main Heading */}
          <h1 className="text-6xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-6">
            {/* Mobile: CSI and Computer Society of India on separate lines */}
            <div className="md:hidden space-y-2">
              <span className="font-medium italic instrument text-6xl block leading-tight animate-fade-in-up">
                CSI
              </span>
              <span className="font-medium italic instrument text-5xl block leading-tight animate-fade-in-up animation-delay-200">
                Computer Society of India
              </span>
            </div>

            {/* Desktop: Original layout */}
            <span className="font-medium italic instrument hidden md:inline">
              CSI - Computer Society of India
            </span>

            <br className="hidden md:block" />
            <span className="text-3xl font-light tracking-tight text-white block mt-4 md:mt-0 animate-fade-in-up animation-delay-400 md:animate-none">
              Bennett University
            </span>
          </h1>

          {/* Description */}
          <p className="text-base font-light text-white/70 mb-8 leading-relaxed animate-fade-in-up animation-delay-600 md:animate-none">
            CSI is Bennett University’s official technical society that empowers
            students through tech, creativity, and collaboration.
          </p>

          {/* Button with Gooey Animation */}
          <div
            id="gooey-btn-hero"
            className="relative flex items-center justify-center group"
            style={{ filter: "url(#gooey-filter)" }}
          >
            {/* This is the arrow part of the animation */}
            <div className="absolute right-[50%] translate-x-[90px] px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-32 z-0">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3" // A simple right arrow
                />
              </svg>
            </div>

            {/* This is the main button text */}
            <a
              href="/form" // <-- FIXED: This now links to your form page
              className="px-6 py-4 rounded-full bg-white text-black font-normal text-sm transition-all duration-300 hover:bg-white/90 cursor-pointer h-12 flex items-center z-10 gap-2"
            >
              {/* LOGO ADDED INSIDE BUTTON */}
              <Image
                src="/csi-logo.png"
                alt="" // Alt text is empty as it's decorative
                width={24}
                height={24}
                className="h-5 w-auto" // h-5 (20px)
              />
              Join as a Junior Core Member
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
