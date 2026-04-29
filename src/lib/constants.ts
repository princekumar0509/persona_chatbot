import { MentorType } from "./types";
import { mentors } from "./mentors";

export const MENTOR_ORDER: MentorType[] = ["anshuman", "abhimanyu", "kshitij"];

export const MENTOR_PLACEHOLDERS: Record<MentorType, string> = {
  anshuman: "Ask about upskilling, Facebook, or career growth...",
  abhimanyu: "Ask about startups, engineering, or industry needs...",
  kshitij: "Ask about DSA, interview prep, or problem-solving...",
};
