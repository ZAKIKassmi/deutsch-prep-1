import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "We love Landingfolio! Our designers were using it for their projects, so clients already knew what Landingfolio was and how to use.",
      name: "Bessie Cooper",
      title: "Co-Founder, CEO",
      company: "Alterbone",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      quote:
        "I didn't know designing in Figma could be this individualized. I'd never considered it before, but Landingfolio changed my mind.",
      name: "Albert Flores",
      title: "Senior Product Manager",
      company: "Ridoria",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      quote:
        "We love Landingfolio! Our designers were using it for their projects, so clients already knew what Landingfolio was and how to use.",
      name: "Jenny Wilson",
      title: "Head of Marketing",
      company: "Incanto",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  return (
    <section className="w-full  py-16 sm:py-20 px-4 relative ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Don&apos;t just take our words.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Over <span className="font-semibold text-gray-900">1000+</span>{" "}
            people trust us worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group border border-black/10 bg-white rounded-lg "
            >
              <CardContent className="p-6 sm:p-4 flex flex-col h-full">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-indigo-500 mb-4 opacity-80" />

                {/* Quote */}
                <p className="text-gray-800 text-base sm:text-lg leading-relaxed grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="my-6 h-px w-full bg-gray-100" />

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
