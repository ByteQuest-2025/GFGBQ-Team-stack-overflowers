export interface Complaint {
  id: string;
  complaintId: string;
  citizenName: string;
  citizenEmail: string;
  citizenMobile: string;
  isAnonymous: boolean;
  category: string;
  subCategory: string;
  complaintText: string;
  state: string;
  district: string;
  area: string;
  landmark: string;
  pinCode: string;
  urgency: 'Critical' | 'High' | 'Medium' | 'Low';
  urgencyScore: number;
  status: 'New' | 'In Progress' | 'Under Review' | 'Resolved' | 'Closed';
  department: string;
  createdAt: Date;
  resolvedAt?: Date;
  citizenRating?: number;
}

export const SAMPLE_COMPLAINTS: Complaint[] = [
  {
    id: "1",
    complaintId: "GRV202600001",
    citizenName: "Rajesh Kumar",
    citizenEmail: "rajesh@email.com",
    citizenMobile: "9876543210",
    isAnonymous: false,
    category: "Water Supply",
    subCategory: "No water supply",
    complaintText: "पानी की सप्लाई 5 दिन से बंद है। बच्चों को बहुत problem है। Please help urgently.",
    state: "Delhi",
    district: "South West Delhi",
    area: "Sector 12, Dwarka",
    landmark: "Near Metro Station",
    pinCode: "110075",
    urgency: "Critical",
    urgencyScore: 88,
    status: "In Progress",
    department: "Municipal Water Works Department",
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "2",
    complaintId: "GRV202600002",
    citizenName: "Priya Sharma",
    citizenEmail: "priya@email.com",
    citizenMobile: "9876543211",
    isAnonymous: false,
    category: "Roads & Infrastructure",
    subCategory: "Pothole",
    complaintText: "Main road par bahut bada pothole. 2 accidents ho chuke hain. Very dangerous for vehicles.",
    state: "Maharashtra",
    district: "Pune",
    area: "MG Road",
    landmark: "Near City Mall",
    pinCode: "411001",
    urgency: "High",
    urgencyScore: 72,
    status: "New",
    department: "Public Works Department (PWD)",
    createdAt: new Date("2026-01-02"),
  },
  {
    id: "3",
    complaintId: "GRV202600003",
    citizenName: "Anonymous",
    citizenEmail: "",
    citizenMobile: "",
    isAnonymous: true,
    category: "Sanitation & Waste",
    subCategory: "Garbage not collected",
    complaintText: "Garbage collection 3 weeks se nahi ho rahi. Smell and flies everywhere. Health hazard for elderly people.",
    state: "Delhi",
    district: "North Delhi",
    area: "Block C, Rohini",
    landmark: "Near Park",
    pinCode: "110085",
    urgency: "High",
    urgencyScore: 68,
    status: "Under Review",
    department: "Municipal Corporation - Waste Management",
    createdAt: new Date("2026-01-02"),
  },
  {
    id: "4",
    complaintId: "GRV202600004",
    citizenName: "Meera Patel",
    citizenEmail: "meera@email.com",
    citizenMobile: "9876543214",
    isAnonymous: false,
    category: "Street Lights",
    subCategory: "Light not working",
    complaintText: "Street light not working for 1 month. Unsafe for women at night. Children also face problems.",
    state: "Delhi",
    district: "South Delhi",
    area: "Vasant Kunj",
    landmark: "Near School",
    pinCode: "110070",
    urgency: "Medium",
    urgencyScore: 51,
    status: "Resolved",
    department: "Electrical & Lighting Department",
    createdAt: new Date("2025-12-28"),
    resolvedAt: new Date("2026-01-01"),
    citizenRating: 5,
  },
  {
    id: "5",
    complaintId: "GRV202600005",
    citizenName: "Amit Singh",
    citizenEmail: "amit@email.com",
    citizenMobile: "9876543215",
    isAnonymous: false,
    category: "Public Safety",
    subCategory: "Fire hazard",
    complaintText: "EMERGENCY: Gas leak ka doubt hai. Strong smell in the area. Please send someone immediately!",
    state: "Delhi",
    district: "East Delhi",
    area: "Mayur Vihar Phase 1",
    landmark: "Near Metro Station",
    pinCode: "110091",
    urgency: "Critical",
    urgencyScore: 95,
    status: "In Progress",
    department: "Municipal Security Office",
    createdAt: new Date("2026-01-03"),
  },
  {
    id: "6",
    complaintId: "GRV202600006",
    citizenName: "Sunita Devi",
    citizenEmail: "sunita@email.com",
    citizenMobile: "9876543216",
    isAnonymous: false,
    category: "Healthcare",
    subCategory: "Hospital issue",
    complaintText: "Government hospital mein medicines available nahi. Elderly patients suffering. Need urgent attention.",
    state: "Uttar Pradesh",
    district: "Noida",
    area: "Sector 62",
    landmark: "Near Botanical Garden",
    pinCode: "201301",
    urgency: "High",
    urgencyScore: 73,
    status: "New",
    department: "Health Services Department",
    createdAt: new Date("2026-01-03"),
  },
  {
    id: "7",
    complaintId: "GRV202600007",
    citizenName: "Vikram Rao",
    citizenEmail: "vikram@email.com",
    citizenMobile: "9876543217",
    isAnonymous: false,
    category: "Education",
    subCategory: "Teacher absence",
    complaintText: "School mein 2 teachers ki kami hai for 3 months. Children's education suffering badly.",
    state: "Karnataka",
    district: "Bangalore Urban",
    area: "Whitefield",
    landmark: "Near Tech Park",
    pinCode: "560066",
    urgency: "Medium",
    urgencyScore: 53,
    status: "Under Review",
    department: "District Education Office",
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "8",
    complaintId: "GRV202600008",
    citizenName: "Ananya Gupta",
    citizenEmail: "ananya@email.com",
    citizenMobile: "9876543218",
    isAnonymous: false,
    category: "Sanitation & Waste",
    subCategory: "Sewage overflow",
    complaintText: "Sewage overflow on main road for 1 week. Very unhygienic. Pregnant women finding it difficult to walk.",
    state: "Delhi",
    district: "Central Delhi",
    area: "Karol Bagh",
    landmark: "Near Market",
    pinCode: "110005",
    urgency: "Critical",
    urgencyScore: 83,
    status: "In Progress",
    department: "Municipal Corporation - Waste Management",
    createdAt: new Date("2026-01-02"),
  },
];

export const STATS = {
  totalComplaints: 15847,
  resolvedToday: 127,
  avgResolutionTime: "2.4 days",
  activeDepartments: 8,
  resolutionRate: 89,
  satisfaction: 4.2,
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
