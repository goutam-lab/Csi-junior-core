"use client";

import * as React from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Confetti from "react-confetti";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";

const phoneRegex = new RegExp(/^(\+91[\-\s]?)?[0]?(91)?[6-9]\d{9}$/);
const portfolioTeams = ["Tech", "Multimedia", "Design"];

const formSchema = z
  .object({
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
    residency: z.enum(["Hosteller", "Day Scholar"], {
      required_error: "Please select your residency type.",
    }),
    teams: z
      .array(z.string())
      .min(1, {
        message: "Please select at least one team.",
      })
      .max(3, {
        message: "You can select a maximum of 3 teams.",
      }),
    why: z
      .string()
      .min(20, {
        message: "Please tell us a bit more (min. 20 characters).",
      })
      .max(500, {
        message: "Response must be under 500 characters.",
      }),
    portfolio: z.string().optional(),
    experience: z.string().optional(),
  })
  .refine(
    (data) => {
      const requiresPortfolio = data.teams.some((team) =>
        portfolioTeams.includes(team)
      );
      if (requiresPortfolio) {
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
    },
    {
      message:
        "A valid portfolio URL is required for Tech, Multimedia, or Design teams.",
      path: ["portfolio"],
    }
  );

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      enrollment: "",
      course: "",
      phone: "",
      residency: undefined,
      teams: [],
      why: "",
      portfolio: "",
      experience: "",
    },
  });

  const watchedTeams = form.watch("teams");
  const showPortfolio =
    watchedTeams?.some((team) => portfolioTeams.includes(team)) || false;

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    console.log("Form data being submitted:", values);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(
          errorData.message || "Something went wrong. Please try again."
        );
      }

      const result = await response.json();
      console.log("Success response:", result);

      setIsLoading(false);
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Submission error:", error);
      setIsLoading(false);
      alert(error.message);
    }
  }

  if (isSuccess) {
    return (
      <>
        {typeof window !== "undefined" && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            style={{ position: "fixed", top: 0, left: 0, zIndex: 10 }}
          />
        )}
        <div className="relative z-20 bg-black/50 backdrop-blur-lg border border-white/20 rounded-lg p-8 text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-lg text-white/80">
            Your form has been submitted successfully!
          </p>
          <p className="text-white/80">We'll be in touch with you soon.</p>
        </div>
      </>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
                <FormLabel className="text-white font-medium">
                  Enrollment No. / Year
                </FormLabel>
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
                <FormLabel className="text-white font-medium">
                  Phone Number
                </FormLabel>
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

          <FormField
            control={form.control}
            name="residency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">
                  Residency Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-white/10 border-white/20 text-white data-[placeholder]:text-white/50 focus:bg-white/20 focus:ring-offset-violet-500">
                      <SelectValue placeholder="Select residency type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black/50 backdrop-blur-lg border-white/20 text-white">
                    <SelectItem value="Hosteller" className="focus:bg-white/20">
                      Hosteller
                    </SelectItem>
                    <SelectItem
                      value="Day Scholar"
                      className="focus:bg-white/20"
                    >
                      Day Scholar
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="teams"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-white font-medium">
                  Team Choices (Select 1-3)
                </FormLabel>
                <FormDescription className="text-white/60">
                  You can select up to 3 teams you'd like to join.
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamChoices.map((team) => (
                  <FormField
                    key={team}
                    control={form.control}
                    name="teams"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={team}
                          className="flex flex-row items-start space-x-3 space-y-0 bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(team)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, team])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== team
                                      )
                                    );
                              }}
                              disabled={
                                !field.value?.includes(team) &&
                                (field.value?.length ?? 0) >= 3
                              }
                              className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal text-white cursor-pointer">
                            {team}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div
          className={cn(
            "transition-all duration-300",
            showPortfolio
              ? "opacity-100 max-h-96"
              : "opacity-0 max-h-0 overflow-hidden"
          )}
        >
          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">
                  Portfolio Link
                </FormLabel>
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
              <FormLabel className="text-white font-medium">
                Why do you want to join CSI?
              </FormLabel>
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
                Past Experience{" "}
                <span className="text-white/50">(Optional)</span>
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
  );
}
