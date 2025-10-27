"use client"

import * as React from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Confetti from "react-confetti" 

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"

// 1. Validation Schema (no change from last time)
const phoneRegex = new RegExp(
  /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
);
const portfolioTeams = ["Tech", "Multimedia", "Design"];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  enrollment: z.string().min(4, {
    message: "Please enter a valid Enrollment No. or Year.",
  }),
  course: z.string().min(2, {
    message: "Please enter your course.",
  }),
  phone: z.string().regex(phoneRegex, {
    message: "Please enter a valid 10-digit Indian phone number.",
  }),
  team: z.enum([
    "Tech",
    "Multimedia",
    "Research",
    "Management",
    "PR",
    "Sponsorship",
    "Design",
  ], {
    required_error: "Please select a team.",
  }),
  why: z.string().min(20, {
    message: "Please tell us a bit more (min. 20 characters).",
  }).max(500, {
    message: "Response must be under 500 characters."
  }),
  portfolio: z.string().optional(),
  experience: z.string().optional(),
}).refine(data => {
  if (portfolioTeams.includes(data.team)) {
    if (!data.portfolio || data.portfolio.trim() === "") {
      return false; 
    }
    try {
      new URL(data.portfolio);
      return true;
    } catch (error) {
      return false;
    }
  }
  return true;
}, {
  message: "A valid portfolio URL is required for this team.",
  path: ["portfolio"],
});

type FormValues = z.infer<typeof formSchema>;

const teamChoices = [
  "Tech",
  "Multimedia",
  "Research",
  "Management",
  "PR",
  "Sponsorship",
  "Design",
];

export function JuniorForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      enrollment: "",
      course: "",
      phone: "",
      why: "",
      portfolio: "",
      experience: "",
    },
  })

  const watchedTeam = form.watch("team")
  const showPortfolio = portfolioTeams.includes(watchedTeam)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])

  async function onSubmit(values: FormValues) {
    setIsLoading(true)

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong. Please try again.');
      }

      setIsLoading(false)
      setIsSuccess(true)

    } catch (error: any) {
      console.error(error);
      setIsLoading(false)
      alert(error.message);
    }
  }

  // 3. Handle the success state (with z-index fixes)
  if (isSuccess) {
    return (
      <>
        {typeof window !== "undefined" && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            // This zIndex keeps it above the background but below the title/card
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 10 }}
          />
        )}
        {/* This zIndex keeps the card on top of the confetti */}
        <div className="relative z-20 bg-black/50 backdrop-blur-lg border border-white/20 rounded-lg p-8 text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Thank You!
          </h2>
          <p className="text-lg text-white/80">
            Your form has been submitted successfully!
          </p>
          <p className="text-white/80">We'll be in touch with you soon.</p>
        </div>
      </>
    )
  }

  // 4. The Form JSX (with new glassy styles)
  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        // --- UPDATED STYLES FOR GLASS EFFECT ---
        className="space-y-6 bg-black/30 backdrop-blur-lg border border-white/20 rounded-lg p-6 md:p-8 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Goutam" 
                    {...field} 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:ring-offset-violet-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="enrollment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Enrollment No. / Year</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="E23BU... / 1st Year" 
                    {...field} 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:ring-offset-violet-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Course</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="B.Tech CSE" 
                    {...field} 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:ring-offset-violet-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="9876543210" 
                    {...field} 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:ring-offset-violet-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">Team Choice</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full bg-white/10 border-white/20 text-white data-[placeholder]:text-white/50 focus:bg-white/20 focus:ring-offset-violet-500">
                    <SelectValue placeholder="Select the team you want to join" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-black/50 backdrop-blur-lg border-white/20 text-white">
                  {teamChoices.map(team => (
                    <SelectItem 
                      key={team} 
                      value={team}
                      className="focus:bg-white/20"
                    >
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className={cn("transition-all duration-300", showPortfolio ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden")}>
          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Portfolio Link</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://github.com/..." 
                    {...field} 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:ring-offset-violet-500"
                  />
                </FormControl>
                <FormDescription className="text-white/60">
                  Link your GitHub, Behance, Dribbble, or personal portfolio.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="why"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">Why do you want to join CSI?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your passion for tech, your skills, or what you hope to learn..."
                  className="resize-none bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:ring-offset-violet-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">
                Past Experience <span className="text-white/50">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any previous clubs, projects, or work you'd like to share?"
                  className="resize-none bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:ring-offset-violet-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            className="px-8 py-3 h-auto rounded-full bg-white text-black font-normal text-sm transition-all duration-300 hover:bg-white/90 cursor-pointer flex items-center z-10 gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner className="size-4" />
            ) : (
              <Image
                src="/csi-logo.png"
                alt=""
                width={24}
                height={24}
                className="h-5 w-auto"
              />
            )}
            {isLoading ? "Submitting..." : "Submit Application"}
          </Button>
        </div>

      </form>
    </Form>
  )
}