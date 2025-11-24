import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Consultation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    details: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format message for WhatsApp
    const whatsappMessage = `*Free Consultation Request*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Company:* ${formData.company || 'Not specified'}%0A` +
      `*Project Type:* ${formData.projectType}%0A` +
      `*Budget Range:* ${formData.budget}%0A` +
      `*Timeline:* ${formData.timeline}%0A%0A` +
      `*Project Details:*%0A${formData.details}`;
    
    window.open(`https://wa.me/254714487081?text=${whatsappMessage}`, '_blank');
    
    toast({
      title: "Redirecting to WhatsApp!",
      description: "Please send the message to schedule your free consultation.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      details: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const benefits = [
    "1-hour personalized consultation call",
    "Expert analysis of your project requirements",
    "Custom solution recommendations",
    "Detailed project timeline and roadmap",
    "Transparent cost breakdown",
    "No obligation - completely free",
  ];

  const projectTypes = [
    "Website Design & Development",
    "E-Commerce Platform",
    "Mobile App Development",
    "Web Application",
    "SEO & Digital Marketing",
    "Full Digital Transformation",
    "Other",
  ];

  const budgetRanges = [
    "Not sure yet",
    "KSh 10,000 - 20,000",
    "KSh 20,000 - 50,000",
    "KSh 50,000 - 100,000",
    "KSh 100,000 - 250,000",
    "KSh 250,000 - 500,000",
    "KSh 500,000 - 1,000,000",
    "KSh 1,000,000+",
    
  ];

  const timelines = [

    "ASAP - Within 1-2 weeks",
    "1-3 months",
    "3-6 months",
    "6+ months",
    "Flexible timeline",
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Book Your Free Consultation
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Let's discuss your project in detail. Get expert advice, clear pricing, and a customized roadmap, absolutely free with no charges attached.
            </p>
            <div className="flex items-center justify-center space-x-8 text-white">
              <div className="flex items-center space-x-2">
                <Calendar className="w-6 h-6" />
                <span className="text-lg">1 Hour Session</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6" />
                <span className="text-lg">24hr Response</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Consultation Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Schedule Your Session
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and we'll reach out within 24 hours to schedule your free consultation call.
                </p>
              </div>

              <Card className="border-0 shadow-card">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+254 712 345 678"
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type *</Label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range *</Label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          required
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map((range, index) => (
                            <option key={index} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Timeline *</Label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          required
                        >
                          <option value="">Select timeline</option>
                          {timelines.map((time, index) => (
                            <option key={index} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="details">Project Details *</Label>
                      <Textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        placeholder="Tell us about your project goals, target audience, key features, and any specific requirements..."
                        className="min-h-[120px] bg-background"
                        required
                      />
                    </div>

                    <Button type="submit" variant="accent" size="lg" className="w-full">
                      Book Free Consultation
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits & Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  What You'll Get
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our free consultation is designed to give you clear direction and actionable insights.
                </p>
              </div>

              <Card className="border-0 shadow-card mb-8">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-lg">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card bg-gradient-subtle">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Why Choose ZEKTECH?
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      <strong className="text-foreground">Expert Guidance:</strong> Get advice from experienced developers and designers who have delivered 50+ successful projects.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-foreground">Transparent Pricing:</strong> No hidden costs. We provide clear, detailed quotes in KSh that match your budget.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-foreground">Proven Process:</strong> Our structured approach ensures on-time delivery and exceptional quality every time.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-foreground">Local Expertise:</strong> Based in Nairobi, we understand the Kenyan market and serve clients globally.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Happens Next?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple steps from consultation to launch
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Submit Request", desc: "Fill out the form with your project details" },
              { step: "02", title: "We Reach Out", desc: "Get a response within 24 hours to schedule your call" },
              { step: "03", title: "Free Consultation", desc: "1-hour call to discuss your needs and solutions" },
              { step: "04", title: "Get Your Proposal", desc: "Receive a detailed quote and timeline in KSh" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;
