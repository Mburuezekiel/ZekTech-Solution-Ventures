import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link as RouterLink } from "react-router-dom";
import PageLoader from "@/components/PageLoader";
import BackToTop from "@/components/BackToTop";

// --- Data (Unchanged) ---
const services = [
  {
    id: "web-design",
    title: "Web Design",
    subtitle: "Beautiful, Converting Designs",
    description: "Create stunning, user-friendly websites that captivate your audience and drive conversions.",
    icon: "solar:palette-2-bold",
    features: [
      "Responsive design for all devices",
      "User experience (UX) optimization",
      "Modern, professional aesthetics",
      "Brand-aligned visual identity",
      "Fast loading, optimized layouts",
      "Accessibility compliance"
    ],
    tools: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator"],
    pricing: "Starting from KSh 5,000",
    timeline: "1-2 weeks",
    forWho: ["Startups needing brand presence", "SMEs refreshing their image", "Businesses expanding online"],
    benefits: [
      "Increase credibility and trust",
      "Improve user engagement",
      "Higher conversion rates",
      "Better mobile experience"
    ],
    detailedContent: {
      overview: "Our web design service focuses on creating visually stunning and highly functional websites that drive business results. We combine creativity with strategic thinking to deliver designs that not only look great but also perform exceptionally.",
      process: [
        "Discovery & Research - Understanding your business goals and target audience",
        "Wireframing & Architecture - Creating the blueprint for your website structure", 
        "Visual Design - Crafting beautiful interfaces that align with your brand",
        "Prototyping - Building interactive prototypes for testing and feedback",
        "Final Design - Delivering pixel-perfect designs ready for development"
      ],
      caseStudy: {
        title: "E-commerce Redesign Success",
        description: "We redesigned an online fashion retailer's website, resulting in a 150% increase in conversion rates and 200% improvement in mobile user engagement.",
        metrics: ["150% increase in conversions", "200% mobile engagement boost", "40% reduction in bounce rate"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500"
      }
    }
  },
  {
    id: "web-development",
    title: "Web Development", 
    subtitle: "Robust, Scalable Solutions",
    description: "Build powerful web applications with modern technology stacks that grow with your business.",
    icon: "solar:code-2-bold",
    features: [
      "Custom web applications",
      "E-commerce platforms", 
      "Content management systems",
      "API development & integration",
      "Database design & optimization",
      "Security implementation"
    ],
    tools: ["React", "Node.js", "Python", "WordPress", "Shopify", "MongoDB"],
    pricing: "Starting from KSh 10,000",
    timeline: "2-8 weeks",
    forWho: ["Businesses needing custom solutions", "E-commerce companies", "Organizations with complex requirements"],
    benefits: [
      "Streamlined business processes",
      "Enhanced productivity", 
      "Scalable architecture",
      "Improved performance"
    ],
    detailedContent: {
      overview: "Our web development service delivers high-performance, scalable web applications using cutting-edge technologies. We build solutions that grow with your business and provide exceptional user experiences.",
      process: [
        "Technical Planning - Architecture design and technology stack selection",
        "Frontend Development - Creating responsive, interactive user interfaces",
        "Backend Development - Building robust server-side logic and APIs",
        "Database Design - Structuring efficient data storage solutions",
        "Testing & Deployment - Ensuring quality through comprehensive testing"
      ],
      caseStudy: {
        title: "SaaS Platform Development",
        description: "We built a comprehensive project management SaaS platform that now serves over 10,000 active users with 99.9% uptime.",
        metrics: ["10,000+ active users", "99.9% uptime", "50ms average response time"],
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500"
      }
    }
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    subtitle: "Native & Cross-Platform Apps", 
    description: "Develop feature-rich mobile applications for iOS and Android that engage users and drive growth.",
    icon: "solar:smartphone-2-bold",
    features: [
      "Native iOS & Android apps",
      "Cross-platform development",
      "UI/UX design for mobile",
      "App store optimization",
      "Push notifications",
      "Offline functionality"
    ],
    tools: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "MongoDB"],
    pricing: "Starting from KSh 100,000",
    timeline: "6-12 weeks",
    forWho: ["Startups entering mobile market", "Businesses expanding reach", "Companies needing mobile solutions"],
    benefits: [
      "Reach mobile-first customers",
      "Increase user engagement",
      "Generate new revenue streams", 
      "Build brand loyalty"
    ],
    detailedContent: {
      overview: "Our mobile app development service creates engaging, high-performance mobile applications that provide seamless user experiences across all devices and platforms.",
      process: [
        "Strategy & Planning - Defining app goals and user journey mapping",
        "UI/UX Design - Creating intuitive and engaging mobile interfaces",
        "Development - Building native or cross-platform applications",
        "Testing - Comprehensive testing across devices and platforms",
        "Launch & Support - App store submission and ongoing maintenance"
      ],
      caseStudy: {
        title: "Fitness App Success",
        description: "We developed a fitness tracking app that achieved 100,000+ downloads in its first month and maintains a 4.8-star rating.",
        metrics: ["100,000+ downloads", "4.8-star rating", "80% user retention"],
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
      }
    }
  },
  {
    id: "seo",
    title: "SEO Optimization",
    subtitle: "Dominate Search Rankings",
    description: "Boost your online visibility and drive organic traffic with comprehensive SEO strategies.",
    icon: "solar:eye-bold",
    features: [
      "Keyword research & strategy",
      "On-page optimization",
      "Technical SEO audits",
      "Content optimization",
      "Link building campaigns",
      "Performance monitoring"
    ],
    tools: ["Google Analytics", "SEMrush", "Ahrefs", "Google Search Console", "Screaming Frog"],
    pricing: "Starting from KSh 80,000/month",
    timeline: "3-6 months",
    forWho: ["Businesses seeking online visibility", "E-commerce sites", "Local service providers"],
    benefits: [
      "Increase organic traffic",
      "Higher search rankings",
      "Better ROI than paid ads",
      "Long-term sustainable growth"
    ],
    detailedContent: {
      overview: "Our SEO service helps businesses improve their search engine rankings and drive qualified organic traffic through proven strategies and data-driven optimization techniques.",
      process: [
        "SEO Audit - Comprehensive analysis of current website performance",
        "Keyword Strategy - Research and targeting of high-value keywords",
        "On-page Optimization - Optimizing content and technical elements",
        "Content Creation - Developing SEO-focused, valuable content",
        "Monitoring & Reporting - Tracking progress and adjusting strategies"
      ],
      caseStudy: {
        title: "Local Business SEO Growth",
        description: "We helped a local service business increase their organic traffic by 300% and achieve first-page rankings for 15 target keywords.",
        metrics: ["300% traffic increase", "15 first-page rankings", "250% lead generation boost"],
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=500"
      }
    }
  }
];

