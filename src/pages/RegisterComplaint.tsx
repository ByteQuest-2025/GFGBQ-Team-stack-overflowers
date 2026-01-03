import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, ArrowRight, User, MapPin, FileText, 
  Upload, X, Check, Copy, Download, QrCode,
  AlertTriangle, Clock, Building2, Sparkles
} from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UrgencyBadge } from "@/components/ui/urgency-badge";
import { CATEGORIES, SUB_CATEGORIES, getDepartment, generateComplaintId, STATES, DISTRICTS } from "@/utils/departmentMapper";
import { calculateUrgency, detectLanguage, getLanguageLabel } from "@/utils/urgencyCalculator";
import { toast } from "@/hooks/use-toast";

interface FormData {
  // Personal
  name: string;
  email: string;
  mobile: string;
  isAnonymous: boolean;
  // Complaint
  category: string;
  subCategory: string;
  complaintText: string;
  // Location
  state: string;
  district: string;
  area: string;
  landmark: string;
  pinCode: string;
  // Files
  files: File[];
}

const initialFormData: FormData = {
  name: "",
  email: "",
  mobile: "",
  isAnonymous: false,
  category: "",
  subCategory: "",
  complaintText: "",
  state: "",
  district: "",
  area: "",
  landmark: "",
  pinCode: "",
  files: [],
};

