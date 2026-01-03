import { motion } from "framer-motion";
import { 
  FileText, CheckCircle2, Clock, Users, TrendingUp, 
  BarChart3, PieChart, Download, Filter, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { STATS, SAMPLE_COMPLAINTS } from "@/utils/sampleData";
import { CATEGORIES } from "@/utils/departmentMapper";

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

const categoryData = CATEGORIES.map(cat => ({
  name: cat.name,
  count: Math.floor(Math.random() * 2000) + 500,
  color: cat.color,
}));

const statusData = [
  { status: 'Resolved', count: 12453, color: 'bg-success' },
  { status: 'In Progress', count: 2341, color: 'bg-warning' },
  { status: 'New', count: 876, color: 'bg-info' },
  { status: 'Under Review', count: 177, color: 'bg-primary' },
];

const departmentPerformance = [
  { dept: 'Water Works', resolved: 2341, total: 2567, avgTime: 2.1 },
  { dept: 'PWD', resolved: 1892, total: 2134, avgTime: 4.5 },
  { dept: 'Waste Management', resolved: 1567, total: 1789, avgTime: 1.8 },
  { dept: 'Electrical', resolved: 1203, total: 1345, avgTime: 3.2 },
  { dept: 'Security Office', resolved: 987, total: 1056, avgTime: 0.8 },
];

export default function PublicStats() {
  const totalStatus = statusData.reduce((acc, s) => acc + s.count, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Public Dashboard</h1>
                <p className="text-muted-foreground">Real-time grievance statistics and analytics</p>
              </div>
              <div className="flex gap-3">
                <Select defaultValue="30">
                  <SelectTrigger className="w-[140px]">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="365">This year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" /> Export
                </Button>
              </div>
            </div>
          </motion.div>

          {/* KPI Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: "Total Complaints", value: STATS.totalComplaints.toLocaleString(), icon: FileText, color: "text-primary", bg: "bg-primary/10" },
              { label: "Resolution Rate", value: `${STATS.resolutionRate}%`, icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
              { label: "Avg Resolution Time", value: STATS.avgResolutionTime, icon: Clock, color: "text-warning", bg: "bg-warning/10" },
              { label: "Satisfaction Rating", value: `${STATS.satisfaction}/5`, icon: TrendingUp, color: "text-info", bg: "bg-info/10" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={itemVariants}>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Category Distribution */}
            <motion.div variants={itemVariants} initial="hidden" animate="visible">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" /> Complaints by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryData.map((cat) => {
                      const total = categoryData.reduce((acc, c) => acc + c.count, 0);
                      const percentage = Math.round((cat.count / total) * 100);
                      
                      return (
                        <div key={cat.name} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{cat.name}</span>
                            <span className="text-muted-foreground">{cat.count.toLocaleString()} ({percentage}%)</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className={`h-full rounded-full ${cat.color}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Status Distribution */}
            <motion.div variants={itemVariants} initial="hidden" animate="visible">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" /> Complaints by Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Visual representation */}
                  <div className="flex h-8 rounded-lg overflow-hidden mb-6">
                    {statusData.map((status) => (
                      <motion.div
                        key={status.status}
                        initial={{ width: 0 }}
                        animate={{ width: `${(status.count / totalStatus) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className={`${status.color}`}
                      />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {statusData.map((status) => (
                      <div key={status.status} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${status.color}`} />
                        <div>
                          <p className="font-medium">{status.count.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{status.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Department Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" /> Department Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-3 font-medium text-sm text-muted-foreground">Department</th>
                        <th className="pb-3 font-medium text-sm text-muted-foreground text-right">Resolved</th>
                        <th className="pb-3 font-medium text-sm text-muted-foreground text-right">Total</th>
                        <th className="pb-3 font-medium text-sm text-muted-foreground text-right">Rate</th>
                        <th className="pb-3 font-medium text-sm text-muted-foreground text-right">Avg Time</th>
                        <th className="pb-3 font-medium text-sm text-muted-foreground">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentPerformance.map((dept) => {
                        const rate = Math.round((dept.resolved / dept.total) * 100);
                        return (
                          <tr key={dept.dept} className="border-b last:border-0">
                            <td className="py-4 font-medium">{dept.dept}</td>
                            <td className="py-4 text-right text-success">{dept.resolved.toLocaleString()}</td>
                            <td className="py-4 text-right">{dept.total.toLocaleString()}</td>
                            <td className="py-4 text-right font-medium">{rate}%</td>
                            <td className="py-4 text-right text-muted-foreground">{dept.avgTime} days</td>
                            <td className="py-4 w-32">
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${rate}%` }}
                                  transition={{ duration: 0.5 }}
                                  className="h-full bg-success rounded-full"
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
