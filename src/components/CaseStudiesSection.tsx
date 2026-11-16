import React, { useState } from 'react';
import { CASE_STUDIES, CaseStudy } from '../data/siddhiData';
import {
  ZoomIn,
  X,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudiesSectionProps {
  onOpenRfq?: (projectName?: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = () => {
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  return (
    <section
      id="projects"
      className="py-10 sm:py-12 bg-[#FFF1E8] border-b border-[#F1D9CA] relative overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-[#FFF1E8] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D2430F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#5F524C] mb-2 px-3 py-1 rounded-full bg-[#FFF1E8] border border-[#F1D9CA]">
              <Sparkles className="w-3.5 h-3.5 text-[#D2430F]" />
              <span>Proven Industrial Field Projects</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#231815] font-editorial tracking-tight">
              Recent Projects
            </h2>
          </motion.div>
        </div>

        {/* Moving Card Slider Track (Shows all 3 projects on desktop, with active highlight & smooth animation) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {CASE_STUDIES.map((project, idx) => {

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="w-full h-full"
              >
                  {/* ================= FRONT SIDE ================= */}
                  <div className="h-full bg-white rounded-3xl border border-[#F1D9CA] overflow-hidden flex flex-col shadow-xs hover:shadow-xl transition-all duration-300">
                    <div>
                      {/* Project Photography */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="h-28 sm:h-48 w-full relative overflow-hidden bg-[#D2430F]/8 cursor-zoom-in group/img"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFAF6]/70 via-transparent to-transparent opacity-60 group-hover/img:opacity-80 transition-opacity" />

                        {/* Category Badge */}
                        <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 px-2 sm:px-3 py-0.5 sm:py-1 bg-white/90 backdrop-blur-xs text-[#231815] text-[10px] sm:text-xs font-medium rounded-full shadow-sm border border-[#F1D9CA]/30">
                          {project.category}
                        </div>

                        {/* Zoom Indicator */}
                        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#FFFAF6]/90 backdrop-blur-xs text-[#231815] text-[11px] font-medium rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center gap-1 shadow-sm border border-[#F1D9CA]">
                          <ZoomIn className="w-3 h-3 text-[#5F524C]" />
                          <span>Inspect</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3 sm:p-6 space-y-2 sm:space-y-3">
                        <h3 className="text-sm sm:text-2xl font-normal text-[#231815] font-editorial leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-base text-[#3D332E] leading-relaxed line-clamp-4 sm:line-clamp-none">
                          {project.summary}
                        </p>

                      </div>
                    </div>

                  </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Project Image Lightbox Popup Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-[#FFF1E8] backdrop-blur-sm backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)] flex flex-col bg-[#FFFAF6] rounded-3xl overflow-hidden shadow-2xl border border-[#F1D9CA]"
            >
              {/* Image Preview with Close Button */}
              <div className="relative bg-[#FFF1E8] flex-1 min-h-0 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="max-h-[46dvh] sm:max-h-[50dvh] w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#231815] transition-colors cursor-pointer"
                  aria-label="Close image popup"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#D2430F] text-[#FFFAF6] text-xs font-semibold tracking-wider uppercase border border-[#F1D9CA]/30">
                  {selectedProject.category}
                </div>
              </div>

              {/* Details */}
              <div className="shrink-0 overflow-y-auto p-4 sm:p-6 space-y-2 sm:space-y-3 bg-[#FFFAF6]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-normal text-[#231815] font-editorial mb-1">
                    {selectedProject.title}
                  </h3>
                  {selectedProject.clients && (
                    <p className="text-xs text-[#5F524C] font-medium">Clients: {selectedProject.clients}</p>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#5F524C] font-light leading-relaxed">
                  {selectedProject.summary}
                </p>

                <div className="pt-3 border-t border-[#F1D9CA]">
                  <span className="text-xs text-[#D2430F] font-light">
                    Siddhi Kabel engineering &amp; factory-certified materials supply.
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};