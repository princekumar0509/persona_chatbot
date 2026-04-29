import { MentorType } from "./types";

export interface MentorTheme {
  initials: string;
  shortName: string;
  role: string;
  blurb: string;
  accent: string;        // primary accent (hex)
  accentSoft: string;    // tinted background
  accentInk: string;     // accessible text on accentSoft
  gradient: string;      // avatar gradient (CSS)
}

export const mentorTheme: Record<MentorType, MentorTheme> = {
  einstein: {
    initials: "AE",
    shortName: "Einstein",
    role: "Theoretical Physicist",
    blurb: "On relativity, imagination, and the cosmos.",
    accent: "#EAB308", // Yellow
    accentSoft: "#FEF9C3",
    accentInk: "#854D0E",
    gradient: "linear-gradient(135deg, #FACC15 0%, #CA8A04 100%)",
  },
  marcus: {
    initials: "MA",
    shortName: "Aurelius",
    role: "Roman Emperor & Philosopher",
    blurb: "On stoicism, resilience, and inner peace.",
    accent: "#9CA3AF", // Gray/Marble
    accentSoft: "#F3F4F6",
    accentInk: "#374151",
    gradient: "linear-gradient(135deg, #D1D5DB 0%, #6B7280 100%)",
  },
  ada: {
    initials: "AL",
    shortName: "Lovelace",
    role: "First Computer Programmer",
    blurb: "On algorithms, computing, and poetry of logic.",
    accent: "#8B5CF6", // Purple/Steampunk vibe
    accentSoft: "#EDE9FE",
    accentInk: "#5B21B6",
    gradient: "linear-gradient(135deg, #A78BFA 0%, #6D28D9 100%)",
  },
};
