import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { 
  Search, FileText, Clock, MapPin, Building2, User,
  CheckCircle2, Circle, AlertCircle, Download, Star,
  ChevronRight, MessageSquare, Send, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UrgencyBadge, StatusBadge } from "@/components/ui/urgency-badge";
import { SAMPLE_COMPLAINTS } from "@/utils/sampleData";
import { toast } from "@/hooks/use-toast";

const TIMELINE_STEPS = [
  { status: "Submitted", icon: FileText, description: "Complaint registered in the system" },
  { status: "Acknowledged", icon: CheckCircle2, description: "Acknowledged by department" },
  { status: "In Progress", icon: Clock, description: "Work in progress" },
  { status: "Under Review", icon: AlertCircle, description: "Under final review" },
  { status: "Resolved", icon: CheckCircle2, description: "Issue resolved" },
];

export default function TrackComplaint() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get("id") || "";
  
  const [searchId, setSearchId] = useState(initialId);
  const [complaint, setComplaint] = useState<typeof SAMPLE_COMPLAINTS[0] | null>(
    initialId ? SAMPLE_COMPLAINTS.find(c => c.complaintId === initialId) || null : null
  );
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSearch = () => {
    const found = SAMPLE_COMPLAINTS.find(
      c => c.complaintId.toLowerCase() === searchId.toLowerCase() || 
           c.citizenMobile === searchId
    );
    
    if (found) {
      setComplaint(found);
    } else {
      toast({
        title: "Complaint Not Found",
        description: "Please check the complaint ID or mobile number",
        variant: "destructive",
      });
    }
  };

  const getTimelineIndex = (status: string) => {
    const statusMap: Record<string, number> = {
      'New': 0,
      'In Progress': 2,
      'Under Review': 3,
      'Resolved': 4,
      'Closed': 4,
    };
    return statusMap[status] || 0;
  };

  const submitFeedback = () => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container max-w-4xl">
          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" /> Track Your Complaint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter Complaint ID (e.g., GRV202600001) or Mobile Number"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} className="bg-gradient-primary gap-2">
                    <Search className="w-4 h-4" /> Track
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Demo IDs: GRV202600001, GRV202600002, GRV202600003
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          {complaint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Complaint ID</p>
                      <h2 className="text-2xl font-bold font-mono">{complaint.complaintId}</h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <UrgencyBadge level={complaint.urgency} />
                      <StatusBadge status={complaint.status} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Category</p>
                        <p className="font-medium">{complaint.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Department</p>
                        <p className="font-medium text-xs">{complaint.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Filed On</p>
                        <p className="font-medium">{complaint.createdAt.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Status Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {TIMELINE_STEPS.map((step, i) => {
                      const currentIndex = getTimelineIndex(complaint.status);
                      const isCompleted = i <= currentIndex;
                      const isCurrent = i === currentIndex;
                      
                      return (
                        <div key={step.status} className="flex gap-4 pb-8 last:pb-0">
                          {/* Line */}
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                              isCompleted 
                                ? 'bg-success text-success-foreground' 
                                : 'bg-muted text-muted-foreground'
                            } ${isCurrent ? 'ring-4 ring-success/20' : ''}`}>
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </div>
                            {i < TIMELINE_STEPS.length - 1 && (
                              <div className={`w-0.5 flex-1 min-h-[30px] ${
                                i < currentIndex ? 'bg-success' : 'bg-muted'
                              }`} />
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 pt-2">
                            <p className={`font-medium ${isCompleted ? '' : 'text-muted-foreground'}`}>
                              {step.status}
                            </p>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                            {isCompleted && i <= currentIndex && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(Date.now() - (currentIndex - i) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Complaint Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Complaint Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Description</p>
                    <p className="text-sm leading-relaxed">{complaint.complaintText}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{complaint.area}</p>
                      <p className="text-sm text-muted-foreground">
                        {complaint.district}, {complaint.state} - {complaint.pinCode}
                      </p>
                      {complaint.landmark && (
                        <p className="text-sm text-muted-foreground">{complaint.landmark}</p>
                      )}
                    </div>
                  </div>

                  {!complaint.isAnonymous && (
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{complaint.citizenName}</p>
                        <p className="text-sm text-muted-foreground">{complaint.citizenMobile}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" /> Download Report
                </Button>
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="w-4 h-4" /> Add Information
                </Button>
                {complaint.status !== 'Resolved' && complaint.status !== 'Closed' && (
                  <Button variant="outline" className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10">
                    <ArrowUpRight className="w-4 h-4" /> Escalate
                  </Button>
                )}
              </div>

              {/* Feedback (if resolved) */}
              {(complaint.status === 'Resolved' || complaint.status === 'Closed') && !complaint.citizenRating && (
                <Card className="border-success/30 bg-success/5">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Star className="w-5 h-5 text-success" /> Rate Your Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">How satisfied are you with the resolution?</p>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="p-1 transition-transform hover:scale-110"
                          >
                            <Star className={`w-8 h-8 ${
                              star <= rating ? 'text-warning fill-warning' : 'text-muted'
                            }`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Textarea
                        placeholder="Share your experience (optional)"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                    </div>
                    <Button onClick={submitFeedback} className="bg-gradient-primary gap-2">
                      <Send className="w-4 h-4" /> Submit Feedback
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Already rated */}
              {complaint.citizenRating && (
                <Card className="border-success/30 bg-success/5">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-5 h-5 ${
                          star <= complaint.citizenRating! ? 'text-warning fill-warning' : 'text-muted'
                        }`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">You rated this resolution</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {/* Empty State */}
          {!complaint && !initialId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your Complaint</h3>
              <p className="text-muted-foreground mb-6">
                Enter your complaint ID or registered mobile number to check the status
              </p>
              <Link to="/register-complaint">
                <Button variant="outline" className="gap-2">
                  Register New Complaint <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
