"use client";

import Image from "next/image";

export default function HeroContent() {
  return (
    <main className="absolute inset-0 flex items-center justify-center z-20 p-4 md:p-8">
      <div className="text-center max-w-2xl md:max-w-4xl w-full">
        {/* LOGO ADDED ABOVE TEXT */}
        <Image
          src="/csi-logo.png"
          alt="CSI Logo"
          width={170}
          height={70}
          className="h-22 md:h-25 w-auto mx-auto mb-6 md:mb-8"
        />

        {/* Main Heading */}
        <h1 className="text-6xl md:text-6xl lg:text-7xl md:leading-tight tracking-tight font-light text-white mb-6 md:mb-8">
          {/* Mobile: CSI and Computer Society of India on separate lines */}
          <div className="md:hidden space-y-1">
            <span className="font-medium italic instrument text-6xl block leading-tight animate-fade-in-up">
              CSI
            </span>
            <span className="font-medium italic instrument text-5xl block leading-tight animate-fade-in-up delay-200">
              Computer Society of India
            </span>
          </div>

          {/* Desktop: Original layout */}
          <span className=" text-7xl font-medium italic instrument hidden md:inline">
            CSI - Computer Society of India
          </span>

          <br className="hidden md:block" />
          <span className="text-3xl md:text-4xl font-light tracking-tight text-white block mt-4 md:mt-4">
            Bennett University
          </span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg font-light text-white/70 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
          CSI is Bennett University's official technical society that empowers
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>

          {/* This is the main button text */}
          <a
            href="/form"
            className="px-6 py-4 rounded-full bg-white text-black font-normal text-sm transition-all duration-300 hover:bg-white/90 cursor-pointer h-12 flex items-center z-10 gap-2"
          >
            {/* LOGO ADDED INSIDE BUTTON */}
            <Image
              src="/csi-logo.png"
              alt=""
              width={24}
              height={24}
              className="h-5 w-auto"
            />
            Join as a Junior Core Member
          </a>
        </div>
      </div>
    </main>
  );
}