export default function RegisterComplaint() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    category: initialCategory,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [copied, setCopied] = useState(false);

  const urgencyResult = formData.complaintText && formData.category 
    ? calculateUrgency(formData.complaintText, formData.category)
    : null;
  
  const detectedLang = formData.complaintText 
    ? detectLanguage(formData.complaintText) 
    : null;

  const department = formData.category ? getDepartment(formData.category) : null;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === "category") {
      setFormData(prev => ({ ...prev, subCategory: "" }));
    }
    if (field === "state") {
      setFormData(prev => ({ ...prev, district: "" }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const validFiles = newFiles.filter(f => f.size <= 5 * 1024 * 1024); // 5MB limit
    
    if (validFiles.length !== newFiles.length) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive",
      });
    }
    
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles].slice(0, 3), // Max 3 files
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.isAnonymous) {
          if (!formData.name || !formData.mobile) {
            toast({ title: "Please fill required fields", variant: "destructive" });
            return false;
          }
          if (formData.mobile.length !== 10) {
            toast({ title: "Invalid mobile number", variant: "destructive" });
            return false;
          }
        }
        return true;
      case 2:
        if (!formData.category || !formData.complaintText || !formData.state) {
          toast({ title: "Please fill required fields", variant: "destructive" });
          return false;
        }
        if (formData.complaintText.length < 20) {
          toast({ title: "Complaint must be at least 20 characters", variant: "destructive" });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    const id = generateComplaintId();
    setComplaintId(id);
    setIsSubmitted(true);
    toast({
      title: "Complaint Registered Successfully!",
      description: `Your complaint ID is ${id}`,
    });
  };

  const copyId = () => {
    navigator.clipboard.writeText(complaintId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12 bg-gradient-to-br from-primary/5 via-background to-success/5">
          <div className="container max-w-lg">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <Card className="overflow-hidden">
                <div className="bg-gradient-primary p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mt-4">Complaint Registered!</h2>
                  <p className="text-white/80 mt-2">Your grievance has been successfully submitted</p>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  {/* Complaint ID */}
                  <div className="p-4 bg-muted rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Your Complaint ID</p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl font-mono font-bold text-primary">{complaintId}</span>
                      <button onClick={copyId} className="p-2 hover:bg-background rounded-lg transition-colors">
                        {copied ? <Check className="w-5 h-5 text-success" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-xl shadow-sm">
                      <QRCodeSVG value={`https://nagarsevak.gov.in/track/${complaintId}`} size={120} />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-muted-foreground text-xs">Category</p>
                      <p className="font-medium">{formData.category}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-muted-foreground text-xs">Urgency</p>
                      <UrgencyBadge level={urgencyResult?.level || 'Medium'} size="sm" />
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-muted-foreground text-xs">Department</p>
                      <p className="font-medium text-xs">{department?.name}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-muted-foreground text-xs">Est. Resolution</p>
                      <p className="font-medium">{department?.estimatedDays} days</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="flex-1 gap-2">
                      <Download className="w-4 h-4" /> Download PDF
                    </Button>
                    <Link to={`/track?id=${complaintId}`} className="flex-1">
                      <Button className="w-full bg-gradient-primary gap-2">
                        Track Status <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>

                  <Link to="/register-complaint" onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                    setFormData(initialFormData);
                  }}>
                    <Button variant="ghost" className="w-full">Submit Another Complaint</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container max-w-3xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[
                { num: 1, label: "Personal Info", icon: User },
                { num: 2, label: "Complaint Details", icon: FileText },
                { num: 3, label: "Review & Submit", icon: Check },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className={`flex items-center gap-2 ${step >= s.num ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step > s.num ? 'bg-success text-success-foreground' :
                      step === s.num ? 'bg-gradient-primary text-primary-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {step > s.num ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                    </div>
                    <span className="hidden sm:block text-sm font-medium">{s.label}</span>
                  </div>
                  {i < 2 && (
                    <div className={`w-8 sm:w-16 lg:w-24 h-1 mx-2 rounded-full transition-colors ${
                      step > s.num ? 'bg-success' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {step === 1 && <><User className="w-5 h-5" /> Personal Information</>}
                    {step === 2 && <><FileText className="w-5 h-5" /> Complaint Details</>}
                    {step === 3 && <><Check className="w-5 h-5" /> Review & Submit</>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Step 1: Personal Info */}
                  {step === 1 && (
                    <>
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <Checkbox
                          id="anonymous"
                          checked={formData.isAnonymous}
                          onCheckedChange={(checked) => updateFormData("isAnonymous", checked)}
                        />
                        <Label htmlFor="anonymous" className="cursor-pointer">
                          Submit as Anonymous (Your identity will be kept confidential)
                        </Label>
                      </div>

                      {!formData.isAnonymous && (
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              placeholder="Enter your name"
                              value={formData.name}
                              onChange={(e) => updateFormData("name", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile Number *</Label>
                            <Input
                              id="mobile"
                              placeholder="10-digit mobile number"
                              value={formData.mobile}
                              onChange={(e) => updateFormData("mobile", e.target.value.replace(/\D/g, '').slice(0, 10))}
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="email">Email (Optional)</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              value={formData.email}
                              onChange={(e) => updateFormData("email", e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Step 2: Complaint Details */}
                  {step === 2 && (
                    <>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Category *</Label>
                          <Select value={formData.category} onValueChange={(v) => updateFormData("category", v)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {CATEGORIES.map((cat) => (
                                <SelectItem key={cat.id} value={cat.name}>
                                  <span className="flex items-center gap-2">
                                    <span>{cat.icon}</span> {cat.name}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Sub-Category</Label>
                          <Select 
                            value={formData.subCategory} 
                            onValueChange={(v) => updateFormData("subCategory", v)}
                            disabled={!formData.category}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select sub-category" />
                            </SelectTrigger>
                            <SelectContent>
                              {(SUB_CATEGORIES[formData.category] || []).map((sub) => (
                                <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="complaint">Describe Your Complaint * (Hindi/English/Hinglish)</Label>
                          {detectedLang && (
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {getLanguageLabel(detectedLang)}
                            </span>
                          )}
                        </div>
                        <Textarea
                          id="complaint"
                          placeholder="Describe your grievance in detail (min 20 characters)..."
                          value={formData.complaintText}
                          onChange={(e) => updateFormData("complaintText", e.target.value)}
                          className="min-h-[120px]"
                          maxLength={1000}
                        />
                        <p className="text-xs text-muted-foreground text-right">
                          {formData.complaintText.length}/1000 characters
                        </p>
                      </div>

                      {/* Location */}
                      <div className="space-y-4">
                        <Label className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> Location Details
                        </Label>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Select value={formData.state} onValueChange={(v) => updateFormData("state", v)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select State *" />
                            </SelectTrigger>
                            <SelectContent>
                              {STATES.map((state) => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select 
                            value={formData.district} 
                            onValueChange={(v) => updateFormData("district", v)}
                            disabled={!formData.state}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select District" />
                            </SelectTrigger>
                            <SelectContent>
                              {(DISTRICTS[formData.state] || []).map((d) => (
                                <SelectItem key={d} value={d}>{d}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            placeholder="Area / Locality"
                            value={formData.area}
                            onChange={(e) => updateFormData("area", e.target.value)}
                          />
                          <Input
                            placeholder="PIN Code"
                            value={formData.pinCode}
                            onChange={(e) => updateFormData("pinCode", e.target.value.replace(/\D/g, '').slice(0, 6))}
                          />
                        </div>
                        <Input
                          placeholder="Landmark (Near..."
                          value={formData.landmark}
                          onChange={(e) => updateFormData("landmark", e.target.value)}
                        />
                      </div>

                      {/* File Upload */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Upload className="w-4 h-4" /> Attachments (Optional - Max 3 files, 5MB each)
                        </Label>
                        <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                          <input
                            type="file"
                            id="files"
                            multiple
                            accept="image/*,.pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <label htmlFor="files" className="cursor-pointer space-y-2">
                            <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Drag & drop or <span className="text-primary">browse</span>
                            </p>
                            <p className="text-xs text-muted-foreground">Images or PDF files</p>
                          </label>
                        </div>
                        {formData.files.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {formData.files.map((file, i) => (
                              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm">
                                <span className="truncate max-w-[150px]">{file.name}</span>
                                <button onClick={() => removeFile(i)} className="hover:text-destructive">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Step 3: Review */}
                  {step === 3 && (
                    <>
                      {/* AI Assessment Card */}
                      {urgencyResult && (
                        <Card className="border-primary/30 bg-primary/5">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                              <Sparkles className="w-5 h-5 text-primary" />
                              AI Urgency Assessment
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                              <UrgencyBadge level={urgencyResult.level} size="lg" />
                              <span className="text-3xl font-bold text-primary">{urgencyResult.score}/100</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="p-2 bg-background/80 rounded-lg">
                                <p className="text-xs text-muted-foreground">Base Score</p>
                                <p className="font-semibold">+{urgencyResult.breakdown.baseScore}</p>
                              </div>
                              <div className="p-2 bg-background/80 rounded-lg">
                                <p className="text-xs text-muted-foreground">Duration Bonus</p>
                                <p className="font-semibold">+{urgencyResult.breakdown.durationBonus}</p>
                              </div>
                              <div className="p-2 bg-background/80 rounded-lg">
                                <p className="text-xs text-muted-foreground">Vulnerable Groups</p>
                                <p className="font-semibold">+{urgencyResult.breakdown.vulnerableGroupBonus}</p>
                              </div>
                              <div className="p-2 bg-background/80 rounded-lg">
                                <p className="text-xs text-muted-foreground">Safety Keywords</p>
                                <p className="font-semibold">+{urgencyResult.breakdown.safetyKeywordBonus}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Department Assignment */}
                      {department && (
                        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Assigned Department</p>
                            <p className="font-semibold">{department.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Est. Resolution: {department.estimatedDays} days
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Summary Cards */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="py-3">
                            <CardTitle className="text-sm flex items-center gap-2">
                              <User className="w-4 h-4" /> Personal Details
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="py-2 text-sm space-y-1">
                            <p><span className="text-muted-foreground">Name:</span> {formData.isAnonymous ? 'Anonymous' : formData.name}</p>
                            {!formData.isAnonymous && (
                              <>
                                <p><span className="text-muted-foreground">Mobile:</span> {formData.mobile}</p>
                                {formData.email && <p><span className="text-muted-foreground">Email:</span> {formData.email}</p>}
                              </>
                            )}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="py-3">
                            <CardTitle className="text-sm flex items-center gap-2">
                              <MapPin className="w-4 h-4" /> Location
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="py-2 text-sm space-y-1">
                            <p>{formData.area && `${formData.area}, `}{formData.district}</p>
                            <p>{formData.state} {formData.pinCode && `- ${formData.pinCode}`}</p>
                            {formData.landmark && <p className="text-muted-foreground">{formData.landmark}</p>}
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Complaint
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 text-sm space-y-2">
                          <p><span className="text-muted-foreground">Category:</span> {formData.category} {formData.subCategory && `› ${formData.subCategory}`}</p>
                          <p className="text-muted-foreground line-clamp-3">{formData.complaintText}</p>
                          {formData.files.length > 0 && (
                            <p><span className="text-muted-foreground">Attachments:</span> {formData.files.length} file(s)</p>
                          )}
                        </CardContent>
                      </Card>

                      {/* Consent */}
                      <div className="flex items-start gap-3 p-4 bg-warning/10 rounded-lg border border-warning/30">
                        <Checkbox id="consent" required />
                        <Label htmlFor="consent" className="text-sm cursor-pointer">
                          I confirm that the information provided is true to the best of my knowledge. 
                          I understand that submitting false information is a punishable offense.
                        </Label>
                      </div>
                    </>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    {step > 1 ? (
                      <Button variant="outline" onClick={prevStep} className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </Button>
                    ) : (
                      <Link to="/">
                        <Button variant="ghost" className="gap-2">
                          <ArrowLeft className="w-4 h-4" /> Cancel
                        </Button>
                      </Link>
                    )}
                    
                    {step < 3 ? (
                      <Button onClick={nextStep} className="gap-2 bg-gradient-primary">
                        Next <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} className="gap-2 bg-gradient-primary">
                        Submit Complaint <Check className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
