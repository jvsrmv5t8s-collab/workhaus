"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, Phone, PhoneOff, Send, Mic, MicOff } from "lucide-react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";

const AGENT_ID = "agent_1701kpvf86mpfygb170nb8m642xt";
const CONTAINER_MAX = 1160;
const FLOATING_RIGHT = 24;


function calcHeroRight() {
  const padding = window.innerWidth >= 1024 ? 40 : 24;
  const margin = Math.max(0, (window.innerWidth - CONTAINER_MAX) / 2);
  return margin + padding;
}

// ─── Inner panel (must be inside ConversationProvider) ───────────────────────
type LeadInfo = {
  name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  workspace_type: string | null;
  team_size: string | null;
};

// Only these fields get visible confirmation cards — the rest are captured silently
const VISIBLE_FIELDS: (keyof LeadInfo)[] = ["name", "email", "phone"];

const EMPTY_LEAD: LeadInfo = {
  name: null,
  email: null,
  phone: null,
  city: null,
  workspace_type: null,
  team_size: null,
};

function AIPanelContent() {
  const [leadInfo, setLeadInfo] = useState<LeadInfo>(EMPTY_LEAD);
  const [activeInputField, setActiveInputField] = useState<keyof LeadInfo | null>(null);

  const {
    startSession,
    endSession,
    status,
    isSpeaking,
    sendUserMessage,
    sendUserActivity,
  } = useConversation({
    clientTools: {
      capture_lead_info: ({ field, value }: { field: keyof LeadInfo; value: string }) => {
        setLeadInfo(prev => ({ ...prev, [field]: value }));
        if (VISIBLE_FIELDS.includes(field)) setActiveInputField(null);
        return "Captured successfully";
      },
      request_input: ({ field }: { field: keyof LeadInfo }) => {
        if (VISIBLE_FIELDS.includes(field)) setActiveInputField(field);
        return "Input field shown";
      },
    },
  });

  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [conversationStarted, setConversationStarted] = useState(false);
  const [heroMode, setHeroMode] = useState(true);
  const [heroRight, setHeroRight] = useState(FLOATING_RIGHT);
  const [micError, setMicError] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [miniCardDismissed, setMiniCardDismissed] = useState(false);
  const [hangUpLock, setHangUpLock] = useState(false);
  const connectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statusRef = useRef(status);
  useEffect(() => { statusRef.current = status; }, [status]);

  // Map SDK status → orb animation state (with hangUpLock override)
  const connected = status === "connected" && !hangUpLock;
  const connecting = status === "connecting" && !hangUpLock;
  const orbState: "idle" | "listening" | "speaking" =
    !connected ? "idle" : isSpeaking ? "speaking" : "listening";

  const updateHeroRight = useCallback(() => setHeroRight(calcHeroRight()), []);

  useEffect(() => {
    updateHeroRight();
    window.addEventListener("resize", updateHeroRight);
    return () => window.removeEventListener("resize", updateHeroRight);
  }, [updateHeroRight]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) { setHeroMode(false); return; }
    const observer = new IntersectionObserver(
      ([entry]) => setHeroMode(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Hide quick prompts once a voice session or text message starts
  useEffect(() => {
    if (connected) setConversationStarted(true);
  }, [connected]);

  // Clear connection timeout whenever status changes + release hangUpLock
  useEffect(() => {
    if (status !== "connecting") {
      if (connectTimeoutRef.current) clearTimeout(connectTimeoutRef.current);
    }
    if (status === "connected") setNetworkError(false);
    if (status === "error") setNetworkError(true);
    if (status === "disconnected") setHangUpLock(false);
  }, [status]);

  async function handleCall() {
    if (connected || connecting) {
      if (connectTimeoutRef.current) clearTimeout(connectTimeoutRef.current);
      setHangUpLock(true);
      endSession();
      setNetworkError(false);
      setConversationStarted(false);
      setMicError(false);
      setLeadInfo(EMPTY_LEAD);
      setActiveInputField(null);
    } else {
      setHangUpLock(false);
      setMicError(false);
      setNetworkError(false);
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch {
        setMicError(true);
        return;
      }
      startSession({ agentId: AGENT_ID, connectionType: "webrtc" });
      // Fix stale closure: use statusRef so the timeout reads live status
      connectTimeoutRef.current = setTimeout(() => {
        if (statusRef.current === "connecting") {
          endSession();
          setNetworkError(true);
        }
      }, 10000);
    }
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setConversationStarted(true);
    if (connected) {
      sendUserMessage(message.trim());
    }
    setMessage("");
    setActiveInputField(null);
  }

  async function handleStartCallFromMiniCard() {
    setOpen(true);
    // Small delay so the panel animates in before we request mic
    await new Promise((r) => setTimeout(r, 400));
    handleCall();
  }

  const orbClass =
    orbState === "idle" ? "orb-idle" :
    orbState === "listening" ? "orb-listening" : "orb-speaking";

  const statusLabel =
    networkError ? "Connection failed — check your internet" :
    micError ? "Microphone access denied" :
    connecting ? "Connecting..." :
    orbState === "listening" ? "Listening..." :
    orbState === "speaking" ? "Responding..." :
    null;

  // Style tokens
  const panelBg = heroMode
    ? "bg-white/75 backdrop-blur-2xl border-white/60 shadow-lg shadow-black/10"
    : "bg-white backdrop-blur-none border-hairline shadow-2xl shadow-black/20";

  const panelRight = heroMode ? heroRight : FLOATING_RIGHT;

  return (
    <>
      {/* Panel — desktop only */}
      <div
        style={{ right: `${panelRight}px` }}
        className={`
          hidden md:flex flex-col
          fixed top-1/2 -translate-y-1/2 z-40
          w-[320px] h-[60vh] min-h-[480px] max-h-[680px]
          rounded-3xl border overflow-hidden
          transition-all duration-700 ease-in-out
          ${panelBg}
          ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[110%] pointer-events-none"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
          <Image
            src="/Logo_Web_workhaus_dark.svg"
            alt="Workhaus"
            width={80}
            height={40}
            className="shrink-0"
          />
          <div className="flex items-center gap-2">
            {/* Connection status dot */}
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                connected ? "bg-teal" :
                connecting ? "bg-yellow animate-pulse" :
                "bg-hairline"
              }`}
            />
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-mute hover:text-ink hover:bg-canvas transition-colors"
              aria-label="Close panel"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="w-full h-px bg-hairline shrink-0" />

        {/* Orb + content area */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 gap-3 overflow-hidden">

          {/* Orb */}
          <div className="relative flex items-center justify-center">
            <div className={`absolute rounded-full transition-all duration-700 ${
              connected && orbState !== "idle"
                ? "w-44 h-44 animate-ping-slow"
                : "w-0 h-0"
            }`} style={{ background: "rgba(72,160,140,0.10)" }} />
            <div className={`absolute rounded-full transition-all duration-500 ${
              connected && orbState !== "idle" ? "w-36 h-36" : "w-0 h-0"
            }`} style={{ background: "rgba(72,160,140,0.15)" }} />
            <div className={`relative rounded-full transition-all duration-700 ${orbClass} ${
              heroMode ? "w-32 h-32" : "w-28 h-28"
            }`}>
              <div className="absolute inset-0 rounded-full orb-shine" />
              {/* Eyes */}
              <div className="orb-eyes">
                <div className="eye eye-left" />
                <div className="eye eye-right" />
              </div>
            </div>
          </div>

          {/* Hazel name + badge — hidden once conversation starts */}
          {!conversationStarted && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-[14px] font-semibold text-ink tracking-tight">
                Hi, I&apos;m Hazel.
              </p>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-canvas border border-hairline">
                <span className="w-2 h-2 rounded-full shrink-0 bg-teal" />
                <span className="text-[11px] font-semibold text-ink-soft tracking-wide">Almost Human Assistant</span>
              </div>
            </div>
          )}

          {/* Call button — idle/connecting, lives in content area */}
          {!conversationStarted && (
            <div className="flex flex-col items-center gap-[16px] mt-[50px]">
              <div className="relative flex items-center justify-center">
                {!connecting && (
                  <>
                    <div className="sonar-ring" />
                    <div className="sonar-ring sonar-ring-2" />
                    <div className="sonar-ring sonar-ring-3" />
                  </>
                )}
                <button
                  onClick={handleCall}
                  className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md z-10 ${
                    connecting
                      ? "bg-red-400 hover:bg-red-500 scale-105"
                      : "bg-ink hover:bg-teal-dark"
                  }`}
                  aria-label={connecting ? "Cancel" : "Start voice call"}
                >
                  {connecting ? (
                    <PhoneOff size={24} className="text-white" />
                  ) : (
                    <Phone size={24} className="text-white" />
                  )}
                </button>
              </div>
              {/* Status / tap label */}
              <p className={`text-[12px] text-center leading-snug flex items-center justify-center gap-1.5 transition-colors duration-300 ${
                micError || networkError ? "text-red-400" : "text-mute"
              }`}>
                {!micError && !networkError && !statusLabel && <Mic size={12} className="text-mute shrink-0" />}
                {statusLabel ?? "Tap above to start a voice conversation"}
              </p>
            </div>
          )}

          {/* Status text — active call only */}
          {conversationStarted && statusLabel && (
            <p className={`text-[12px] text-center leading-snug px-2 transition-colors duration-300 ${
              micError || networkError ? "text-red-400" : "text-mute"
            }`}>
              {statusLabel}
            </p>
          )}

          {/* Captured lead info cards */}
          {conversationStarted && VISIBLE_FIELDS.some(f => leadInfo[f]) && (
            <div className="w-full flex flex-col gap-1.5 mt-1">
              {VISIBLE_FIELDS
                .filter(field => leadInfo[field])
                .map(field => (
                  <div
                    key={field}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-canvas border border-hairline"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                    <span className="text-[10px] font-semibold text-mute uppercase tracking-wide w-9 shrink-0">
                      {field === "phone" ? "Tel" : field.charAt(0).toUpperCase() + field.slice(1)}
                    </span>
                    <span className="text-[12px] text-ink truncate">{leadInfo[field]}</span>
                  </div>
                ))}
            </div>
          )}

        </div>

        {/* Bottom controls — active call only */}
        {conversationStarted && (
          <div className="shrink-0 px-5 pb-6 pt-4 flex flex-col items-center justify-center gap-4">

            {/* Contextual text input — only when Hazel requests it */}
            {connected && activeInputField && (
              <div className="w-full flex flex-col gap-1.5">
                <p className="text-[11px] font-semibold text-ink-soft px-1 tracking-wide uppercase">
                  {activeInputField === "name"
                    ? "Your name"
                    : activeInputField === "email"
                    ? "Your email address"
                    : "Your phone number"}
                </p>
                <form onSubmit={handleSend} className="flex items-center gap-2.5">
                  <input
                    type={
                      activeInputField === "email"
                        ? "email"
                        : activeInputField === "phone"
                        ? "tel"
                        : "text"
                    }
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      sendUserActivity();
                    }}
                    placeholder={
                      activeInputField === "name"
                        ? "e.g. Jaime Aoyagi"
                        : activeInputField === "email"
                        ? "you@example.com"
                        : "+1 (416) 000-0000"
                    }
                    autoFocus
                    className="flex-1 bg-white border border-hairline rounded-2xl px-4 py-3.5 text-[14px] text-ink placeholder:text-mute focus:outline-none focus:border-teal/60 focus:ring-2 focus:ring-teal/10 transition-all shadow-sm"
                  />
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="w-12 h-12 rounded-2xl bg-teal flex items-center justify-center shrink-0 disabled:opacity-30 hover:bg-teal-dark transition-colors shadow-sm"
                    aria-label="Send"
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </form>
              </div>
            )}

            {/* Mute + hang-up */}
            <div className="flex items-center justify-center gap-3">
              {connected && (
                <button
                  onClick={() => {/* mute toggle — future */}}
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-canvas hover:bg-hairline border border-hairline transition-colors"
                  aria-label="Mute microphone"
                >
                  <Mic size={16} className="text-ink-soft" />
                </button>
              )}
              <button
                onClick={handleCall}
                className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                  connected
                    ? "bg-red-500 hover:bg-red-600 scale-110"
                    : "bg-red-400 hover:bg-red-500 scale-105"
                }`}
                aria-label="End call"
              >
                <PhoneOff size={24} className="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mini card — desktop, delayed, dismissable */}
      <div
        className={`
          hidden md:block
          fixed bottom-6 right-6 z-40
          w-[268px] bg-white rounded-2xl shadow-xl border border-hairline
          transition-all duration-500 ease-in-out
          ${!open && !miniCardDismissed
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"}
        `}
      >
        {/* Dismiss */}
        <button
          onClick={() => { setMiniCardDismissed(true); }}
          className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-mute hover:text-ink hover:bg-canvas transition-colors"
          aria-label="Dismiss"
        >
          <X size={11} />
        </button>

        {/* Body */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          {/* Mini orb with eyes */}
          <div className={`relative orb-sm orb-idle shrink-0 w-10 h-10 rounded-full`}>
            <div className="absolute inset-0 rounded-full orb-shine" />
            <div className="orb-eyes">
              <div className="eye eye-left" />
              <div className="eye eye-right" />
            </div>
          </div>
          <p className="text-[14px] leading-[1.45] text-ink-soft pr-3">
            Ask Hazel about spaces, pricing, or book a tour — available 24/7.
          </p>
        </div>

        {/* CTA */}
        <div className="px-3 pb-3">
          <button
            onClick={handleStartCallFromMiniCard}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-ink hover:bg-teal-dark text-white text-[13px] font-semibold transition-colors"
          >
            <Phone size={14} />
            Start a call
          </button>
        </div>
      </div>

      {/* Mobile bubble — always visible on mobile when panel is closed */}
      <button
        onClick={() => setOpen(true)}
        className={`
          md:hidden fixed bottom-6 right-6 z-40
          w-14 h-14 rounded-full shadow-xl
          bg-ink hover:bg-teal transition-all duration-300
          flex items-center justify-center
          ${open ? "opacity-0 pointer-events-none scale-75" : "opacity-100 scale-100"}
        `}
        aria-label="Open AI assistant"
      >
        <span className={`absolute inset-0 rounded-full animate-ping ${connected ? "bg-teal/40" : "bg-teal/20"}`} />
        {connected ? (
          <MicOff size={20} className="text-white relative z-10" />
        ) : (
          <Phone size={20} className="text-white relative z-10" />
        )}
      </button>
    </>
  );
}

// ─── Public export (wraps with provider) ─────────────────────────────────────
export default function AIPanel() {
  return (
    <ConversationProvider>
      <AIPanelContent />
    </ConversationProvider>
  );
}
