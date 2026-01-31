import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  FileText,
  Briefcase,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";

export default function ServiceSection() {
  return (
    <section id="services" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive services designed to support your integration and
            career development in Germany
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* German Learning Service */}
          <Card className="relative overflow-hidden border-2 hover:border-blue-500 transition-all hover:shadow-xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full" />
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Learn German</CardTitle>
              <CardDescription className="text-base">
                Master the German language with personalized lessons and
                interactive exercises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">
                    A1 to C2 level courses
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">
                    Native German instructors
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">
                    Interactive learning tools
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">
                    Certificate preparation
                  </span>
                </li>
              </ul>
              <Button className="w-full mt-6 group-hover:bg-blue-700">
                Start Learning
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Document Assistance Service */}
          <Card className="relative overflow-hidden border-2 hover:border-purple-500 transition-all hover:shadow-xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full" />
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Document Assistance</CardTitle>
              <CardDescription className="text-base">
                Expert help with visa, residence permits, and official paperwork
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">
                    Visa application support
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">
                    Document translation
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">
                    Application reviews
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">
                    Step-by-step guidance
                  </span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                Get Help
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Ausbildung Finder Service */}
          <Card className="relative overflow-hidden border-2 hover:border-green-500 transition-all hover:shadow-xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full" />
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Find Ausbildung</CardTitle>
              <CardDescription className="text-base">
                Discover and apply for vocational training programs across
                Germany
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">
                    1000+ opportunities
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">
                    Personalized matching
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">
                    Application tracking
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">
                    Career counseling
                  </span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                Browse Programs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
