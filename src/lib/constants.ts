import { MentorType } from "./types";
import { mentors } from "./mentors";

export const MENTOR_ORDER: MentorType[] = ["einstein", "marcus", "ada"];

export const MENTOR_PLACEHOLDERS: Record<MentorType, string> = {
  einstein: "Ask about the cosmos, relativity, or light...",
  marcus: "Seek stoic wisdom, resilience, or inner peace...",
  ada: "Ask about logic, algorithms, or the poetry of computing...",
};
