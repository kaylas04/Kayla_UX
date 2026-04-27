import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

/* ─── Paper palette ────────────────────────────────────────────────
   bg      : #F5F0E8  warm ivory / bone
   ink     : #2A2620  near-black warm charcoal
   body    : #56504A  soft graphite
   dim     : #7A7268  muted warm gray
   accent  : #8C7B62  amber / kraft paper
   rule    : #D9D3C8  light fog divider
   surface : #EDE8DF  slightly darker paper card
──────────────────────────────────────────────────────────────────── */

const P = {
  bg: "#F5F0E8",
  surface: "#EDE8DF",
  ink: "#2A2620",
  body: "#56504A",
  dim: "#7A7268",
  accent: "#8C7B62",
  rule: "#D9D3C8",
  accentFaint: "rgba(140,123,98,0.12)",
  accentBorder: "rgba(140,123,98,0.22)",
};

const meta = [
  { label: "Client",    value: "Origami Robotics\n(YC W26)" },
  { label: "Timeline",  value: "10-Week Sprint\n2026" },
  { label: "Team",      value: "4 UX Designers" },
  { label: "My Role",   value: "Persona Development\nBranding Direction\nPlayground UX" },
];

/* Decorative technical grid line SVG */
function GridLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.045 }}
      aria-hidden
    >
      <defs>
        <pattern id="techGrid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2A2620" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#techGrid)" />
    </svg>
  );
}

function PaperGrain({ opacity = 0.032 }: { opacity?: number }) {
  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id="pgrain" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="linearRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity,
          mixBlendMode: "multiply",
        }}
      />
    </>
  );
}

