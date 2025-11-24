import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link as RouterLink } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with React and Node.js",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://krystalmall.co.ke/Krystal%20Christmas%20Logo%20.png",
    demoUrl: "https://krystalmall.co.ke",
    githubUrl: "#",
    featured: true,
  },

  {
    id: 2,
    title: "University Mapping App",
    description:
      "Efficient  mobile mapping application with GPS tracking and real-time updates",
    category: "Mobile Development",
    technologies: ["React Native", "Firebase", "Redux"],
    image: "https://mut-lecture-rooms.vercel.app/mut-logo.jpeg",
    demoUrl: "https://mut-lecture-rooms.vercel.app/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "InuaFund CrowdFunding ",
    description:
      "A community-driven crowd-funding platform that empowers individuals in need by connecting them with donors willing to support their causes. ",
    category: "Web Development",
    technologies: ["Next.js", "Express", "MongoDB"],
    image:
      "https://res.cloudinary.com/dwv6j0nku/image/upload/v1752682835/sws9utg3bcbtz5e2k3uj.jpg",
    demoUrl: "https://www.inuafund.co.ke",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Task Management App",
    description: "Cross-platform task management mobile application",
    category: "Mobile Development",
    technologies: ["Flutter", "Laravel", "MySQL"],
    image:
      "https://ezekielmburuportfolio.vercel.app/assets/taskui-gPz_eRJ4.webp",
    demoUrl: "https://trackmateapp.vercel.app",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Real Estate Portal",
    description: "Property listing and management platform",
    category: "Web Development",
    technologies: ["Next.js", "Prisma", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "My  Portfolio Website",
    description: "Personal portfolio to showcase projects and skills",
    category: "Web Development",
    technologies: ["React Native", "Shadcn", "Firebase"],
    image: "https://ezekielmburuportfolio.vercel.app/assets/logo2-ClBOts8j.jpeg",
    demoUrl: "https://ezekielmburuportfolio.vercel.app",
    githubUrl: "#",
    featured: false,
  },
];

const categories = ["All", "Web Development", "Mobile Development"];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleViewProject = (url) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleViewGithub = (url) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Our <span className="neon-text">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of innovative solutions that have helped
            businesses transform their digital presence and achieve their goals.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="px-6 py-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            Featured Projects
          </h2>
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="cyber-card rounded-xl overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-secondary rounded text-xs">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="accent"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleViewProject(project.demoUrl)}
                    disabled={project.demoUrl === "#"}
                  >
                    <Icon icon="solar:eye-bold" className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewGithub(project.githubUrl)}
                    disabled={project.githubUrl === "#"}
                  >
                    <Icon icon="solar:code-bold" className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="cyber-card rounded-2xl p-12">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your vision to life with
              cutting-edge technology and innovative solutions tailored to your
              needs.
            </p>

            <Button
              asChild
              variant="hero"
              size="lg"
              className="cyber-glow ml-4"
            >
              <RouterLink to="/consultation"> Start Your Project</RouterLink>
              
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
