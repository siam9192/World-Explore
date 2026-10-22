"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, LoaderCircle, MessageCircle, Send, Sparkles, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Where should I travel next?",
  "Help me plan a weekend trip",
];

function TravelChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I’m your WorldExplore travel assistant. Where would you like to explore?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return null;
  }

  async function sendMessage(content: string) {
    const trimmedContent = content.trim();
    if (!trimmedContent || isSending) return;

    const nextMessages = [...messages, { role: "user" as const, content: trimmedContent }].slice(-20);
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data: unknown = await response.json();

      if (!response.ok) {
        const message =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : "The travel assistant is temporarily unavailable.";
        setError(message);
        return;
      }

      if (
        typeof data !== "object" ||
        data === null ||
        !("reply" in data) ||
        typeof data.reply !== "string"
      ) {
        setError("The travel assistant returned an invalid response. Please try again.");
        return;
      }

      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Could not connect to the travel assistant. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          id="travel-chat-panel"
          aria-label="WorldExplore travel assistant"
          className="flex h-[min(36rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
        >
          <header className="flex items-center justify-between bg-primary-dark px-4 py-3.5 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-white/15">
                <Bot size={21} aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-semibold">Travel assistant</h2>
                <p className="text-xs text-white/75">Here to help you explore</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close travel assistant"
              className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/15"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </header>

          <div
            aria-live="polite"
            className="flex-1 space-y-4 overflow-y-auto bg-background p-4"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md border border-border bg-surface text-foreground"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}

            {messages.length === 1 && !isSending && (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void sendMessage(suggestion)}
                    className="rounded-full border border-primary/25 bg-surface px-3 py-2 text-left text-xs text-primary transition-colors hover:bg-primary-light"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {isSending && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                Finding some inspiration…
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {error && (
            <p role="alert" className="border-t border-error/20 bg-error-soft px-4 py-2 text-sm text-error">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border bg-surface p-3">
            <label htmlFor="travel-chat-input" className="sr-only">
              Message the travel assistant
            </label>
            <input
              id="travel-chat-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about your next trip…"
              maxLength={2000}
              disabled={isSending}
              className="min-w-0 flex-1 rounded-full border border-border bg-input px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              aria-label="Send message"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary-dark disabled:opacity-50"
            >
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="travel-chat-panel"
        aria-label={isOpen ? "Close travel assistant" : "Open travel assistant"}
        className="flex h-14 items-center gap-2.5 rounded-full bg-primary px-5 text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {isOpen ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <>
            <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
              <Sparkles size={17} aria-hidden="true" />
            </span>
            <span className="font-semibold">Ask AI</span>
            <MessageCircle size={18} aria-hidden="true" />
          </>
        )}
      </button>
    </div>
  );
}

export default TravelChatbot;
