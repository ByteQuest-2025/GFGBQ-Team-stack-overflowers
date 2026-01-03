import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Bot, UserCircle, Eye, Crown, Settings, ClipboardCheck,
  ArrowRight, Shield
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const roles = [
  { 
    id: "ai-handler", 
    title: "AI Case Handler", 
    icon: Bot, 
    color: "bg-gradient-to-br from-violet-500 to-purple-600",
    description: "AI-powered complaint processing" 
  },
  { 
    id: "officer", 
    title: "Department Officer", 
    icon: UserCircle, 
    color: "bg-gradient-to-br from-blue-500 to-cyan-600",
    description: "Handle assigned complaints" 
  },
  { 
    id: "supervisor", 
    title: "Supervisor", 
    icon: Eye, 
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    description: "Monitor team performance" 
  },
  { 
    id: "senior", 
    title: "Senior Authority", 
    icon: Crown, 
    color: "bg-gradient-to-br from-rose-500 to-pink-600",
    description: "High-level oversight" 
  },
  { 
    id: "admin", 
    title: "System Admin", 
    icon: Settings, 
    color: "bg-gradient-to-br from-slate-600 to-zinc-700",
    description: "System configuration" 
  },
  { 
    id: "auditor", 
    title: "Auditor", 
    icon: ClipboardCheck, 
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    description: "Compliance & reporting" 
  },
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

export default function AdminPortal() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gradient-to-br from-sidebar via-sidebar to-sidebar-accent">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary mb-6">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-sidebar-foreground mb-3">Admin Portal</h1>
            <p className="text-sidebar-foreground/70">Select your role to access the dashboard</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {roles.map((role) => (
              <motion.div key={role.id} variants={itemVariants}>
                <Link to={`/admin/login?role=${role.id}`}>
                  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-sidebar-accent/50 border-sidebar-border hover:bg-sidebar-accent">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto rounded-2xl ${role.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <role.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-sidebar-foreground mb-1">{role.title}</h3>
                      <p className="text-sm text-sidebar-foreground/60 mb-4">{role.description}</p>
                      <div className="flex items-center justify-center gap-1 text-sm text-primary-light group-hover:gap-2 transition-all">
                        Login <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 text-sidebar-foreground/50 text-sm"
          >
            Unauthorized access is prohibited and may be punishable by law.
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
