import { 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Briefcase, 
  type LucideIcon, 
  Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceItem {
  id: string;
  step: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  features: string[];
  cta: string;
  gradient: string;
  lightBg: string;
  mainColor: string;
  shadowColor: string;
}

const services: ServiceItem[] = [
  {
    id: "german",
    step: "STEP 01",
    title: "Master the Language",
    description: "Your journey starts with communication. We help you reach the required levels to live and work confidently in Germany.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: BookOpen,
    gradient: "from-violet-600 to-indigo-600",
    lightBg: "bg-violet-50",
    mainColor: "text-violet-600",
    shadowColor: "shadow-violet-500/25",
    features: [
      "A1 to C2 Intensive Courses",
      "Native German Instructors",
      "Interactive Speaking Drills",
      "TestDaF / Goethe Prep",
    ],
    cta: "Start Learning",
  },
  {
    id: "docs",
    step: "STEP 02",
    title: "Prepare Your Dossier",
    description: "We help you build a professional German application (Dossier) including your Lebenslauf, Motivation Letter, and Bac translations.",
    image: "https://images.unsplash.com/photo-1454496406107-dc34337da8d6?q=80&w=1300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: FileText,
    gradient: "from-pink-500 to-rose-600",
    lightBg: "bg-pink-50",
    mainColor: "text-pink-600",
    shadowColor: "shadow-pink-500/25",
    features: [
      "Professional Lebenslauf (CV)",
      "Targeted Motivation Letters",
      "BAC & Internship Proofs",
      "Certified Document Prep",
    ],
    cta: "Build My Dossier",
  },
  {
    id: "jobs",
    step: "STEP 03",
    title: "Secure Your Ausbildung",
    description: "Finally, we connect you with top companies across all Germany to find the perfect vocational training for your career.",
    image: "https://images.unsplash.com/photo-1618259278412-2819cbdea4dc?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Briefcase,
    gradient: "from-cyan-500 to-blue-600",
    lightBg: "bg-cyan-50",
    mainColor: "text-cyan-600",
    shadowColor: "shadow-cyan-500/25",
    features: [
      "1000+ Nationwide Vacancies",
      "Placement across all Germany",
      "Interview Coaching",
      "Visa Finalization Support",
    ],
    cta: "Find My Place",
  },
];

export default function ServiceSection() {
  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden bg-slate-50/50">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-violet-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-cyan-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Your 3-Step Path to <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500">Success</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            We don't just offer services; we provide a complete <b>end-to-end journey</b>. 
            From your first German word to your first day at work in Germany, we are with you.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
          
          {/* Optional: Visual connector line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-200 -z-10" />

          {services.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Step Badge */}
              <div className={`absolute top-4 right-6 z-30 px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-white/90 backdrop-blur-md shadow-sm border border-slate-100 ${service.mainColor}`}>
                {service.step}
              </div>

              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-slate-900/0 transition-colors duration-500" />
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="px-8 pb-8 pt-2 flex flex-col flex-grow relative">
                
                {/* Floating Icon */}
                <div className="absolute -top-12 left-8 z-30">
                  <div className={`w-16 h-16 rounded-2xl ${service.lightBg} border-4 border-white shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <service.icon className={`w-8 h-8 ${service.mainColor}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-8 mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`mt-1 rounded-full p-0.5 ${service.lightBg} shrink-0`}>
                         <CheckCircle2 className={`w-3 h-3 ${service.mainColor}`} />
                      </div>
                      <span className="text-[13px] text-slate-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Button 
                  className={`w-full h-12 rounded-xl text-white cursor-pointer font-bold tracking-wide bg-gradient-to-r ${service.gradient} shadow-lg ${service.shadowColor} hover:scale-[1.02] transition-all duration-300 group/btn border-0`}
                >
                  {service.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 font-medium italic">
            Success in Germany is a process. Start Step 1 today.
          </p>
        </div>
      </div>
    </section>
  );
} 