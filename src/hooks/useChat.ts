"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatApiResponse, Message, MentorType } from "@/lib/types";
import { MENTOR_ORDER } from "@/lib/constants";

const STORAGE_KEY = "chronos-chatbot:threads:v1";

type Threads = Record<MentorType, Message[]>;

const emptyThreads = (): Threads => ({
  anshuman: [],
  abhimanyu: [],
  kshitij: [],
});

function loadThreads(): Threads {
  if (typeof window === "undefined") return emptyThreads();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyThreads();
    const parsed = JSON.parse(raw) as Record<string, Message[]>;
    const restored = emptyThreads();
    for (const id of MENTOR_ORDER) {
      if (Array.isArray(parsed[id])) {
        restored[id] = parsed[id].map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
      }
    }
    return restored;
  } catch {
    return emptyThreads();
  }
}

export function useChat() {
  const [threads, setThreads] = useState<Threads>(emptyThreads);
  const [activeMentor, setActiveMentor] = useState<MentorType>("anshuman");
  const [loadingMentor, setLoadingMentor] = useState<MentorType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hydratedRef = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    setThreads(loadThreads());
    hydratedRef.current = true;
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
    } catch {
      // storage full / disabled — silent
    }
  }, [threads]);

  const messages = threads[activeMentor];
  const isLoading = loadingMentor === activeMentor;

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed) return;

      const targetMentor = activeMentor;

      const userMessage: Message = {
        id: `${Date.now()}-u`,
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      setThreads((prev) => ({
        ...prev,
        [targetMentor]: [...prev[targetMentor], userMessage],
      }));
      setLoadingMentor(targetMentor);
      setError(null);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, mentor: targetMentor }),
        });

        const data = (await response.json()) as ChatApiResponse;

        if (!response.ok || !data.success) {
          const errMsg =
            (data as { error?: string }).error ||
            "Something went wrong. Please try again.";
          setError(errMsg);
          return;
        }

        const assistantMessage: Message = {
          id: `${Date.now()}-a`,
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
          mentor: targetMentor,
        };

        setThreads((prev) => ({
          ...prev,
          [targetMentor]: [...prev[targetMentor], assistantMessage],
        }));
      } catch (err) {
        console.error("Chat error:", err);
        setError(
          "Unable to reach the server. Please check your connection and try again."
        );
      } finally {
        setLoadingMentor((current) =>
          current === targetMentor ? null : current
        );
      }
    },
    [activeMentor]
  );

  const switchMentor = useCallback((mentor: MentorType) => {
    setActiveMentor(mentor);
    setError(null);
    setThreads((prev) => ({ ...prev, [mentor]: [] }));
  }, []);

  const clearActiveThread = useCallback(() => {
    setThreads((prev) => ({ ...prev, [activeMentor]: [] }));
    setError(null);
  }, [activeMentor]);

  const dismissError = useCallback(() => setError(null), []);

  return {
    threads,
    messages,
    activeMentor,
    isLoading,
    loadingMentor,
    error,
    sendMessage,
    switchMentor,
    clearActiveThread,
    dismissError,
  };
}
