"use client"

import Image from "next/image" // Make sure to import Image

export default function HeroContent() {
  return (
    <main className="absolute inset-0 flex items-center justify-center z-20 p-8">
      <div className="text-center max-w-2xl">
        {/* LOGO ADDED ABOVE TEXT */}
        <Image
          src="/csi-logo.png"
          alt="CSI Logo"
          width={160}
          height={64}
          className="h-16 w-auto mx-auto mb-6" // h-16 (64px)
        />

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
          <span className="font-medium italic instrument">
            CSI - Computer Society of India
          </span>
          <br />
          <span className="font-light tracking-tight text-white">
            Bennett University
          </span>
        </h1>

        {/* Description */}
        <p className="text-base font-light text-white/70 mb-8 leading-relaxed">
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
            className="px-6 py-2 rounded-full bg-white text-black font-normal text-sm transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10 gap-2"
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
  )
}