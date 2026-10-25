export type QualityEvent = {
  id: string;
  title: string;
  location: string;
  category: string;
  urgency: "High" | "Routine";
  status: "Needs review" | "In review" | "Closed";
  age: string;
  owner: string;
};

export const rooms = [
  { name: "Aseptic Suite 01", code: "ROOM 01", status: "Ready", detail: "Demo checks recorded", score: 96 },
  { name: "Aseptic Suite 02", code: "ROOM 02", status: "Needs review", detail: "Fictional signal needs QA review", score: 78 },
  { name: "Preparation Room", code: "ROOM 03", status: "Ready", detail: "Demo checks recorded", score: 91 },
];

export const team = [
  { name: "Maya Patel", role: "Sterile compounding pharmacist", initials: "MP", status: "Current", due: "Demo qualifications current" },
  { name: "Elliot Chen", role: "Pharmacy technician", initials: "EC", status: "Due soon", due: "Training review due in 12 days" },
  { name: "Ava Kim", role: "Pharmacy technician", initials: "AK", status: "Current", due: "Demo qualifications current" },
  { name: "Jordan Reed", role: "Quality associate", initials: "JR", status: "Due soon", due: "Training review due in 4 days" },
];

export const startingEvents: QualityEvent[] = [
  { id: "QE-041", title: "Pressure monitor alert", location: "Aseptic Suite 02", category: "Environmental", urgency: "High", status: "Needs review", age: "18 min ago", owner: "Unassigned" },
  { id: "QE-039", title: "Cleaning record needs review", location: "Aseptic Suite 01", category: "Documentation", urgency: "Routine", status: "In review", age: "1 hr ago", owner: "A. Kim" },
  { id: "QE-036", title: "Equipment check reminder", location: "Preparation Room", category: "Equipment", urgency: "Routine", status: "Needs review", age: "3 hr ago", owner: "Unassigned" },
];

export const scenarioChoices = [
  "Follow the fictional site SOP, notify the assigned QA contact, and document the event.",
  "Continue the simulation without recording the alert.",
  "Reset the monitor and leave the event out of the shift record.",
];
