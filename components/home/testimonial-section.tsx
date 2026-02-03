import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "The dossier engineering was flawless. My Lebenslauf went from standard to German-market-ready in days. Truly precise work.",
      name: "Bessie Cooper",
      title: "Senior Developer",
      company: "Berlin Tech",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      quote:
        "Language coaching at this level is rare. They don't just teach German; they teach you how to survive and thrive in a German office.",
      name: "Albert Flores",
      title: "Engineering Lead",
      company: "Munich Systems",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      quote:
        "Success in Germany is about precision and documents. DeutschPrepa provided both. I secured my Ausbildung within two months.",
      name: "Jenny Wilson",
      title: "Med Tech Student",
      company: "Charité Prep",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  return (
    <section className="w-full py-24 sm:py-32 px-6 bg-white relative overflow-hidden">
      {/* Background Subtle Grid - Keeps it "Industrial" even on white */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 40L40 0L0 0L0 40ZM39 39L1 39L1 1L39 1L39 39Z'/%3E%3C/g%3E%3C/svg%3E")` }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Industrial Style */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-[2px] bg-red-600" />
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px]">Case Studies</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-950 uppercase tracking-tighter leading-[0.85] mb-6">
            Verified <br />
            <span className="text-red-600 italic font-serif lowercase tracking-normal">Success</span> Stories.
          </h2>
          <p className="max-w-xl text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
            Over <span className="text-slate-900 border-b-2 border-red-600">1,000+ professionals</span> engineered their careers through our bureau.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group border-none shadow-none bg-slate-50/50 rounded-none border-l-2 border-slate-200 hover:border-red-600 transition-all duration-300"
            >
              <CardContent className="p-8 flex flex-col h-full">
                {/* Quote Icon - Clean Slate Grey */}
                <Quote className="w-10 h-10 text-slate-200 mb-6 group-hover:text-red-600/20 transition-colors" />

                {/* Quote - Serif/Sharp Mix */}
                <p className="text-slate-900 text-lg font-medium leading-relaxed grow italic font-serif">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Divider - Industrial Dash */}
                <div className="my-8 border-t border-dashed border-slate-200" />

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-none grayscale group-hover:grayscale-0 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-600" />
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
          ))}
        </div>
      </div>
    </section>
  );
}