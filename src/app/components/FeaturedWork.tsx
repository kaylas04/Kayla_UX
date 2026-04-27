import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { useRef, useState, useEffect } from "react";
import silicanMockup from "@/assets/c863579f248b8548ab658513c4420d778adc3160.png";

const featuredProjects = [
  {
    id: "silican",
    title: "SiLican",
    description: "Transforming complex deep-tech information into a clear, credible B2B website experience.",
    image: silicanMockup,
    tags: ["Product Design", "Web Design & Development"],
    link: "/project/silican",
    objectFit: "cover" as const,
    imageBg: "transparent",
  },
  {
    id: "quotr",
    title: "Quotr",
    description: "An AI-powered estimation workflow for contractors, designed to streamline takeoff, cost review, and project comparison in one workspace.",
    image: "/images/preview.png",
    tags: ["AI PRODUCT DESIGN", "B2B WORKFLOW"],
    link: "/project/quotr",
    objectFit: "cover" as const,
    imageBg: "transparent",
  },
  {
    id: "origami-robotics",
    title: "Origami Robotics",
    description: "A product design project spanning both a public-facing website and an internal engineering dashboard, built to communicate complex manipulation systems with greater clarity, credibility, and usability.",
    image: "/images/Frame 464.png",
    tags: ["PRODUCT DESIGN", "SYSTEM EXPERIENCE"],
    link: "/project/origami-robotics",
    objectFit: "cover" as const,
    imageBg: "transparent",
  },
  {
    id: "moffitt-status",
    title: "Moffitt Status",
    description: "A library availability and space-browsing platform designed to help students quickly find open, less crowded study spaces and access booking information with less friction.",
    image: "/images/moffitt_preview.png",
    tags: ["UI/UX DESIGN", "CAMPUS PRODUCT"],
    link: "/project/moffitt-status",
    objectFit: "cover" as const,
    imageBg: "transparent",
    cursorType: "nda" as const,
  },
];

function FeaturedProjectCard({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
      data-cursor={project.cursorType === "nda" ? "nda" : "featured"}
    >
      {/* Image */}
      <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-[#E2EAF2] mb-6 shadow-sm group-hover:shadow-xl transition-shadow duration-500" style={{ background: project.imageBg }}>
        <img
          src={project.image}
          alt={project.title}
          className={`absolute inset-0 w-full h-full transition-transform duration-1000 group-hover:scale-105 pointer-events-none ${project.objectFit === "contain" ? "object-contain p-6" : "object-cover"}`}
        />
      </div>

      {/* Text below */}
      <div className="flex flex-col gap-3 px-2">
        <div>
          <h3 className="text-2xl md:text-[1.75rem] text-[#0A192F] font-serif tracking-tight leading-tight">
            {project.title}
          </h3>
          <p className="font-sans text-[#506680] text-sm leading-relaxed mt-1 max-w-sm">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-[#0A192F]/10 text-[#506680] text-[11px] tracking-wide uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Link to={project.link} className="absolute inset-0 z-30 opacity-0" aria-label={`View ${project.title}`}>
        View Project
      </Link>
    </motion.div>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" className="pt-28 md:pt-40 pb-24 md:pb-32 w-full bg-[#F0F8FF] rounded-t-3xl md:rounded-t-[3rem] relative z-20 shadow-[0_-10px_40px_rgba(10,25,47,0.03)] -mt-8 md:-mt-12">
      {/* Folder Tab Label */}
      <div className="absolute bottom-full left-6 sm:left-12 md:left-24 px-6 py-2 md:px-8 md:py-2.5 bg-[#E2EAF2] rounded-t-lg md:rounded-t-xl border border-b-0 border-[#0A192F]/5 flex items-center justify-center shadow-[0_-4px_10px_rgba(10,25,47,0.01)]">
        <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#475569] font-medium">FEATURED WORK</span>
      </div>

      <div className="px-6 sm:px-12 md:px-24 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-none tracking-tighter text-[#475569] mb-6"
          >
            Featured <span className="font-display italic">Work</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#506680] max-w-lg text-lg sm:text-xl font-display italic leading-relaxed"
          >
            Dive into a world of creativity and inspiration with our portfolio. Explore our
            work and imagine the possibilities for your brand.
          </motion.p>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}