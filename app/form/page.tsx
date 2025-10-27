import ShaderBackground from "@/components/shader-background"
import { JuniorForm } from "@/components/junior-form"
import Image from "next/image"

export default function FormPage() {
  return (
    <ShaderBackground>
      <div className="flex flex-col justify-center items-center min-h-screen pt-20 pb-12 px-4">
        
        {/* This wrapper adds your Title and Logo and keeps them on top */}
        <div className="w-full max-w-2xl relative z-30">
          {/* Logo */}
          <Image
            src="/csi-logo.png"
            alt="CSI Logo"
            width={160}
            height={64}
            className="h-16 w-auto mx-auto mb-6"
          />

          {/* Form Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-2 instrument">
              CSI Junior Core Registration
            </h1>
            <p className="text-base text-white/70">
              We're excited to have you on board. Fill out the form to apply.
            </p>
          </div>
        </div>

        {/* The Form (and its success state) will appear below the title */}
        <div className="w-full max-w-2xl">
          <JuniorForm />
        </div>
      </div>
    </ShaderBackground>
  )
}