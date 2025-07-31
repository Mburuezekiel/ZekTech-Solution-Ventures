import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Code, 
  Smartphone, 
  Search, 
  CheckCircle, 
  ArrowRight,
  Palette,
  Database,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Building,
  Rocket
} from "lucide-react";

const Services = () => {
  const services = [
    {
      id: "web-design",
      icon: Globe,
      title: "Web Design",
      subtitle: "Beautiful, Converting Designs",
      description: "Create stunning, user-friendly websites that captivate your audience and drive conversions.",
      features: [
        "Responsive design for all devices",
        "User experience (UX) optimization",
        "Modern, professional aesthetics",
        "Brand-aligned visual identity",
        "Fast loading, optimized layouts",
        "Accessibility compliance"
      ],
      tools: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator"],
      pricing: "Starting from $1,500",
      forWho: ["Startups needing brand presence", "SMEs refreshing their image", "Businesses expanding online"],
      benefits: [
        "Increase credibility and trust",
        "Improve user engagement",
        "Higher conversion rates",
        "Better mobile experience"
      ]
    },
    {
      id: "web-development",
      icon: Code,
      title: "Web Development",
      subtitle: "Robust, Scalable Solutions",
      description: "Build powerful web applications with modern technology stacks that grow with your business.",
      features: [
        "Custom web applications",
        "E-commerce platforms",
        "Content management systems",
        "API development & integration",
        "Database design & optimization",
        "Security implementation"
      ],
      tools: ["React", "Node.js", "Python", "WordPress", "Shopify", "MongoDB"],
      pricing: "Starting from $3,000",
      forWho: ["Businesses needing custom solutions", "E-commerce companies", "Organizations with complex requirements"],
      benefits: [
        "Streamlined business processes",
        "Enhanced productivity",
        "Scalable architecture",
        "Improved performance"
      ]
    },
    {
      id: "mobile-development",
      icon: Smartphone,
      title: "Mobile App Development",
      subtitle: "Native & Cross-Platform Apps",
      description: "Develop feature-rich mobile applications for iOS and Android that engage users and drive growth.",
      features: [
        "Native iOS & Android apps",
        "Cross-platform development",
        "UI/UX design for mobile",
        "App store optimization",
        "Push notifications",
        "Offline functionality"
      ],
      tools: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "MongoDB"],
      pricing: "Starting from $5,000",
      forWho: ["Startups entering mobile market", "Businesses expanding reach", "Companies needing mobile solutions"],
      benefits: [
        "Reach mobile-first customers",
        "Increase user engagement",
        "Generate new revenue streams",
        "Build brand loyalty"
      ]
    },
    {
      id: "seo",
      icon: Search,
      title: "SEO Optimization",
      subtitle: "Dominate Search Rankings",
      description: "Boost your online visibility and drive organic traffic with comprehensive SEO strategies.",
      features: [
        "Keyword research & strategy",
        "On-page optimization",
        "Technical SEO audits",
        "Content optimization",
        "Link building campaigns",
        "Performance monitoring"
      ],
      tools: ["Google Analytics", "SEMrush", "Ahrefs", "Google Search Console", "Screaming Frog"],
      pricing: "Starting from $800/month",
      forWho: ["Businesses seeking online visibility", "E-commerce sites", "Local service providers"],
      benefits: [
        "Increase organic traffic",
        "Higher search rankings",
        "Better ROI than paid ads",
        "Long-term sustainable growth"
      ]
    }
  ];

  const targetAudiences = [
    {
      icon: Rocket,
      title: "Startups",
      description: "Launch your vision with MVP development, brand identity, and growth-focused solutions.",
      needs: ["Quick time-to-market", "Cost-effective solutions", "Scalable architecture", "Modern tech stack"]
    },
    {
      icon: Building,
      title: "SMEs",
      description: "Scale your business with custom applications, process automation, and digital transformation.",
      needs: ["Process optimization", "Custom integrations", "Legacy system updates", "Mobile presence"]
    },
    {
      icon: Users,
      title: "Global Businesses",
      description: "Enterprise-grade solutions with international reach, security, and compliance.",
      needs: ["Enterprise security", "Multi-language support", "Global scalability", "Compliance standards"]
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions tailored to your business needs. From design to deployment, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="web-design" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-12 h-auto">
              {services.map((service) => (
                <TabsTrigger 
                  key={service.id} 
                  value={service.id}
                  className="flex flex-col items-center p-6 text-left h-auto"
                >
                  <service.icon className="w-8 h-8 mb-2" />
                  <span className="font-semibold">{service.title}</span>
                  <span className="text-xs text-muted-foreground">{service.subtitle}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mr-4">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-foreground">{service.title}</h2>
                        <p className="text-lg text-primary">{service.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-foreground mb-4">What's Included:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Technologies We Use:</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.tools.map((tool, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gradient-subtle rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Investment</p>
                        <p className="text-2xl font-bold text-primary">{service.pricing}</p>
                      </div>
                      <Button variant="hero">
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <Card className="border-0 shadow-card">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                          <Users className="w-6 h-6 mr-2 text-primary" />
                          Who It's For
                        </h3>
                        <ul className="space-y-2">
                          {service.forWho.map((who, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{who}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-card">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                          <TrendingUp className="w-6 h-6 mr-2 text-primary" />
                          Key Benefits
                        </h3>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perfect For Your Business Type
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tailored solutions for every stage of your business journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targetAudiences.map((audience, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <audience.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {audience.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {audience.description}
                  </p>
                  <div className="space-y-2">
                    {audience.needs.map((need, needIndex) => (
                      <div key={needIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span>{need}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Let's discuss your project and find the perfect solution for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" className="text-lg">
              Schedule Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;