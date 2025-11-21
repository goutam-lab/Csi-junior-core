"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const INSTAGRAM_URL = "https://www.instagram.com/csi.bu?igsh=MWE0dHN5dmVmdG55Mg==";

export default function FormClosedMessage() {
  return (
    <div className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-lg p-6 md:p-8 shadow-2xl text-center">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Logo for visual appeal */}
        <Image
            src="/csi-logo.png"
            alt="CSI Logo"
            width={120}
            height={48}
            className="h-12 w-auto mx-auto"
        />
        
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-medium text-white instrument">
          Registrations Closed
        </h2>
        
        {/* Descriptive Message */}
        <p className="text-lg text-white/80 max-w-lg">
          Thank you for your overwhelming interest in joining the CSI Junior Core Team.
          Submissions for this recruitment drive have now ended.
        </p>

        <p className="text-white/70 text-sm">
          Stay connected with us for future opportunities, events, and updates!
        </p>

        {/* Stay Connected Button */}
        <Button
          asChild
          className="mt-6 px-8 py-3 h-auto rounded-full bg-white text-black font-normal text-sm transition-all duration-300 hover:bg-white/90 cursor-pointer flex items-center z-10 gap-2"
        >
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Stay Connected on Instagram
          </a>
        </Button>
      </div>
    </div>
  );
}