function AnimRule({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      className="h-px origin-left"
      style={{ backgroundColor: P.rule }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-px" style={{ backgroundColor: P.accent }} />
      <span
        className="font-sans text-[10px] uppercase tracking-[0.3em]"
        style={{ color: P.accent }}
      >
        {children}
      </span>
    </div>
  );
}

/* Neutral image placeholder */
function ImgPlaceholder({ label, aspect = "aspect-[4/3]" }: { label: string; aspect?: string }) {
  return (
    <div
      className={`w-full ${aspect} flex items-center justify-center rounded-lg`}
      style={{ background: P.surface, border: `0.5px solid ${P.rule}` }}
    >
      <span
        className="font-sans text-[11px] uppercase tracking-[0.2em] text-center px-6"
        style={{ color: P.dim }}
      >
        {label}
      </span>
    </div>
  );
}

const timelineNodes = [
  { week: "Week 1–2", phase: "Discover.",          above: true,  items: ["Problem framing", "User definition", "End-to-end journey"] },
  { week: "Week 3–4", phase: "Define.",             above: false, items: ["Competitive insights", "Pain points", "Design principles"] },
  { week: "Week 5–6", phase: "Brand & FOS.",        above: true,  items: ["Brand direction", "Landing page concepts"] },
  { week: "Week 7–8", phase: "Onboarding Design.",  above: false, items: ["Onboarding flow", "Interaction patterns", "Iteration explorations"] },
  { week: "Week 9–10", phase: "Refine & Deliver.", above: true,  items: ["Control interface", "Interactive prototype", "Demo flow"] },
];

function ComingSoonBlur({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  return (
    <div
      className="relative cursor-none select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        setCursor({ x: e.clientX, y: e.clientY });
      }}
      style={{ filter: "blur(6px)", pointerEvents: "auto" }}
    >
      {children}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed z-[999] flex items-center justify-center rounded-full bg-[#0A192F] text-white"
            style={{
              width: 96,
              height: 96,
              position: "fixed",
              left: cursor.x,
              top: cursor.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] leading-tight text-center px-2">
              Coming<br />Soon
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function OrigamiCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-15%" });

  return (
    <div
      className="w-full min-h-screen relative overflow-x-hidden"
      style={{ backgroundColor: P.bg, color: P.ink }}
    >
      {/* Global paper grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.028,
          mixBlendMode: "multiply",
        }}
      />

      <style>{`::selection { background: ${P.accent}; color: #fff; }`}</style>

      <div className="relative z-[2]">
        <Navbar />

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative w-full pt-[72px] md:pt-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
          >
            <video
              src="/videos/origami_hero.mov?v=2"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto block"
              style={{ filter: "sepia(0.06) brightness(0.98)" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent 60%, rgba(245,240,232,0.6) 100%)",
              }}
            />
          </motion.div>
        </section>

        {/* ── Overview ───────────────────────────────────────────── */}
        <section className="relative pt-24 md:pt-32 pb-24 px-6 sm:px-12 md:px-24 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-serif leading-[0.88] tracking-tighter mb-6"
              style={{ fontSize: "clamp(4rem, 10vw, 8rem)", color: P.ink }}
            >
              Origami<br />
              <span className="font-display italic" style={{ color: P.accent }}>
                Robotics
              </span>
            </h1>
          </motion.div>

          <AnimRule delay={0.2} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mt-16 md:mt-24">
            {/* Metadata */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-8 text-sm font-sans">
              {meta.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <h4
                    className="text-[10px] uppercase tracking-[0.22em] mb-2"
                    style={{ color: P.accent }}
                  >
                    {item.label}
                  </h4>
                  <p className="whitespace-pre-line leading-relaxed" style={{ color: P.body }}>
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Overview text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="lg:col-span-8 lg:col-start-6 flex flex-col justify-start"
            >
              <p
                className="font-display italic leading-tight mb-8"
                style={{ fontSize: "clamp(1.35rem, 2.8vw, 2.25rem)", color: P.ink }}
              >
                Designing the onboarding flow, SDK playground, and brand identity for a YC-backed robotics startup — in ten weeks.
              </p>

              <div
                className="font-sans leading-relaxed max-w-2xl text-base md:text-lg flex flex-col gap-6 font-light"
                style={{ color: P.body }}
              >
                <p>
                  Origami Robotics (YC W26) builds sophisticated robotic hardware for precise manipulation — a product that is technically complex, combining both hardware and software. A team of four UX designers partnered with the founders across a 10-week sprint to improve the end-to-end experience for new external users.
                </p>
                <p>
                  We delivered two core products: an onboarding wizard to guide users from unboxing to a working setup, and an SDK playground for exploring and controlling the robotic hand. My focus was persona development, branding direction, and playground UX.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── The Challenge ───────────────────────────────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{ borderTop: `0.5px solid ${P.rule}` }}
        >
          <PaperGrain opacity={0.018} />
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 relative z-10">
            <motion.div
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>The Challenge</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <h2
                  className="font-serif text-3xl md:text-4xl leading-tight tracking-tight"
                  style={{ color: P.ink }}
                >
                  A technically complex<br />
                  <span className="font-display italic" style={{ color: P.accent }}>product...</span>
                </h2>
                <p className="font-sans text-base leading-relaxed font-light self-end" style={{ color: P.body }}>
                  For users who may not be experts.
                </p>
              </div>
            </motion.div>

            <AnimRule />

            {/* current.png — full width */}
            <motion.div
              className="mt-14 overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ border: `0.5px solid ${P.rule}` }}
            >
              <img src="/images/current.png" alt="Current state" className="w-full h-auto block" />
            </motion.div>

            {/* confuse.png + hard.png — two columns */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { src: "/images/confuse.png", alt: "Confusing experience" },
                { src: "/images/hard.png",   alt: "Hard to navigate" },
              ].map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                  style={{ border: `0.5px solid ${P.rule}` }}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-auto block" />
                </motion.div>
              ))}
            </div>

            {/* Closing text */}
            <motion.p
              className="mt-12 font-sans text-base md:text-lg leading-relaxed font-light max-w-2xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: P.body }}
            >
              The people building it are deep experts. The people who would use it — researchers, mechanical engineers, eventually factory workers — are not. That gap was the design challenge.
            </motion.p>

            {/* ori_context video */}
            <motion.div
              className="mt-6 overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ border: `0.5px solid ${P.rule}`, background: P.surface }}
            >
              <PaperGrain opacity={0.016} />
              <video
                src="/videos/ori_context.mov"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block relative z-10"
              />
            </motion.div>
          </div>
        </section>

        {/* ── HMW + Timeline ──────────────────────────────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{ backgroundColor: P.surface, borderTop: `0.5px solid ${P.rule}` }}
        >
          <PaperGrain opacity={0.022} />
          <GridLines />
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 relative z-10">

            {/* HMW question */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-24 md:mb-32"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] mb-6 block" style={{ color: P.accent }}>
                Design Question
              </span>
              <h2
                className="font-serif leading-tight mx-auto max-w-3xl"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: P.ink }}
              >
                How might we improve the{" "}
                <span className="font-display italic" style={{ color: P.accent }}>end-to-end experience</span>{" "}
                for new users?
              </h2>
            </motion.div>

            {/* Timeline */}
            <div ref={timelineRef} className="relative">
              {/* Upper labels */}
              <div className="flex" style={{ marginBottom: 12 }}>
                {timelineNodes.map((node, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    {node.above && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 + i * 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center flex flex-col gap-1.5"
                      >
                        <span className="font-serif italic leading-tight" style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)", color: P.ink }}>
                          {node.phase}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          {node.items.map((item) => (
                            <span key={item} className="font-sans leading-snug" style={{ fontSize: "clamp(0.6rem, 1vw, 0.7rem)", color: P.body }}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* Line + nodes */}
              <div className="relative flex items-center" style={{ height: 40 }}>
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-px origin-left"
                  style={{ backgroundColor: P.ink, width: "100%" }}
                  initial={{ scaleX: 0 }}
                  animate={timelineInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                />
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={timelineInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.7, duration: 0.3 }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10"><polygon points="0,0 10,5 0,10" fill={P.ink} /></svg>
                </motion.div>
                {timelineNodes.map((node, i) => (
                  <div key={i} className="flex-1 flex justify-center relative z-10">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={timelineInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="w-2.5 h-2.5 rounded-full border"
                      style={{ backgroundColor: P.bg, borderColor: P.ink, borderWidth: 1.5 }}
                    />
                  </div>
                ))}
              </div>

              {/* Week labels */}
              <div className="flex mt-2">
                {timelineNodes.map((node, i) => (
                  <div key={i} className="flex-1 flex justify-center">
                    <motion.span
                      className="font-sans text-center"
                      style={{ fontSize: "clamp(0.55rem, 0.9vw, 0.65rem)", color: P.dim }}
                      initial={{ opacity: 0 }}
                      animate={timelineInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.28 }}
                    >
                      {node.week}
                    </motion.span>
                  </div>
                ))}
              </div>

              {/* Lower labels */}
              <div className="flex mt-3">
                {timelineNodes.map((node, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    {!node.above && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 + i * 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center flex flex-col gap-1.5"
                      >
                        <span className="font-serif italic leading-tight" style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)", color: P.ink }}>
                          {node.phase}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          {node.items.map((item) => (
                            <span key={item} className="font-sans leading-snug" style={{ fontSize: "clamp(0.6rem, 1vw, 0.7rem)", color: P.body }}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── Defining Scope ───────────────────────────────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{ borderTop: `0.5px solid ${P.rule}` }}
        >
          <PaperGrain opacity={0.018} />
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 relative z-10">
            <motion.div
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Defining Scope</SectionLabel>
              <h2
                className="font-serif text-3xl md:text-4xl leading-tight tracking-tight mt-4"
                style={{ color: P.ink }}
              >
                We mapped two clear<br />
                <span className="font-display italic" style={{ color: P.accent }}>touchpoints.</span>
              </h2>

              {/* Touchpoint pills */}
              <motion.div
                className="flex flex-wrap justify-center gap-8 mt-12"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {["Onboarding process", "Playground/SDK"].map((label) => (
                  <span
                    key={label}
                    className="font-mono px-8 py-4 rounded-full border text-base md:text-lg"
                    style={{ borderColor: P.ink, color: P.ink, letterSpacing: "0.01em" }}
                  >
                    {label}
                  </span>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* ── Solution Overview ───────────────────────────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{ borderTop: `0.5px solid ${P.rule}` }}
        >
          <PaperGrain opacity={0.018} />
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 relative z-10">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Solution Overview</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <h2
                  className="font-serif text-3xl md:text-4xl leading-tight tracking-tight"
                  style={{ color: P.ink }}
                >
                  Three deliverables.<br />
                  <span className="font-display italic" style={{ color: P.accent }}>One cohesive system.</span>
                </h2>
                <p className="font-sans text-base leading-relaxed font-light" style={{ color: P.body }}>
                  Before going into the details of each deliverable, here's the full picture. We designed an onboarding flow, a playground, and a unified brand — each addressing a different moment in the new user's journey.
                </p>
              </div>
            </motion.div>

            <AnimRule />

            <div className="mt-14 flex flex-col gap-24">

              {/* 01 — Onboarding Flow: Z-pattern */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-px" style={{ backgroundColor: `rgba(140,123,98,0.4)` }} />
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>01</span>
                </div>
                <h4 className="font-serif leading-tight mb-10" style={{ fontSize: "28px", color: P.ink }}>Onboarding Flow</h4>

                <div className="flex flex-col gap-16 md:gap-20">
                  {[
                    { step: "Setup",     desc: "Introduce the setup wizard and guide users into the onboarding flow.",                                  img: "/images/setup.png" },
                    { step: "Prepare",   desc: "Guide users through connecting the hardware and software to get the system ready for use.",             img: "/images/prepare.png" },
                    { step: "Run",       desc: "Run automated diagnostics to check that the system is functioning properly in the background.",         img: "/images/run.png" },
                    { step: "Calibrate", desc: "Help users configure joint angles and align the hand for accurate movement.",                           img: "/images/calibrate.png" },
                    { step: "Done",      desc: "Provide a setup summary and transition users into the SDK to begin interacting with the hand.",         img: "/images/done.png" },
                  ].map(({ step, desc, img }, i) => (
                    <motion.div
                      key={step}
                      className={`flex flex-col md:flex-row items-center gap-10 md:gap-14 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="w-full md:w-[60%] flex-shrink-0 rounded-[1.5rem] overflow-hidden bg-[#f0f0f5]">
                        <img src={img} alt={step} className="w-full h-full object-cover" draggable={false} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-sans text-sm leading-relaxed font-light max-w-xs" style={{ color: P.body }}>{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 02 — SDK Playground */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row-reverse items-start gap-10 lg:gap-14"
              >
                <div className="w-full lg:w-[30%] flex flex-col gap-4 lg:sticky lg:top-32 lg:pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px" style={{ backgroundColor: `rgba(140,123,98,0.4)` }} />
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>02</span>
                  </div>
                  <h4 className="font-serif leading-tight" style={{ fontSize: "28px", color: P.ink }}>SDK Playground</h4>
                  <p className="font-sans leading-relaxed text-base font-light" style={{ color: P.body }}>
                    A live, interactive control interface for exploring and manipulating the robotic hand. Designed to feel familiar to users of tools like Blender or After Effects.
                  </p>
                </div>
                <div className="w-full lg:w-[70%]" style={{ background: P.surface }}>
                  <video
                    src="/videos/playground.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full block"
                  />
                </div>
              </motion.div>

              {/* 03 — Branding */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-px" style={{ backgroundColor: `rgba(140,123,98,0.4)` }} />
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>03</span>
                </div>
                <h4 className="font-serif leading-tight mb-4" style={{ fontSize: "28px", color: P.ink }}>Branding</h4>
                <p className="font-serif text-2xl md:text-3xl leading-snug mb-12" style={{ color: P.ink }}>
                  Now how do we attract these new users?
                </p>

                <div className="flex flex-col gap-16 md:gap-20">
                  {[
                    {
                      desc: "Ivory creates a sense of tranquility and calmness. Ink Blue represents futurism and builds trust.",
                      media: <img src="/images/color.png" alt="Color palette" className="w-full block" draggable={false} />,
                    },
                    {
                      desc: "All of these explorations were compiled into a cohesive brand book, which helped inform our visual strategy, storytelling, and AI prompting for the final brand assets.",
                      media: <img src="/images/brandbook.png" alt="Brand book" className="w-full block" draggable={false} />,
                    },
                  ].map(({ desc, media }, i) => (
                    <motion.div
                      key={i}
                      className={`flex flex-col md:flex-row items-center gap-10 md:gap-14 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex-shrink-0 w-full md:w-[60%]">
                        {media}
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-sans text-sm leading-relaxed font-light max-w-xs" style={{ color: P.body }}>{desc}</p>
                      </div>
                    </motion.div>
                  ))}

                  {/* newweb.mov — full width with centered caption */}
                  <motion.div
                    className="flex flex-col items-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-sans text-sm leading-relaxed font-light text-center" style={{ color: P.body }}>
                      This also informed a new coded landing page prototype for Origami Robotics.
                    </p>
                    <video src="/videos/newweb.mov" autoPlay loop muted playsInline className="w-full block" />
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Design Process ───────────────────────────────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{ backgroundColor: P.surface, borderTop: `0.5px solid ${P.rule}` }}
        >
          <PaperGrain opacity={0.018} />
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 relative z-10">

            {/* Section intro */}
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Design Process</SectionLabel>
              <h2
                className="font-serif leading-tight mt-4"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: P.ink }}
              >
                Three explorations.<br />
                <span className="font-display italic" style={{ color: P.accent }}>One evolving system.</span>
              </h2>
            </motion.div>

            {/* Page 1 — Dashboard Exploration */}
            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-16 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:w-1/2 flex flex-col gap-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>01</span>
                <h3 className="font-serif leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: P.ink }}>
                  Dashboard Exploration
                </h3>
                <p className="font-display italic text-lg" style={{ color: P.accent }}>Understanding what works.</p>
              </div>
              <div className="md:w-1/2 flex items-center">
                <p className="font-sans text-sm leading-relaxed font-light" style={{ color: P.body }}>
                  We studied existing systems, mapped patterns, and identified what supports clarity, control, and usability.
                </p>
              </div>
            </motion.div>

            {/* Research image */}
            <motion.div
              className="mt-10 mb-16"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src="/images/research.png" alt="Research" className="w-full block" draggable={false} />
            </motion.div>

            {/* Axis labels */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="flex justify-between mb-2 px-14">
                <span className="font-sans text-[9px] uppercase tracking-[0.28em]" style={{ color: P.dim }}>Live Monitoring</span>
                <span className="font-sans text-[9px] uppercase tracking-[0.28em]" style={{ color: P.dim }}>Post-run Diagnosis</span>
              </div>
              <div className="h-px mx-14 mb-1" style={{ backgroundColor: P.rule }} />

              <div className="relative flex gap-0" style={{ minHeight: 520 }}>
                <div className="relative flex-shrink-0 w-14 flex flex-col justify-between items-center py-4">
                  <span
                    className="font-sans text-[9px] uppercase tracking-[0.28em]"
                    style={{ color: P.dim, writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "nowrap" }}
                  >
                    General-purpose
                  </span>
                  <span
                    className="font-sans text-[9px] uppercase tracking-[0.28em]"
                    style={{ color: P.dim, writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "nowrap" }}
                  >
                    Robotics-specific
                  </span>
                  <div className="absolute right-0 top-0 bottom-0 w-px" style={{ backgroundColor: P.rule }} />
                </div>

                <div className="relative flex-1">
                  <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.35 }}>
                    <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: P.rule }} />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: P.rule }} />
                  </div>

                  {[
                    {
                      name: "Datadog",
                      left: "3%", top: "3%",
                      tags: [
                        { label: "Monitoring", color: "#3C3489", bg: "#EEEDFE" },
                        { label: "Logs", color: "#3C3489", bg: "#EEEDFE" },
                        { label: "Error tracking", color: "#3C3489", bg: "#EEEDFE" },
                      ],
                      takeaway: "Best-in-class composable dashboards; no domain-specific robotics support.",
                    },
                    {
                      name: "Scale AI",
                      left: "60%", top: "3%",
                      tags: [
                        { label: "Review flow", color: "#633806", bg: "#FAEEDA" },
                        { label: "Model monitoring", color: "#633806", bg: "#FAEEDA" },
                        { label: "Data ops", color: "#633806", bg: "#FAEEDA" },
                      ],
                      takeaway: "Review-centric workflows for evaluating model outputs at scale.",
                    },
                    {
                      name: "Roboflow",
                      left: "64%", top: "18%",
                      tags: [
                        { label: "Labeling", color: "#27500A", bg: "#EAF3DE" },
                        { label: "Dataset workflow", color: "#27500A", bg: "#EAF3DE" },
                        { label: "AI-assisted", color: "#27500A", bg: "#EAF3DE" },
                      ],
                      takeaway: "Tight dataset iteration loop with inline AI assist for annotation.",
                    },
                    {
                      name: "Foxglove",
                      left: "8%", top: "52%",
                      tags: [
                        { label: "Robotics data", color: "#085041", bg: "#E1F5EE" },
                        { label: "Playback", color: "#085041", bg: "#E1F5EE" },
                        { label: "Multi-panel", color: "#085041", bg: "#E1F5EE" },
                      ],
                      takeaway: "Multi-panel workspace for live and recorded robotics data streams.",
                    },
                    {
                      name: "Intrinsic AI",
                      left: "36%", top: "46%",
                      tags: [
                        { label: "Workflow", color: "#712B13", bg: "#FAECE7" },
                        { label: "Task execution", color: "#712B13", bg: "#FAECE7" },
                        { label: "Orchestration", color: "#712B13", bg: "#FAECE7" },
                      ],
                      takeaway: "Workflow-first orchestration layer for programming industrial robots.",
                    },
                    {
                      name: "Webviz",
                      left: "12%", top: "66%",
                      tags: [
                        { label: "ROS data", color: "#0C447C", bg: "#E6F1FB" },
                        { label: "Multi-panel", color: "#0C447C", bg: "#E6F1FB" },
                        { label: "Camera feeds", color: "#0C447C", bg: "#E6F1FB" },
                      ],
                      takeaway: "Browser-native ROS visualization with flexible panel composition.",
                    },
                    {
                      name: "Rerun.io",
                      left: "56%", top: "62%",
                      tags: [
                        { label: "Replay", color: "#72243E", bg: "#FBEAF0" },
                        { label: "Timeline", color: "#72243E", bg: "#FBEAF0" },
                        { label: "Debugging", color: "#72243E", bg: "#FBEAF0" },
                      ],
                      takeaway: "Timeline-driven replay combining spatial, tabular, and log data.",
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={card.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute"
                      style={{
                        left: card.left,
                        top: card.top,
                        width: 158,
                        zIndex: hoveredCard === card.name ? 100 : 1,
                      }}
                      onMouseEnter={() => setHoveredCard(card.name)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div
                        className="p-3 flex flex-col gap-2 transition-shadow duration-200"
                        style={{
                          background: "#FDFAF5",
                          border: `0.5px solid ${P.rule}`,
                          borderRadius: 10,
                          boxShadow: hoveredCard === card.name
                            ? "0 8px 24px rgba(42,38,32,0.13)"
                            : "none",
                        }}
                      >
                        <span className="font-sans text-[12px] font-semibold" style={{ color: P.ink }}>{card.name}</span>
                        <div className="flex flex-wrap gap-1">
                          {card.tags.map(t => (
                            <span
                              key={t.label}
                              className="font-sans text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                              style={{ color: t.color, backgroundColor: t.bg, whiteSpace: "nowrap" }}
                            >
                              {t.label}
                            </span>
                          ))}
                        </div>
                        <p className="font-sans text-[10.5px] leading-relaxed" style={{ color: P.body }}>{card.takeaway}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Synthesis strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16"
              style={{ borderTop: `0.5px solid ${P.rule}`, paddingTop: "2rem" }}
            >
              <p
                className="font-sans text-[10px] uppercase tracking-[0.28em] mb-6"
                style={{ color: P.dim }}
              >
                Key patterns for Origami Robotics
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { n: "01", text: "Keep related views visible side by side" },
                  { n: "02", text: "Support replay and timeline inspection" },
                  { n: "03", text: "Reduce context switching across tools" },
                  { n: "04", text: "Make failures easier to interpret visually" },
                  { n: "05", text: "Connect monitoring with iteration loops" },
                ].map(item => (
                  <div
                    key={item.n}
                    className="p-3 flex flex-col gap-1.5"
                    style={{
                      background: "#FDFAF5",
                      border: `0.5px solid ${P.rule}`,
                      borderRadius: 8,
                    }}
                  >
                    <span className="font-sans text-[9px] font-bold tracking-[0.06em]" style={{ color: P.rule.replace("C8", "A9") }}>{item.n}</span>
                    <p className="font-sans text-[10.5px] leading-relaxed" style={{ color: P.body }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Page 2 — Competitive Analysis */}
            <AnimRule />
            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-16 mt-16 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:w-1/2 flex flex-col gap-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>Competitive Analysis</span>
                <h3 className="font-serif leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: P.ink }}>
                  Patterns we observed.
                </h3>
                <p className="font-display italic text-lg" style={{ color: P.accent }}>What works. What breaks.</p>
              </div>
              <div className="md:w-1/2 flex items-center" />
            </motion.div>
            <motion.img
              src="/images/Frame 2147237188.png"
              alt="Competitive analysis"
              className="w-full block"
              draggable={false}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Page 3 — Workflow */}
            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-16 mt-16 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:w-1/3 flex items-center" />
              <div className="md:w-2/3 flex flex-col gap-2 md:text-right">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>Workflow Mapping</span>
                <h3 className="font-serif leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: P.ink }}>
                  Breaking down the system.
                </h3>
                <p className="font-display italic text-lg" style={{ color: P.accent }}>From signals to actions.</p>
              </div>
            </motion.div>
            <motion.img
              src="/images/image 2065419444.png"
              alt="Workflow mapping"
              className="w-full block"
              draggable={false}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Page 4 — Interface Study */}
            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-16 mt-16 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:w-1/2 flex flex-col gap-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>Interface Study</span>
                <h3 className="font-serif leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: P.ink }}>
                  Borrowing familiar patterns.
                </h3>
                <p className="font-display italic text-lg" style={{ color: P.accent }}>Sidebar. Canvas. Inspector.</p>
              </div>
              <div className="md:w-1/2 flex items-center" />
            </motion.div>
            <div
              className="flex justify-end overflow-visible"
              style={{ marginRight: 'calc(-6rem - max(0px, (100vw - 1200px) / 2))' }}
            >
              <div className="flex flex-col items-center" style={{ width: '72vw', maxWidth: 'none' }}>
                <motion.img
                  src="/images/Frame 2147237191.png"
                  alt="Interface study reference A"
                  className="block w-full"
                  draggable={false}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Vertical connector */}
                <div className="relative w-full flex justify-center py-8">
                  <div style={{ width: '1px', height: '100%', position: 'absolute', top: 0, bottom: 0, background: P.rule }} />
                </div>
                <motion.img
                  src="/images/Frame 2147237190.png"
                  alt="Borrowing familiar patterns"
                  className="block w-full"
                  draggable={false}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            {/* Page 5 — Interaction References */}
            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-16 mt-16 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:w-2/3 flex flex-col gap-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>Interaction References</span>
                <h3 className="font-serif leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: P.ink }}>
                  From inspiration to adaptation.
                </h3>
                <p className="font-sans text-base leading-relaxed mt-2" style={{ color: P.body }}>Rather than using a fixed linear flow, we used a vertical sidebar to make progress visible, support step-by-step guidance, and allow the onboarding flow to scale as the system grows.</p>
              </div>
              <div className="md:w-1/3 flex items-center" />
            </motion.div>
            <motion.img
              src="/images/Frame 2147237192.png"
              alt="From inspiration to adaptation"
              className="w-full block"
              draggable={false}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Page 6 — AI in Process */}
            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-16 mt-16 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:w-1/3 flex items-center" />
              <div className="md:w-2/3 flex flex-col gap-2 md:text-right">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>AI in Process</span>
                <h3 className="font-serif leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: P.ink }}>
                  Iterating through prompts.
                </h3>
                <p className="font-sans text-base leading-relaxed mt-2" style={{ color: P.body }}>It was a useful tool for generating ideas around error states, low-fi designs, and messaging, which allowed us to explore a wide variety of options before converging on the best-fit solution.</p>
              </div>
            </motion.div>
            <div style={{
              marginLeft: 'calc(-6rem - max(0px, (100vw - 1200px) / 2))',
              marginRight: 'calc(-6rem - max(0px, (100vw - 1200px) / 2))',
              overflow: 'hidden',
            }}>
              <motion.img
                src="/images/Frame 2147237193.png"
                alt="Iterating through prompts"
                className="w-full block"
                draggable={false}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

          </div>
        </section>


        {/* ── Playground ──────────────────────────────────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{ backgroundColor: P.surface, borderTop: `0.5px solid ${P.rule}` }}
        >
          <PaperGrain opacity={0.022} />
          <GridLines />
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 relative z-10">

            {/* Page 1 — Playground intro */}
            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-16 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:w-1/2 flex flex-col gap-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>02</span>
                <h3 className="font-serif leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: P.ink }}>
                  Playground Design
                </h3>
                <p className="font-display italic text-lg" style={{ color: P.accent }}>Designing live interaction.</p>
              </div>
              <div className="md:w-1/2 flex items-center">
                <p className="font-sans text-sm leading-relaxed font-light" style={{ color: P.body }}>
                  We translated research into an interactive control model, balancing precision, flexibility, and ease of use.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <video src="/videos/inter.mov" autoPlay loop muted playsInline className="w-full block" />
            </motion.div>

            {/* Page 2 — Layout Model (LEFT) */}
            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-16 mt-16 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:w-1/2 flex flex-col gap-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>Layout Model</span>
                <h3 className="font-serif leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: P.ink }}>A familiar structure.</h3>
                <p className="font-display italic text-lg" style={{ color: P.accent }}>Sidebar. Canvas. Inspector.</p>
              </div>
              <div className="md:w-1/2 flex items-center" />
            </motion.div>

            <motion.div
              className="flex flex-col items-center w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ visible: { transition: { staggerChildren: 0.4 } } }}
            >
              {/* Image 1 */}
              <motion.img
                src="/images/image 2065419405.png"
                alt="Layout model"
                className="w-full block"
                draggable={false}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              />
              {/* Connector line 1 */}
              <motion.div
                style={{ width: '1px', height: '48px', background: P.rule, transformOrigin: 'top' }}
                variants={{
                  hidden: { scaleY: 0 },
                  visible: { scaleY: 1, transition: { duration: 0.4, ease: "easeInOut" } }
                }}
              />
              {/* Image 2 */}
              <motion.img
                src="/images/image 13.png"
                alt="Layout model detail"
                className="w-full block"
                draggable={false}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              />
              {/* Connector line 2 */}
              <motion.div
                style={{ width: '1px', height: '48px', background: P.rule, transformOrigin: 'top' }}
                variants={{
                  hidden: { scaleY: 0 },
                  visible: { scaleY: 1, transition: { duration: 0.4, ease: "easeInOut" } }
                }}
              />
              {/* Image 3 */}
              <motion.img
                src="/images/Frame 2147237194.png"
                alt="Layout model final"
                className="w-full block"
                draggable={false}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              />
            </motion.div>

            {/* Page 3 — Hand Manipulation (RIGHT) */}
            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-16 mt-16 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:w-1/2 flex items-center" />
              <div className="md:w-1/2 flex flex-col gap-2 md:text-right">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>Direct Control</span>
                <h3 className="font-serif leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: P.ink }}>Manipulating the hand.</h3>
                <p className="font-display italic text-lg" style={{ color: P.accent }}>From joints to gestures.</p>
              </div>
            </motion.div>

            <motion.img
              src="/images/Frame 2147237195.png"
              alt="Manipulating the hand"
              className="w-full block"
              draggable={false}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Page 4 — Input Models (LEFT) */}
            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-16 mt-16 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:w-2/3 flex flex-col gap-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>Input Models</span>
                <h3 className="font-serif leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: P.ink }}>Multiple ways to interact.</h3>
                <p className="font-sans text-base leading-relaxed mt-2" style={{ color: P.body }}>Is manual control too slow? Founder feedback and five usability tests revealed the need for faster, more intuitive interaction.</p>
              </div>
              <div className="md:w-1/3 flex items-center" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <video src="/videos/contro_1.mov" autoPlay loop muted playsInline className="w-full block" style={{ border: 'none', outline: 'none' }} />
            </motion.div>

            <motion.div
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mt-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="flex-shrink-0 w-full md:w-[38%]"
                style={{ marginLeft: 'calc(-6rem - max(0px, (100vw - 1200px) / 2))' }}
              >
                <img src="/images/keyboard controls.png" alt="Keyboard controls" className="block" style={{ width: '70%' }} draggable={false} />
              </div>
              <p className="font-sans text-base leading-relaxed md:w-[62%]" style={{ color: P.body }}>
                We design use keyboard shortcuts to select fingers and joints for faster, more efficient control.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 mt-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-sans text-base leading-relaxed md:w-[62%]" style={{ color: P.body }}>
                Not immediately intuitive? We designed a manual to make the controls learnable and discoverable.
              </p>
              <div
                className="flex-shrink-0 w-full md:w-[55%] flex justify-end"
                style={{ marginRight: 'calc(-6rem - max(0px, (100vw - 1200px) / 2))' }}
              >
                <img src="/images/Frame.png" alt="Controls manual" className="block" style={{ width: '100%' }} draggable={false} />
              </div>
            </motion.div>

            {/* Page 5 — Presets (RIGHT) */}
            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-16 mt-16 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:w-1/2 flex items-center" />
              <div className="md:w-1/2 flex flex-col gap-2 md:text-right">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>Preset System</span>
                <h3 className="font-serif leading-tight whitespace-nowrap" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: P.ink }}>Reusable hand positions.</h3>
                <p className="font-display italic text-lg" style={{ color: P.accent }}>From common poses to custom grips.</p>
              </div>
            </motion.div>

            {/* Preset — preset.mov left-bleed, text right */}
            <motion.div
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mt-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="flex-shrink-0 w-full md:w-[67%]"
                style={{ marginLeft: 'calc(-6rem - max(0px, (100vw - 1200px) / 2))' }}
              >
                <video src="/videos/preset.mov" autoPlay loop muted playsInline className="w-full block" style={{ border: 'none', outline: 'none' }} />
              </div>
              <div className="flex flex-col gap-2 md:w-[33%]">
                <p className="font-sans text-base font-medium leading-snug" style={{ color: P.ink }}>Repeated task? Save the pose.</p>
                <p className="font-sans text-base leading-relaxed" style={{ color: P.body }}>Custom presets let users store and reuse specific grip configurations.</p>
              </div>
            </motion.div>

            {/* Preset — preset_1.mov right-bleed, text left */}
            <motion.div
              className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 mt-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginRight: 'calc(-6rem - max(0px, (100vw - 1200px) / 2))' }}
            >
              <p className="flex-shrink-0 font-sans text-base leading-relaxed md:w-[33%]" style={{ color: P.body }}>
                …now you can return to complex hand positions without rebuilding them.
              </p>
              <video src="/videos/preset_1.mov" autoPlay loop muted playsInline className="flex-1 min-w-0 block" style={{ border: 'none', outline: 'none' }} />
            </motion.div>

            {/* Page 6 — Sequences (LEFT) */}
            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-16 mt-16 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:w-1/2 flex flex-col gap-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>Precision Controls</span>
                <h3 className="font-serif leading-tight whitespace-nowrap" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: P.ink }}>Fine-tuning movement.</h3>
                <p className="font-display italic text-lg" style={{ color: P.accent }}>Control at the joint level.</p>
              </div>
              <div className="md:w-1/2 flex items-center" />
            </motion.div>

            {/* angle.mov — full width below Precision Controls */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <video src="/videos/angle.mov" autoPlay loop muted playsInline className="w-full block" style={{ border: 'none', outline: 'none' }} />
            </motion.div>

            {/* Page 7 — Interface Simplification (RIGHT) */}
            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-16 mt-16 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:w-1/2 flex items-center" />
              <div className="md:w-1/2 flex flex-col gap-2 md:text-right">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>Interface Simplification</span>
                <h3 className="font-serif leading-tight whitespace-nowrap" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: P.ink }}>Reducing cognitive load.</h3>
                <p className="font-display italic text-lg" style={{ color: P.accent }}>Complexity made approachable.</p>
              </div>
            </motion.div>

            {/* ref.mov — full width below Interface Simplification */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <video src="/videos/ref.mov" autoPlay loop muted playsInline className="w-full block" style={{ border: 'none', outline: 'none' }} />
            </motion.div>

          </div>
        </section>

        {/* ── Branding ────────────────────────────────────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{ borderTop: `0.5px solid ${P.rule}` }}
        >
          <PaperGrain opacity={0.018} />
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 relative z-10">
            <motion.div
              className="mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Branding</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <h2
                  className="font-serif text-3xl md:text-4xl leading-tight tracking-tight"
                  style={{ color: P.ink }}
                >
                  Balancing warmth<br />
                  <span className="font-display italic" style={{ color: P.accent }}>with precision</span>
                </h2>
                <div className="flex flex-col gap-4">
                  <p className="font-sans text-sm leading-relaxed font-light" style={{ color: P.body }}>
                    We explored four directions: (1) Organic, soft, and calm — friendly but simple; (2) Futuristic yet present — popular among established hardware companies; (3) Precise and modular — with an academic, research-lab feel; (4) Warm and retro — approachable, almost domestic.
                  </p>
                  <p className="font-sans text-sm leading-relaxed font-light" style={{ color: P.body }}>
                    After discussing with the founders, we landed on a balance between organic/warm and precise/academic. Origami folding is playful and tactile by nature — that warmth felt right. But the primary users are researchers, so credibility couldn't be sacrificed. The final color palette anchors around ivory as a base: tranquil and calm, but grounded.
                  </p>
                </div>
              </div>
            </motion.div>

            <AnimRule />

            <div className="mt-14 flex flex-col gap-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] block mb-5" style={{ color: P.dim }}>
                  Direction exploration
                </span>
                <ImgPlaceholder label="IMAGE: 4 branding direction moodboards side by side" aspect="aspect-[16/7]" />
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { sublabel: "Final color palette", label: "IMAGE: Final color palette" },
                  { sublabel: "Brand book", label: "IMAGE: Brand book / style guide spread" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-sans text-[9px] uppercase tracking-[0.3em] block mb-3" style={{ color: P.dim }}>
                      {item.sublabel}
                    </span>
                    <ImgPlaceholder label={item.label} aspect="aspect-[4/3]" />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] block mb-3" style={{ color: P.dim }}>
                  Coded landing page
                </span>
                <ImgPlaceholder label="IMAGE: Landing page coded prototype screenshot" aspect="aspect-[16/9]" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── AI in Workflow ──────────────────────────────────────── */}
        <section
          className="py-32 relative overflow-hidden"
          style={{
            backgroundColor: P.surface,
            borderTop: `0.5px solid ${P.rule}`,
            borderBottom: `0.5px solid ${P.rule}`,
          }}
        >
          <PaperGrain opacity={0.022} />
          <GridLines />
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-14"
            >
              <SectionLabel>AI in Workflow</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <h2
                  className="font-serif text-3xl md:text-4xl leading-tight tracking-tight"
                  style={{ color: P.ink }}
                >
                  Tools that augment craft.<br />
                  <span className="font-display italic" style={{ color: P.accent }}>Not replace it.</span>
                </h2>
                <p className="font-sans text-sm leading-relaxed font-light" style={{ color: P.body }}>
                  AI was integrated into our process in three meaningful ways — not as decoration, but as something that changed how we worked.
                </p>
              </div>
            </motion.div>

            <AnimRule />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  n: "01",
                  title: "Faster iteration",
                  body: "We explored more visual directions and concepts in a short amount of time than a traditional workflow would have allowed. More options meant better decisions.",
                },
                {
                  n: "02",
                  title: "Ideas made interactive",
                  body: "For a product centered on a robotic hand, static mockups weren't enough. AI helped us build prototypes where actions had reactions — letting everyone feel how the design worked, in real time.",
                },
                {
                  n: "03",
                  title: "Better feedback earlier",
                  body: "Interactive prototypes shortened the feedback loop. Less time spent discussing abstract ideas. More time reacting to something real and iterating on what we learned.",
                },
              ].map((item) => (
                <motion.div
                  key={item.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4 p-6"
                  style={{ background: "#FDFAF5", border: `0.5px solid ${P.rule}`, borderRadius: 10 }}
                >
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: P.accent }}>{item.n}</span>
                  <h4 className="font-serif text-lg leading-snug" style={{ color: P.ink }}>{item.title}</h4>
                  <p className="font-sans text-sm leading-relaxed font-light" style={{ color: P.body }}>{item.body}</p>
                </motion.div>
              ))}
            </div>

            {/* Pullquote */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 text-center"
            >
              <p
                className="font-display italic leading-tight"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: P.ink }}
              >
                "AI gave us options. But not decisions."
              </p>
              <p className="font-sans text-sm mt-4 font-light" style={{ color: P.dim }}>
                Tools can augment taste. They don't replace it. Strong design judgment is still what separates good from great.
              </p>
            </motion.div>

            <motion.div
              className="mt-14"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <ImgPlaceholder label="IMAGE: Side-by-side — AI-generated options vs final chosen direction" aspect="aspect-[16/7]" />
            </motion.div>
          </div>
        </section>

        {/* ── Why This Succeeded ──────────────────────────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{ borderTop: `0.5px solid ${P.rule}` }}
        >
          <PaperGrain opacity={0.018} />
          <div className="px-6 sm:px-12 md:px-24 max-w-[900px] mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Why This Succeeded</SectionLabel>
              <h2
                className="font-serif leading-tight mt-8 mb-8"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: P.ink }}
              >
                We designed the{" "}
                <span className="font-display italic" style={{ color: P.accent }}>right things</span>
                , not just better versions of what existed.
              </h2>
              <p className="font-sans text-base md:text-lg leading-relaxed font-light" style={{ color: P.body }}>
                The project succeeded because we resisted the instinct to simply redesign the existing dashboard. Instead, we stepped back and mapped the full user journey first — which led us to identify the two touchpoints that actually mattered most to new users: getting set up, and being able to explore what the hand can do.
              </p>
              <p className="font-sans text-base md:text-lg leading-relaxed font-light mt-6" style={{ color: P.body }}>
                The combination of a structured onboarding flow, an intuitive playground, and a cohesive brand gave Origami Robotics a complete end-to-end experience for new external users for the first time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Reflection & Next Steps ─────────────────────────────── */}
        <section
          className="py-28 md:py-36 relative overflow-hidden"
          style={{
            backgroundColor: P.surface,
            borderTop: `0.5px solid ${P.rule}`,
          }}
        >
          <PaperGrain opacity={0.022} />
          <GridLines />
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
              <motion.div
                className="md:col-span-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <SectionLabel>Reflection & Next Steps</SectionLabel>
                <h2
                  className="font-serif text-3xl md:text-4xl tracking-tight leading-tight mt-4"
                  style={{ color: P.ink }}
                >
                  What we<br />
                  <span className="font-display italic" style={{ color: P.accent }}>
                    learned
                  </span>
                </h2>
              </motion.div>

              <div className="md:col-span-8 flex flex-col gap-10">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-6 pb-2"
                  style={{ borderTop: `0.5px solid ${P.rule}` }}
                >
                  <span
                    className="font-sans text-[10px] uppercase tracking-[0.3em] block mb-4"
                    style={{ color: P.accent }}
                  >
                    Reflection
                  </span>
                  <p className="font-sans leading-relaxed text-base font-light" style={{ color: P.body }}>
                    Working with a technically complex product required spending real time with the founders to understand the hardware before designing anything. Skipping that step would have meant solving the wrong problems. AI accelerated our process — but it also surfaced a harder challenge. In an era where everything can look polished quickly, strong design judgment and taste matter more than ever. Tools augment craft. They don't replace it.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-6 pb-2"
                  style={{ borderTop: `0.5px solid ${P.rule}` }}
                >
                  <span
                    className="font-sans text-[10px] uppercase tracking-[0.3em] block mb-4"
                    style={{ color: P.accent }}
                  >
                    Next Steps
                  </span>
                  <div className="flex flex-col gap-4">
                    {[
                      { n: "01", text: "User testing with real external users to validate the onboarding flow end-to-end." },
                      { n: "02", text: "Expand the playground with more advanced sequence building and custom preset sharing between teams." },
                      { n: "03", text: "Scale the branding system to pitch deck, social, and email touchpoints." },
                      { n: "04", text: "Design for the second user group — factory and warehouse workers — who have even less technical background and will need a simpler, more forgiving interaction model." },
                    ].map((item) => (
                      <div key={item.n} className="flex gap-4">
                        <span className="font-sans text-[10px] pt-[3px] shrink-0 tracking-[0.2em]" style={{ color: P.accent }}>
                          {item.n}
                        </span>
                        <p className="font-sans text-sm leading-relaxed font-light" style={{ color: P.body }}>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Next project ───────────────────────────────────────── */}
        <section
          className="relative py-28 overflow-hidden"
          style={{
            borderTop: `0.5px solid ${P.rule}`,
            backgroundColor: P.bg,
          }}
        >
          <PaperGrain opacity={0.022} />
          <div className="relative z-10 px-6 sm:px-12 md:px-24 max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="flex flex-col gap-4">
              <span
                className="font-sans text-[10px] uppercase tracking-[0.35em]"
                style={{ color: P.dim }}
              >
                Next case study
              </span>
              <h2
                className="font-serif tracking-tight leading-[0.9]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: P.ink }}
              >
                Moffitt Status
              </h2>
              <p
                className="font-display italic text-lg max-w-sm"
                style={{ color: P.body }}
              >
                A library availability and space-browsing platform for UC Berkeley students.
              </p>
            </div>

            <Link
              to="/project/moffitt-status"
              className="group flex items-center gap-4 transition-all duration-500"
            >
              <span
                className="font-sans text-[11px] uppercase tracking-[0.3em] group-hover:opacity-70 transition-opacity"
                style={{ color: P.ink }}
              >
                View case study
              </span>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                style={{
                  backgroundColor: P.ink,
                  color: P.bg,
                }}
              >
                <ArrowRight size={16} strokeWidth={1.5} />
              </div>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
