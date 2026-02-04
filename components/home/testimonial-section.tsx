"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      quote: "The dossier engineering was flawless. My Lebenslauf went from standard to German-market-ready in days. Truly precise work.",
      name: "Bessie Cooper",
      title: "Senior Developer",
      company: "Berlin Tech",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      quote: "Language coaching at this level is rare. They don't just teach German; they teach you how to survive and thrive in a German office.",
      name: "Albert Flores",
      title: "Engineering Lead",
      company: "Munich Systems",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      quote: "Success in Germany is about precision and documents. DeutschPrepa provided both. I secured my Ausbildung within two months.",
      name: "Jenny Wilson",
      title: "Med Tech Student",
      company: "Charité Prep",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Custom "industrial" ease
    },
  };

  return (
    <section className="w-full py-24 sm:py-32 px-6 bg-white relative overflow-hidden">
      {/* Background Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 40L40 0L0 0L0 40ZM39 39L1 39L1 1L39 1L39 39Z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Industrial Style */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-10 h-[2px] bg-red-600" />
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px]">
              Case Studies
            </span>
          </motion.div>

          {/* Reveal Mask Animation for Headline */}
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-7xl font-black text-slate-950 uppercase tracking-tighter leading-[0.85] mb-6"
            >
              Verified <br />
              <span className="text-red-600 italic font-serif lowercase tracking-normal">
                Success
              </span>{" "}
              Stories.
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="max-w-xl text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed"
          >
            Over{" "}
            <span className="text-slate-900 border-b-2 border-red-600">
              1,000+ professionals
            </span>{" "}
            engineered their careers through our bureau.
          </motion.p>
        </div>

        {/* Testimonials Grid - Staggered Entrance */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className="group h-full border-none shadow-none bg-slate-50/50 rounded-none border-l-2 border-slate-200 hover:border-red-600 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50"
              >
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Quote Icon with hover rotate */}
                  <Quote className="w-10 h-10 text-slate-200 mb-6 group-hover:text-red-600/20 group-hover:rotate-12 transition-all duration-500" />

                  {/* Quote Text */}
                  <p className="text-slate-900 text-lg font-medium leading-relaxed grow italic font-serif">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Divider - Animates width on hover */}
                  <div className="my-8 h-[1px] w-full bg-slate-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-600 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-700" />
                  </div>

                  {/* Author Block */}
                  <div className="flex items-center gap-4">
                    <div className="relative overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-none grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-600 z-10" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-950 uppercase tracking-tighter text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600/70">
                        {testimonial.title} // {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}