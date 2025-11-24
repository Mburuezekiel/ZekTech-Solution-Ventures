import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Basic Website",
    price: "KSh 18,000+",
    description: "Perfect for startups and small businesses",
    features: [
      "5-7 Page Website",
      "Responsive Design",
      "Contact Form",
      "Basic SEO Setup",
      "1 Month Support",
      "Social Media Integration",
    ],
    popular: false,
  },
  {
    name: "Business Website",
    price: "KSh 30,000+",
    description: "Ideal for growing businesses",
    features: [
      "10-15 Page Website",
      "Advanced Responsive Design",
      "Contact & Booking Forms",
      "Advanced SEO Optimization",
      "3 Months Support",
      "Google Analytics Integration",
      "Content Management System",
      "Email Integration",
    ],
    popular: true,
  },
  {
    name: "E-Commerce",
    price: "KSh 50,000+",
    description: "Complete online store solution",
    features: [
      "Unlimited Products",
      "Payment Gateway Integration",
      "Inventory Management",
      "Customer Portal",
      "Advanced SEO",
      "6 Months Support",
      "Product Analytics",
      "Email Marketing Integration",
      "Order Management System",
    ],
    popular: false,
  },
  {
    name: "Mobile App",
    price: "KSh 100,000+",
    description: "Custom mobile applications",
    features: [
      "iOS & Android Apps",
      "Custom UI/UX Design",
      "API Integration",
      "Push Notifications",
      "Admin Dashboard",
      "12 Months Support",
      "App Store Submission",
      "Analytics Integration",
      "Cloud Backend",
    ],
    popular: false,
  },
];

const addOns = [
  {
    name: "Logo Design",
    price: "KSh 1,500+",
    icon: "solar:palette-bold",
  },
  {
    name: "Content Updates",
    price: "KSh 2000/month",
    icon: "solar:document-text-bold",
  },
   {
    name: "Web hosting",
    price: "KES 6,000+ yearly",
    icon: "solar:cloud-bold",
  },
  {
    name: "SEO Package",
    price: "KSh 9,000/month",
    icon: "solar:graph-up-bold",
  },
  {
    name: "Maintenance & updates",
    price: "KES 10,000+ yearly",
    icon: "solar:settings-bold",
  },
 
  
  
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 md:mb-6">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Choose the perfect plan for your business. All packages include professional design and development.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`professional-card h-full flex flex-col relative ${
                plan.popular ? "border-primary shadow-lg scale-105" : ""
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl md:text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {plan.price}
                  </div>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Icon 
                          icon="solar:check-circle-bold" 
                          className="text-primary mt-0.5 flex-shrink-0" 
                          width="18"
                          height="18"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="w-full">
                    <Button 
                      className={`w-full ${
                        plan.popular ? "bg-primary hover:bg-primary/90" : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-center mb-8 md:mb-12">
            Additional Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Card className="professional-card text-center hover:border-primary transition-all duration-300">
                  <CardContent className="pt-6 pb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon icon={addon.icon} className="text-primary" width="24" height="24" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{addon.name}</h3>
                    <p className="text-primary font-bold text-xl">{addon.price}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-center mb-8 md:mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 md:space-y-6">
            {[
              {
                q: "What payment methods do you accept?",
                a: "We accept M-Pesa, bank transfers, and PayPal for international clients.",
              },
              {
                q: "How long does it take to complete a project?",
                a: "Basic websites take 2-3 weeks, business websites 3-4 weeks, e-commerce 4-6 weeks, and mobile apps 8-12 weeks.",
              },
              {
                q: "Do you offer custom packages?",
                a: "Yes! We can create a custom package tailored to your specific needs and budget.",
              },
              {
                q: "What's included in support?",
                a: "Support includes bug fixes, minor updates, technical assistance, and website monitoring.",
              },
            ].map((faq, index) => (
              <Card key={index} className="professional-card">
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 md:mt-20"
        >
          <Card className="professional-card p-8 md:p-12 bg-primary/5">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Not sure which plan is right for you?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
              Get in touch with us for a free consultation. We'll help you choose the perfect solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/consultation">
                <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Icon icon="solar:chat-round-bold" className="mr-2" width="20" height="20" />
                  Get Free Consultation
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <a href="tel:+254700000000">
                  <Icon icon="solar:phone-bold" className="mr-2" width="20" height="20" />
                  Call Us Now
                </a>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
