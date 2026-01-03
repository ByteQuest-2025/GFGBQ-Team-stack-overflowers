export interface Department {
  name: string;
  icon: string;
  estimatedDays: number;
}

export const DEPARTMENT_MAP: Record<string, Department> = {
  "Water Supply": {
    name: "Municipal Water Works Department",
    icon: "💧",
    estimatedDays: 3,
  },
  "Roads & Infrastructure": {
    name: "Public Works Department (PWD)",
    icon: "🛣️",
    estimatedDays: 7,
  },
  "Sanitation & Waste": {
    name: "Municipal Corporation - Waste Management",
    icon: "🗑️",
    estimatedDays: 2,
  },
  "Street Lights": {
    name: "Electrical & Lighting Department",
    icon: "💡",
    estimatedDays: 4,
  },
  "Public Safety": {
    name: "Municipal Security Office",
    icon: "🛡️",
    estimatedDays: 1,
  },
  "Healthcare": {
    name: "Health Services Department",
    icon: "🏥",
    estimatedDays: 2,
  },
  "Education": {
    name: "District Education Office",
    icon: "📚",
    estimatedDays: 5,
  },
  "Other": {
    name: "General Administration Office",
    icon: "📋",
    estimatedDays: 7,
  },
};

export const CATEGORIES = [
  { id: "water", name: "Water Supply", icon: "💧", color: "bg-blue-500" },
  { id: "roads", name: "Roads & Infrastructure", icon: "🛣️", color: "bg-gray-600" },
  { id: "sanitation", name: "Sanitation & Waste", icon: "🗑️", color: "bg-green-600" },
  { id: "lights", name: "Street Lights", icon: "💡", color: "bg-yellow-500" },
  { id: "safety", name: "Public Safety", icon: "🛡️", color: "bg-red-500" },
  { id: "healthcare", name: "Healthcare", icon: "🏥", color: "bg-pink-500" },
  { id: "education", name: "Education", icon: "📚", color: "bg-purple-500" },
  { id: "other", name: "Other", icon: "📋", color: "bg-slate-500" },
];

export const SUB_CATEGORIES: Record<string, string[]> = {
  "Water Supply": [
    "No water supply",
    "Low pressure",
    "Contaminated water",
    "Pipeline leakage",
    "Irregular timing",
    "Billing issues",
  ],
  "Roads & Infrastructure": [
    "Pothole",
    "Road damage",
    "Footpath issue",
    "Drainage blockage",
    "Bridge damage",
    "Traffic signal",
  ],
  "Sanitation & Waste": [
    "Garbage not collected",
    "Open dumping",
    "Overflowing dustbin",
    "Drainage blockage",
    "Sewage overflow",
    "Dead animal removal",
  ],
  "Street Lights": [
    "Light not working",
    "Dim light",
    "Irregular timing",
    "New light needed",
    "Damaged pole",
    "Wiring issue",
  ],
  "Public Safety": [
    "Unsafe area",
    "Stray animals",
    "Illegal activity",
    "Traffic hazard",
    "Construction hazard",
    "Fire hazard",
  ],
  "Healthcare": [
    "Hospital issue",
    "Medical emergency",
    "Medicine unavailable",
    "Staff behavior",
    "Hygiene issue",
    "Ambulance delay",
  ],
  "Education": [
    "Teacher absence",
    "Infrastructure issue",
    "Mid-day meal",
    "Admission issue",
    "Fee dispute",
    "Safety concern",
  ],
  "Other": [
    "General query",
    "Suggestion",
    "Appreciation",
    "Multiple issues",
    "Other department",
  ],
};

export const STATES = [
  "Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Maharashtra",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
];

export const DISTRICTS: Record<string, string[]> = {
  "Delhi": ["Central Delhi", "East Delhi", "North Delhi", "South Delhi", "South West Delhi", "West Delhi"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  "Karnataka": ["Bangalore Urban", "Bangalore Rural", "Mysore", "Mangalore"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Ghaziabad", "Varanasi", "Agra"],
};

export function getDepartment(category: string): Department {
  return DEPARTMENT_MAP[category] || DEPARTMENT_MAP["Other"];
}

export function generateComplaintId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `GRV${year}${random}`;
}