const targetAudiences = [
  {
    icon: "solar:rocket-bold",
    title: "Startups",
    description: "Launch your vision with MVP development, brand identity, and growth-focused solutions.",
    needs: ["Quick time-to-market", "Cost-effective solutions", "Scalable architecture", "Modern tech stack"]
  },
  {
    icon: "solar:buildings-2-bold",
    title: "SMEs", 
    description: "Scale your business with custom applications, process automation, and digital transformation.",
    needs: ["Process optimization", "Custom integrations", "Legacy system updates", "Mobile presence"]
  },
  {
    icon: "solar:users-group-two-rounded-bold",
    title: "Global Businesses",
    description: "Enterprise-grade solutions with international reach, security, and compliance.",
    needs: ["Enterprise security", "Multi-language support", "Global scalability", "Compliance standards"]
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState("web-design");
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [isIdle, setIsIdle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- IDLE ANIMATION LOGIC ---
  const IDLE_TIMEOUT_MS = 10000; // 10 seconds
  const [lastActive, setLastActive] = useState(Date.now());

  const resetActivityTimer = useCallback(() => {
    setLastActive(Date.now());
    setIsIdle(false);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const checkIdle = () => {
      if (Date.now() - lastActive > IDLE_TIMEOUT_MS) {
        setIsIdle(true);
      }
    };

    // Set up interval to check idle status
    timer = setInterval(checkIdle, 2000); 

    // Add activity listeners
    window.addEventListener('mousemove', resetActivityTimer);
    window.addEventListener('mousedown', resetActivityTimer);
    window.addEventListener('scroll', resetActivityTimer);
    window.addEventListener('keypress', resetActivityTimer);

    // Clean up event listeners and timer
    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', resetActivityTimer);
      window.removeEventListener('mousedown', resetActivityTimer);
      window.removeEventListener('scroll', resetActivityTimer);
      window.removeEventListener('keypress', resetActivityTimer);
    };
  }, [lastActive, resetActivityTimer]);

  const idlePulse = {
    scale: [1, 0.95, 1],
  };
  // --- END IDLE ANIMATION LOGIC ---


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const toggleExpanded = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-gradient-hero"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Our <span className="neon-text">Services</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions tailored to your business needs. From design to deployment, we've got you covered.
          </p>
        </div>
      </motion.section>

      {/* Services Detail Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedService} onValueChange={setSelectedService} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* TabsList for mobile horizontal scrolling */}
              <TabsList className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full md:grid md:grid-cols-4 mb-8 md:mb-12 h-auto cyber-card p-2 gap-2">
                {services.map((service) => (
                  <TabsTrigger 
                    key={service.id} 
                    value={service.id}
                    className="flex flex-col items-center p-3 sm:p-6 text-center h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-shrink-0 min-w-[100px] sm:min-w-[120px] snap-center rounded-lg"
                  >
                    <Icon icon={service.icon} className="w-5 h-5 mb-1 sm:w-6 sm:h-6 md:w-8 md:h-8 md:mb-2" />
                    <span className="font-semibold text-xs sm:text-sm md:text-base">{service.title}</span>
                    <span className="text-[10px] sm:text-xs opacity-70 hidden sm:inline mt-1">{service.subtitle}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                {isLoading ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                    <div className="space-y-6">
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-48 w-full" />
                    </div>
                    <div className="space-y-6">
                      <Skeleton className="h-64 w-full rounded-xl" />
                      <Skeleton className="h-32 w-full" />
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12"
                  >
                  <div>
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-xl flex items-center justify-center mr-3 sm:mr-4 cyber-glow flex-shrink-0">
                        <Icon icon={service.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-2xl sm:text-3xl font-heading font-bold truncate">{service.title}</h2>
                        <p className="text-base sm:text-lg text-primary">{service.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">What's Included:</h3>
                      <div className="grid grid-cols-1 gap-2 sm:gap-3">
                        {service.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-2 sm:space-x-3"
                          >
                            <Icon icon="solar:check-circle-bold" className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-muted-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Technologies We Use:</h3>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {service.tools.map((tool, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-2 py-1 sm:px-3 bg-secondary text-secondary-foreground rounded-full text-xs sm:text-sm"
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Investment / Get Started */}
                    <div className="cyber-card rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="w-full sm:w-auto">
                        <p className="text-xs sm:text-sm text-muted-foreground">Investment</p>
                        <p className="text-xl sm:text-2xl font-bold text-primary">{service.pricing}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Timeline: {service.timeline}</p>
                      </div>
                      
                      {/* Button with Idle Animation */}
                      <motion.div
                        animate={isIdle ? idlePulse : {}}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                          repeat: isIdle ? Infinity : 0,
                          repeatDelay: 2,
                        }}
                      >
                        <Button asChild variant="hero" className="cyber-glow w-full md:w-auto">
                          <RouterLink to="/consultation">
                            Get Started
                            <Icon icon="solar:arrow-right-bold" className="ml-2 w-4 h-4" />
                          </RouterLink>
                        </Button>
                      </motion.div>
                    </div>

                    {/* Read More Section */}
                    <div className="cyber-card rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">
                          <Icon icon="solar:book-bold" className="w-5 h-5 inline mr-2" />
                          Deep Dive: {service.title}
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-primary/10 hover:text-primary flex-shrink-0"
                          onClick={() => toggleExpanded(service.id)}
                        >
                          {expandedService === service.id ? "Read Less" : "Read More"}
                          <Icon 
                            icon={expandedService === service.id ? "solar:arrow-up-bold" : "solar:arrow-down-bold"} 
                            className="ml-2 w-4 h-4" 
                          />
                        </Button>
                      </div>

                      {expandedService === service.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <h4 className="font-semibold mb-2">Overview</h4>
                            <p className="text-muted-foreground">{service.detailedContent.overview}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Our Process</h4>
                            <ol className="space-y-2">
                              {service.detailedContent.process.map((step, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                    {index + 1}
                                  </span>
                                  <span className="text-muted-foreground">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          <div className="cyber-card rounded-lg p-4">
                            <h4 className="font-semibold mb-2 flex items-center">
                              <Icon icon="solar:chart-square-bold" className="w-5 h-5 mr-2 text-accent" />
                              Case Study: {service.detailedContent.caseStudy.title}
                            </h4>
                            {/* FIX 2: Responsive image height for mobile */}
                            <img 
                              src={service.detailedContent.caseStudy.image} 
                              alt={service.detailedContent.caseStudy.title}
                              className="w-full h-40 md:h-56 object-cover rounded-lg mb-3"
                            />
                            <p className="text-muted-foreground mb-3">{service.detailedContent.caseStudy.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {service.detailedContent.caseStudy.metrics.map((metric, index) => (
                                <Badge key={index} variant="secondary" className="bg-accent/10 text-accent">
                                  {metric}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Who It's For & Benefits */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-8"
                  >
                    <Card className="cyber-card border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Icon icon="solar:users-group-rounded-bold" className="w-6 h-6 mr-2 text-primary" />
                          Who It's For
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {service.forWho.map((who, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{who}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="cyber-card border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Icon icon="solar:chart-square-bold" className="w-6 h-6 mr-2 text-primary" />
                          Key Benefits
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                  </motion.div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Target Audiences Section (No changes needed) */}
      <section className="py-20 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Perfect For Your <span className="neon-text">Business Type</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tailored solutions for every stage of your business journey
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {targetAudiences.map((audience, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="cyber-card border-0 h-full hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 cyber-glow">
                      <Icon icon={audience.icon} className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-semibold mb-4">
                      {audience.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {audience.description}
                    </p>
                    <div className="space-y-2">
                      {audience.needs.map((need, needIndex) => (
                        <div key={needIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-accent" />
                          <span>{need}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-20 bg-gradient-hero"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Let's discuss your project and find the perfect solution for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            
            {/* Button with Idle Animation */}
            <motion.div
              animate={isIdle ? idlePulse : {}}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: isIdle ? Infinity : 0,
                repeatDelay: 2,
              }}
            >
              <Button asChild variant="accent" size="lg" className="cyber-glow w-full sm:w-auto">
                <RouterLink to="/consultation">
                  Schedule Consultation
                  <Icon icon="solar:arrow-right-bold" className="ml-2 w-5 h-5" />
                </RouterLink>
              </Button>
            </motion.div>

            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto">
              <RouterLink to="/projects">View Projects</RouterLink>
            </Button>
          </div>
        </div>
      </motion.section>
      
      <BackToTop />
    </div>
  );
};

export default Services;