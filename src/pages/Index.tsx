import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FileText, Search, BarChart3, ArrowRight, CheckCircle2, 
  Droplets, Construction, Trash2, Lightbulb, Shield, 
  Stethoscope, GraduationCap, HelpCircle, Clock, Users, 
  TrendingUp, Award, Star, ChevronRight, Upload, RefreshCw,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { STATS, SAMPLE_COMPLAINTS } from "@/utils/sampleData";
import { StatusBadge, UrgencyBadge } from "@/components/ui/urgency-badge";
import mascotImage from "@/assets/mascot-saree.png";

const categories = [
  { icon: Droplets, name: "Water Supply", color: "bg-blue-500", count: 2341 },
  { icon: Construction, name: "Roads & Infrastructure", color: "bg-slate-600", count: 1892 },
  { icon: Trash2, name: "Sanitation & Waste", color: "bg-green-600", count: 1567 },
  { icon: Lightbulb, name: "Street Lights", color: "bg-amber-500", count: 1203 },
  { icon: Shield, name: "Public Safety", color: "bg-red-500", count: 987 },
  { icon: Stethoscope, name: "Healthcare", color: "bg-pink-500", count: 856 },
  { icon: GraduationCap, name: "Education", color: "bg-purple-500", count: 634 },
  { icon: HelpCircle, name: "Other", color: "bg-gray-500", count: 421 },
];

const steps = [
  { step: 1, title: "Submit Your Grievance", desc: "Fill a simple form with your complaint details", icon: FileText },
  { step: 2, title: "AI-Powered Processing", desc: "Our system analyzes and assigns priority", icon: TrendingUp },
  { step: 3, title: "Track & Get Updates", desc: "Monitor progress until resolution", icon: Search },
];

const successStories = [
  { name: "Ramesh Kumar", location: "Delhi", issue: "Water supply restored in 48 hours", rating: 5 },
  { name: "Priya Sharma", location: "Mumbai", issue: "Pothole fixed within a week", rating: 5 },
  { name: "Ankit Verma", location: "Bangalore", issue: "Street light repaired same day", rating: 4 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const heroActions = [
  { 
    title: "Register Grievance", 
    icon: FileText, 
    buttonText: "Register", 
    href: "/register-complaint" 
  },
  { 
    title: "Track Your Grievance", 
    icon: RefreshCw, 
    buttonText: "Track Now", 
    href: "/track" 
  },
  { 
    title: "Public Dashboard", 
    icon: BarChart3, 
    buttonText: "View Stats", 
    href: "/public-stats" 
  },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - Purple Background */}
      <section className="relative bg-hero min-h-[500px] lg:min-h-[550px]">
        <div className="container relative py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Mascot */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center order-2 lg:order-1"
            >
              <div className="relative">
                {/* Dark circle background */}
                <div className="absolute inset-0 bg-[hsl(231,47%,25%)] rounded-full scale-110 -translate-y-4" />
                <motion.img
                  src={mascotImage}
                  alt="NagarSevak Mascot"
                  className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Tagline badge */}
                <motion.div 
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -right-4 bottom-20 sm:bottom-28 lg:bottom-32"
                >
                  <div className="bg-warning text-warning-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg transform rotate-[-5deg]">
                    <div className="flex flex-col items-center leading-tight">
                      <span className="text-xs">जागो</span>
                      <span className="text-base">नागरिक</span>
                      <span className="text-xs">जागो</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Content & Action Cards */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 order-1 lg:order-2"
            >
              {/* Heading */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-hero-foreground leading-tight italic">
                  Your Grievances, Our Redressal
                </h1>
                <p className="mt-3 text-hero-foreground/80 text-lg">
                  We are here to solve your grievances
                </p>
              </div>

              {/* Action Cards - Horizontal Style */}
              <div className="space-y-4">
                {heroActions.map((action, i) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Link to={action.href}>
                      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-0">
                        <CardContent className="p-4 sm:p-5 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="hidden sm:flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center">
                              <action.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg text-card-foreground">
                              {action.title}
                            </h3>
                          </div>
                          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 shrink-0">
                            <action.icon className="w-4 h-4" />
                            {action.buttonText}
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* WhatsApp FAB */}
        <motion.a
          href="https://wa.me/1800XXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="fixed right-4 bottom-24 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="w-7 h-7 text-white" fill="white" />
        </motion.a>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-card border-y">
        <div className="container">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: "Total Complaints", value: STATS.totalComplaints.toLocaleString(), icon: FileText, color: "text-primary" },
              { label: "Resolved Today", value: STATS.resolvedToday, icon: CheckCircle2, color: "text-success" },
              { label: "Avg Resolution", value: STATS.avgResolutionTime, icon: Clock, color: "text-warning" },
              { label: "Active Depts", value: STATS.activeDepartments, icon: Users, color: "text-info" },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={itemVariants} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-2xl md:text-3xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple 3-step process to get your grievance addressed
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {steps.map((step, i) => (
              <motion.div key={step.step} variants={itemVariants} className="relative">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="absolute inset-0 bg-primary rounded-2xl opacity-10" />
                      <div className="relative w-full h-full rounded-2xl border-2 border-primary/30 flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-primary" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-6 h-6 text-muted-foreground/50" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Complaint Categories</h2>
            <p className="text-muted-foreground">Select the category that best describes your grievance</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {categories.map((cat) => (
              <motion.div key={cat.name} variants={itemVariants}>
                <Link to={`/register-complaint?category=${encodeURIComponent(cat.name)}`}>
                  <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center flex-shrink-0`}>
                        <cat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">{cat.count.toLocaleString()} complaints</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Complaints Preview */}
      <section className="py-16 bg-background">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-2">Recent Complaints</h2>
              <p className="text-muted-foreground">Latest grievances registered in the system</p>
            </div>
            <Link to="/public-stats">
              <Button variant="outline" className="hidden sm:flex gap-2">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {SAMPLE_COMPLAINTS.slice(0, 6).map((complaint) => (
              <motion.div key={complaint.id} variants={itemVariants}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{complaint.complaintId}</span>
                      <UrgencyBadge level={complaint.urgency} size="sm" />
                    </div>
                    <p className="text-sm line-clamp-2">{complaint.complaintText}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{complaint.area}</span>
                      <StatusBadge status={complaint.status} size="sm" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground">Citizens who got their grievances resolved</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {successStories.map((story, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-4 h-4 ${j < story.rating ? 'text-warning fill-warning' : 'text-muted'}`} />
                      ))}
                    </div>
                    <p className="text-sm italic">"{story.issue}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                        {story.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{story.name}</p>
                        <p className="text-xs text-muted-foreground">{story.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hero text-hero-foreground">
        <div className="container text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <Award className="w-16 h-16 mx-auto opacity-90" />
            <h2 className="text-3xl font-bold">Ready to Register Your Grievance?</h2>
            <p className="text-hero-foreground/80">
              Our AI-powered system ensures your complaint reaches the right department within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register-complaint">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 w-full sm:w-auto">
                  Register Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/track">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto border-hero-foreground/30 text-hero-foreground hover:bg-hero-foreground/10">
                  Track Existing <Search className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
