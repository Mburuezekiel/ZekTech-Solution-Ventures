import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Target, 
  Heart, 
  Lightbulb, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Award,
  Clock,
  Handshake
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Innovation First",
      description: "We stay ahead of technology trends to deliver cutting-edge solutions that give you a competitive advantage.",
    },
    {
      icon: Heart,
      title: "Client-Centric",
      description: "Your success is our success. We build lasting partnerships based on trust, transparency, and exceptional results.",
    },
    {
      icon: Lightbulb,
      title: "Creative Problem Solving",
      description: "Every challenge is an opportunity. We think outside the box to find smart solutions for complex problems.",
    },
    {
      icon: Handshake,
      title: "Reliability",
      description: "On-time delivery, clear communication, and consistent quality you can count on, project after project.",
    },
  ];

  const approach = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "We start by understanding your business, goals, and challenges to create a tailored strategy.",
    },
    {
      step: "02",
      title: "Design & Planning",
      description: "Crafting user-centered designs and detailed project roadmaps for optimal execution.",
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Building robust solutions with rigorous testing to ensure quality and performance.",
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "Seamless deployment with ongoing support and optimization for continued success.",
    },
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "3+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About ZEKTECH
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're a passionate team of freelance technology experts dedicated to transforming businesses through smart, innovative digital solutions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At ZEKTECH, we believe that every business deserves access to world-class technology solutions, regardless of size or budget. Our mission is to democratize digital innovation by providing freelance expertise that rivals large agencies.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We're not just developers and designers – we're strategic partners committed to your long-term success. From startups taking their first digital steps to established enterprises seeking transformation, we deliver solutions that scale with your ambitions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  <span className="text-foreground">Transparent communication throughout every project</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  <span className="text-foreground">Agile development with regular updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  <span className="text-foreground">Post-launch support and optimization</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-hero rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <Award className="w-24 h-24 mx-auto mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold mb-2">Excellence Driven</h3>
                  <p className="text-blue-100">Quality is never an accident</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision and drive every project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Approach
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures project success from concept to completion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approach.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  {index < approach.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-border -translate-x-10"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Let's discuss how we can help transform your business with smart technology solutions.
          </p>
          <Button variant="accent" size="xl" className="text-lg">
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;