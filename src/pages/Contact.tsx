import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  MessageSquare,
  Calendar,
  Linkedin,
  Twitter,
  Instagram,
  Facebook
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BackToTop from "@/components/BackToTop";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format message for WhatsApp
    const whatsappMessage = `*New Contact Form Submission*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Company:* ${formData.company || 'Not specified'}%0A` +
      `*Service:* ${formData.service}%0A%0A` +
      `*Project Details:*%0A${formData.message}`;
    
    // Open WhatsApp with formatted message
    window.open(`https://wa.me/254714487081?text=${whatsappMessage}`, '_blank');
    
    toast({
      title: "Redirecting to WhatsApp!",
      description: "Please send the message to complete your inquiry.",
    });
    
    setFormData({
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "njuguna.ezekiel.mburu@gmail.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+254 714 487 081",
      description: "Mon-Fri 8AM-7PM EAT",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Nairobi, Kenya",
      description: "Serving clients globally",
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "Within 24 hours",
      description: "We reply fast",
    },
  ];

  const services = [
    "Web Design",
    "Web Development", 
    "Mobile App Development",
    "SEO Optimization",
    "Full Digital Solution",
    "Consultation Only"
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Build Something Amazing
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with smart technology? We'd love to hear about your project and discuss how we can help.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Start Your Project
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours with a detailed proposal.
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
                          placeholder="Your full name"
                          required
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
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Interested In *</Label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          required
                        >
                          <option value="">Select a service</option>
                          {services.map((service, index) => (
                            <option key={index} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button type="submit" variant="accent" size="lg" className="w-full">
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Get In Touch
                </h2>
                <p className="text-lg text-muted-foreground">
                  Prefer to reach out directly? Here are all the ways you can contact us.
                </p>
              </div>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        <p className="text-lg text-primary font-medium mb-1">
                          {info.details}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {info.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Media */}
              <Card className="border-0 shadow-card bg-gradient-subtle">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Follow Us
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Stay updated with our latest work and insights
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors duration-300"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors duration-300"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors duration-300"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  How long does a typical project take?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 8-16 weeks.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Do you provide ongoing support?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Yes! We offer maintenance packages and ongoing support to keep your solutions running smoothly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  What's included in your pricing?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Our pricing includes design, development, testing, deployment, and 30 days of post-launch support.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Can you work with our existing team?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Absolutely! We collaborate seamlessly with in-house teams and other agencies to deliver the best results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <BackToTop />
    </div>
  );
};

export default Contact;