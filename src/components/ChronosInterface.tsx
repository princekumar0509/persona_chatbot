"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { mentors } from "@/lib/mentors";
import { mentorTheme } from "@/lib/mentorTheme";
import { MENTOR_ORDER, MENTOR_PLACEHOLDERS } from "@/lib/constants";
import { MentorType } from "@/lib/types";
import { Send, Download, Volume2, StopCircle, Bot, User, Clock, Loader2, Sparkles } from "lucide-react";

export default function ChronosInterface() {
  const {
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
  } = useChat();

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const handleExport = () => {
    const textContent = messages
      .map((m) => `[${m.timestamp.toLocaleString()}] ${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Chronos_${activeMentor}_Chat.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const [speaking, setSpeaking] = useState(false);
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

  const handleTTS = (text: string) => {
    if (!synth) return;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    // Try to set pitch/rate based on mentor
    utterance.pitch = activeMentor === "einstein" ? 1.2 : activeMentor === "marcus" ? 0.7 : 1.5;
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(false);
    synth.speak(utterance);
    setSpeaking(true);
  };

  const activeTheme = mentorTheme[activeMentor];

  return (
    <div className="flex h-[100dvh] w-full flex-col relative overflow-hidden bg-canvas">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-1000"
        style={{ background: activeTheme.gradient }}
      />
      
      {/* Top Navigation */}
      <header className="glass relative z-10 flex flex-col sm:flex-row items-center justify-between p-4 border-b border-line shadow-lg">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <Clock className="w-6 h-6 text-ink" />
          <h1 className="text-xl font-serif-display font-bold text-ink">CHRONOS MODULE</h1>
        </div>

        <div className="flex bg-surface/50 p-1 rounded-full border border-line shadow-inner">
          {MENTOR_ORDER.map((mId) => (
            <button
              key={mId}
              onClick={() => switchMentor(mId)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeMentor === mId
                  ? "bg-ink text-canvas shadow-md transform scale-105"
                  : "text-ink-soft hover:text-ink hover:bg-surface"
              }`}
            >
              {mentorTheme[mId].shortName}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <button 
            onClick={handleExport}
            className="p-2 rounded-full hover:bg-surface/80 text-ink-soft transition-colors"
            title="Export Conversation"
          >
            <Download className="w-5 h-5" />
          </button>
          {messages.length > 0 && (
            <button 
              onClick={clearActiveThread}
              className="text-xs px-3 py-1.5 rounded-full border border-ink-soft/30 hover:bg-ink hover:text-canvas transition-colors"
            >
              Reset Timeline
            </button>
          )}
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-soft relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Message */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center mt-20 msg-in">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl mb-6"
                style={{ background: activeTheme.gradient }}
              >
                {activeTheme.initials}
              </div>
              <h2 className="text-3xl font-serif-display mb-2">{mentors[activeMentor].name}</h2>
              <p className="text-ink-mute mb-8 text-lg">{activeTheme.role}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {mentors[activeMentor].suggestionQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setInput(q); }}
                    className="p-4 rounded-xl glass text-left text-sm hover:border-ink/20 transition-all hover:-translate-y-1 group"
                  >
                    <Sparkles className="w-4 h-4 mb-2 opacity-50 group-hover:opacity-100" style={{ color: activeTheme.accent }} />
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div key={msg.id} className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"} msg-in`}>
                <div className="shrink-0 pt-1">
                  {isUser ? (
                    <div className="w-10 h-10 rounded-full bg-ink text-canvas flex items-center justify-center shadow-md">
                      <User className="w-5 h-5" />
                    </div>
                  ) : (
                    <div 
                      className="w-10 h-10 rounded-full text-white flex items-center justify-center shadow-md"
                      style={{ background: activeTheme.gradient }}
                    >
                      <Bot className="w-5 h-5" />
                    </div>
                  )}
                </div>
                
                <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[80%]`}>
                  <div 
                    className={`p-4 rounded-2xl shadow-sm text-[15px] leading-relaxed ${
                      isUser 
                        ? "bg-ink text-canvas rounded-tr-sm" 
                        : "glass rounded-tl-sm text-ink whitespace-pre-wrap"
                    }`}
                  >
                    {msg.content}
                  </div>
                  
                  {!isUser && (
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => handleTTS(msg.content)}
                        className="text-ink-mute hover:text-ink transition-colors flex items-center gap-1 text-xs"
                      >
                        {speaking ? <StopCircle className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        {speaking ? "Stop" : "Listen"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-4 flex-row msg-in">
              <div className="shrink-0 pt-1">
                <div 
                  className="w-10 h-10 rounded-full text-white flex items-center justify-center shadow-md"
                  style={{ background: activeTheme.gradient }}
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
              <div className="glass p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2 text-ink-mute">
                <div className="pulse-dot w-2 h-2 rounded-full bg-current" style={{ animationDelay: "0ms" }} />
                <div className="pulse-dot w-2 h-2 rounded-full bg-current" style={{ animationDelay: "200ms" }} />
                <div className="pulse-dot w-2 h-2 rounded-full bg-current" style={{ animationDelay: "400ms" }} />
              </div>
            </div>
          )}
          
          {error && (
            <div className="glass border-red-500/30 text-red-400 p-4 rounded-xl text-sm flex justify-between items-center msg-in">
              <span>{error}</span>
              <button onClick={dismissError} className="underline hover:text-red-300">Dismiss</button>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-4 sm:p-6 relative z-10 glass border-t border-line">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={MENTOR_PLACEHOLDERS[activeMentor]}
            className="w-full bg-surface/50 border border-line rounded-2xl py-4 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-ink/20 resize-none h-[60px] max-h-[150px] scrollbar-soft transition-all"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-ink text-canvas hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center mt-3 text-xs text-ink-mute">
          Press Enter to send, Shift + Enter for new line. Responses powered by Historical Data Simulation.
        </div>
      </footer>
    </div>
  );
}
