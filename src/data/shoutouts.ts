import type { ShoutOut } from "@/types";

export const SHOUTOUTS: ShoutOut[] = [
  {
    id: "shout-001",
    buyerName: "Miguel Reyes",
    budget: { min: 8_000_000, max: 15_000_000 },
    preferredCities: ["Makati", "Taguig"],
    preferredType: "condo",
    bedroomsMin: 2,
    description:
      "Looking for a 2-3BR condo in Makati or BGC. Preferably with 2 parking slots. We have 2 dogs so pet-friendly building is a must. Targeting move-in by Q3 2025.",
    createdAt: "2025-04-10T09:00:00Z",
  },
  {
    id: "shout-002",
    buyerName: "Sophia Dela Torre",
    budget: { min: 30_000_000, max: 60_000_000 },
    preferredCities: ["Alabang", "Paranaque"],
    preferredType: "house-and-lot",
    bedroomsMin: 4,
    description:
      "OFW family looking for a 4-5 BR house in a gated community in Alabang or Paranaque. Pool is preferred but not required. Budget is flexible for the right property.",
    createdAt: "2025-04-08T14:30:00Z",
  },
  {
    id: "shout-003",
    buyerName: "Carlos and Ana Bautista",
    budget: { min: 5_000_000, max: 10_000_000 },
    preferredCities: ["Pasig", "Mandaluyong", "Quezon City"],
    preferredType: "condo",
    bedroomsMin: 1,
    description:
      "Young couple looking for starter condo near Ortigas or Eastwood. 1-2 BR is fine. Important: near public transport (MRT/LRT) and coffee shops for WFH setup.",
    createdAt: "2025-04-06T11:00:00Z",
  },
  {
    id: "shout-004",
    buyerName: "Jessica Lim",
    budget: { min: 60_000, max: 120_000 },
    preferredCities: ["Makati", "Taguig", "Mandaluyong"],
    preferredType: "condo",
    bedroomsMin: 2,
    description:
      "Looking to rent a fully furnished 2-3BR condo for a team of 3 expat colleagues. Need fast WiFi, washing machine, and a proper work-from-home setup. Minimum 1 year lease.",
    createdAt: "2025-04-05T16:00:00Z",
  },
  {
    id: "shout-005",
    buyerName: "Andres Villanueva",
    budget: { min: 10_000_000, max: 20_000_000 },
    preferredCities: ["Quezon City", "Pasig"],
    preferredType: "townhouse",
    bedroomsMin: 3,
    description:
      "Looking for a 3-4BR townhouse in QC or Pasig as investment for our growing family. Must have at least 2 parking slots and a small outdoor area for the kids to play.",
    createdAt: "2025-04-03T10:00:00Z",
  },
  {
    id: "shout-006",
    buyerName: "Marie Aquino",
    budget: { min: 2_000_000, max: 5_000_000 },
    preferredCities: ["Manila", "Pasay"],
    preferredType: "lot",
    bedroomsMin: 0,
    description:
      "Looking for a 150-300 sqm lot in Manila or Pasay for a small commercial project. Near main roads preferred. Flexible on exact location as long as it's within Metro Manila proper.",
    createdAt: "2025-04-01T08:00:00Z",
  },
  {
    id: "shout-007",
    buyerName: "The Gonzalez Family",
    budget: { min: 20_000_000, max: 40_000_000 },
    preferredCities: ["Makati", "Taguig"],
    preferredType: "house-and-lot",
    bedroomsMin: 4,
    description:
      "Family of 6 looking to purchase a 4-5BR house in a prestigious village in Makati or BGC area. Needs helper's quarters, at least 2-car garage, and access to good schools nearby.",
    createdAt: "2025-03-28T13:00:00Z",
  },
  {
    id: "shout-008",
    buyerName: "Marco Serrano",
    budget: { min: 150_000, max: 250_000 },
    preferredCities: ["Alabang", "Paranaque"],
    preferredType: "house-and-lot",
    bedroomsMin: 4,
    description:
      "Multinational company exec looking to rent a fully furnished executive home for 2 years. Must have at least 4BR, private pool, smart home features, and fast internet. Company will cover rent.",
    createdAt: "2025-03-25T09:30:00Z",
  },
];
