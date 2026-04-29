import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";
import { getMentorConfig } from "@/lib/mentors";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, mentor } = body ?? {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required.", errorCode: "VALIDATION" },
        { status: 400 }
      );
    }

    if (!mentor || !["anshuman", "abhimanyu", "kshitij"].includes(mentor)) {
      return NextResponse.json(
        { success: false, error: "Invalid mentor.", errorCode: "VALIDATION" },
        { status: 400 }
      );
    }

    const mentorConfig = getMentorConfig(mentor);
    if (!mentorConfig) {
      return NextResponse.json(
        { success: false, error: "Mentor not found.", errorCode: "NOT_FOUND" },
        { status: 404 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not configured");
      return NextResponse.json(
        {
          success: false,
          error: "The chat service is not configured. Please try again later.",
          errorCode: "CONFIG_ERROR",
        },
        { status: 500 }
      );
    }

    const response = await callGemini(mentorConfig.systemPrompt, message);

    return NextResponse.json({
      success: true,
      response,
      mentor,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("Chat endpoint error:", error);
    const detailed = error as { errorDetails?: unknown };
    if (detailed?.errorDetails) {
      console.error(
        "Gemini errorDetails:",
        JSON.stringify(detailed.errorDetails, null, 2)
      );
    }

    const err = error as { status?: number; name?: string };
    if (err?.status === 429) {
      return NextResponse.json(
        {
          success: false,
          error: "We're getting too many requests right now. Please retry in a moment.",
          errorCode: "RATE_LIMIT",
        },
        { status: 429 }
      );
    }

    if (err?.name === "AbortError" || err?.name === "TimeoutError") {
      return NextResponse.json(
        {
          success: false,
          error: "The request is taking too long. Please try again.",
          errorCode: "TIMEOUT",
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Unable to process your message. Please try again.",
        errorCode: "API_ERROR",
      },
      { status: 500 }
    );
  }
}
