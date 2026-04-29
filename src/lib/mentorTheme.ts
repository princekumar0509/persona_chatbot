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
  anshuman: {
    initials: "AS",
    shortName: "Anshuman",
    role: "Co-founder, Scaler",
    blurb: "On upskilling, Facebook days, and tech careers.",
    accent: "#3B82F6", // Blue
    accentSoft: "#DBEAFE",
    accentInk: "#1D4ED8",
    gradient: "linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)",
  },
  abhimanyu: {
    initials: "AB",
    shortName: "Abhimanyu",
    role: "Co-founder, Scaler",
    blurb: "On startups, engineering, and bridging the skill gap.",
    accent: "#10B981", // Emerald
    accentSoft: "#D1FAE5",
    accentInk: "#047857",
    gradient: "linear-gradient(135deg, #34D399 0%, #059669 100%)",
  },
  kshitij: {
    initials: "KM",
    shortName: "Kshitij",
    role: "Head of Instructors, Scaler",
    blurb: "On DSA, problem-solving, and continuous learning.",
    accent: "#F97316", // Orange
    accentSoft: "#FFEDD5",
    accentInk: "#C2410C",
    gradient: "linear-gradient(135deg, #FB923C 0%, #EA580C 100%)",
  },
};
