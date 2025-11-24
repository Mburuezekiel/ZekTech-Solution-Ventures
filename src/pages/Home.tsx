import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Globe, 
  Code, 
  Smartphone, 
  Search, 
  ArrowRight, 
  CheckCircle,
  Star,
  Building,
  Rocket,
  Users
} from "lucide-react";

const Home = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Design",
      description: "Beautiful, responsive designs that convert visitors into customers.",
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, scalable web applications built with cutting-edge technology.",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile apps for iOS and Android.",
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Boost your online visibility and rank higher on search engines.",
    },
  ];

  const clientTypes = [
    {
      icon: Rocket,
      title: "Startups",
      description: "Launch your vision with modern tech solutions",
    },
    {
      icon: Building,
      title: "SMEs",
      description: "Scale your business with reliable digital tools",
    },
    {
      icon: Users,
      title: "Global Businesses",
      description: "Enterprise solutions for worldwide reach",
    },
  ];

  const testimonials = [
    {
      name: "Ezekiel Njuguna",
      role: "CEO, InuaFund CrowdFunding",
      content: "ZEKTECH transformed our online presence completely. The website they built increased our reach  by 250%.",
      rating: 5,
    },
    {
      name: "Dr. John  Ndia",
      role: "Dean, Murang'a University",
      content: "Professional, reliable, and incredibly talented. They delivered our  mapping mobile app ahead of schedule and under budget.",
      rating: 5,
    },
    {
      name: " Rose ",
      role: "Marketing Director, Krystal Mall",
      content: "Their SEO expertise helped us rank #1 for our key terms. Revenue increased by 180% in just 6 months.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Animated background hero image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ken-burns"
          style={{ 
            backgroundImage: "url('/Background.png')",
          }}
        />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        {/* Foreground Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl  md:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up ">
            Your Trusted Partner for Freelance Digital Solutions
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up-delay">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-lg shadow-2xl hover:shadow-blue-600/50 transition-all duration-300 hover:scale-105"
              onClick={() => window.location.href = '/consultation'}
            >
              Get a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-7 text-lg backdrop-blur-sm bg-white/10 hover:scale-105 transition-all duration-300"
              onClick={() => window.location.href = '/services'}
            >
              Explore Our Services
            </Button>
          </div>
        </div>
        
        {/* Custom CSS for animations */}
        <style>{`
          @keyframes ken-burns {
            0% {
              transform: scale(1) translateX(0);
            }
            50% {
              transform: scale(1.1) translateX(-2%);
            }
            100% {
              transform: scale(1) translateX(0);
            }
          }
          
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-ken-burns {
            animation: ken-burns 20s ease-in-out infinite;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out;
          }
          
          .animate-fade-in-up-delay {
            animation: fade-in-up 1s ease-out 0.3s both;
          }
        `}</style>
      </div>

      {/* Services Overview */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What We Do
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 border-0 shadow-md hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We work with bold thinkers, growing businesses, and forward-moving founders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clientTypes.map((client, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-300">
                  <client.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {client.title}
                </h3>
                <p className="text-muted-foreground text-lg">
                  {client.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results from real partnerships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Next Big Idea?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Let's turn your vision into reality with smart technology solutions that deliver real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="accent" 
              size="xl" 
              className="text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              Let's Talk
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg"
              onClick={() => window.location.href = '/projects'}
            >
              View Our Work
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;