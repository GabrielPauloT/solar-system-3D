/**
 * HUD.tsx — Interface de controle estilo centro de comando espacial
 * Design: "Observatório Espacial" — Sci-Fi Cinematográfico
 * Navegação rápida entre planetas, botão de visão geral
 */

import { motion } from 'framer-motion';
import { Home, Compass } from 'lucide-react';
import { PLANETS, type PlanetData } from '@/lib/planetData';

interface HUDProps {
  selectedPlanet: PlanetData | null;
  onPlanetSelect: (planet: PlanetData) => void;
  onOverview: () => void;
  onSunSelect: () => void;
}

export default function HUD({ selectedPlanet, onPlanetSelect, onOverview, onSunSelect }: HUDProps) {
  return (
    <>
      {/* Top-left: Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed top-5 left-5 z-30"
      >
        <h1
          className="text-lg md:text-xl font-bold tracking-[0.25em] text-white/80"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          SOLAR SYSTEM
        </h1>
        <div
          className="text-[9px] tracking-[0.4em] text-cyan-400/50 mt-1"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          EXPLORADOR 3D INTERATIVO
        </div>
      </motion.div>

      {/* Top-right: Overview button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="fixed top-5 right-5 z-30 flex gap-2"
      >
        <button
          onClick={onOverview}
          className="flex items-center gap-2 px-4 py-2 text-xs tracking-wider transition-all"
          style={{
            fontFamily: "'Exo 2', sans-serif",
            background: 'rgba(14, 165, 233, 0.08)',
            border: '1px solid rgba(14, 165, 233, 0.25)',
            color: 'rgba(14, 165, 233, 0.8)',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(14, 165, 233, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(14, 165, 233, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.25)';
          }}
        >
          <Home className="w-3.5 h-3.5" />
          VISÃO GERAL
        </button>
      </motion.div>

      {/* Bottom: Planet navigation bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="fixed bottom-0 left-0 right-0 z-30"
      >
        <div
          className="mx-auto px-3 py-3 flex items-center justify-center gap-1 md:gap-2 overflow-x-auto"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(2, 6, 23, 0.8) 30%, rgba(2, 6, 23, 0.95) 100%)',
          }}
        >
          {/* Sun button */}
          <button
            onClick={onSunSelect}
            className="flex flex-col items-center gap-1 px-2 py-1.5 rounded transition-all shrink-0 group"
            style={{
              background: 'rgba(253, 184, 19, 0.05)',
              border: '1px solid rgba(253, 184, 19, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(253, 184, 19, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(253, 184, 19, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(253, 184, 19, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(253, 184, 19, 0.15)';
            }}
          >
            <div
              className="w-5 h-5 md:w-6 md:h-6 rounded-full"
              style={{
                background: 'radial-gradient(circle, #FDB813, #ff8c00)',
                boxShadow: '0 0 10px rgba(253, 184, 19, 0.4)',
              }}
            />
            <span
              className="text-[8px] md:text-[9px] tracking-wider text-amber-400/70 group-hover:text-amber-400"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              SOL
            </span>
          </button>

          {/* Separator */}
          <div className="w-[1px] h-8 bg-cyan-500/15 mx-1 shrink-0" />

          {/* Planet buttons */}
          {PLANETS.map((planet) => {
            const isSelected = selectedPlanet?.id === planet.id;
            return (
              <button
                key={planet.id}
                onClick={() => onPlanetSelect(planet)}
                className="flex flex-col items-center gap-1 px-2 py-1.5 rounded transition-all shrink-0 group"
                style={{
                  background: isSelected
                    ? `${planet.color}15`
                    : 'rgba(14, 165, 233, 0.03)',
                  border: `1px solid ${isSelected ? `${planet.color}50` : 'rgba(14, 165, 233, 0.1)'}`,
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = `${planet.color}10`;
                    e.currentTarget.style.borderColor = `${planet.color}30`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(14, 165, 233, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.1)';
                  }
                }}
              >
                <div
                  className="w-4 h-4 md:w-5 md:h-5 rounded-full transition-shadow"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${planet.color}dd, ${planet.glowColor})`,
                    boxShadow: isSelected ? `0 0 12px ${planet.color}60` : 'none',
                  }}
                />
                <span
                  className="text-[7px] md:text-[8px] tracking-wider transition-colors"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: isSelected ? planet.color : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {planet.name.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom-left: Controls hint (only on overview) */}
      {!selectedPlanet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="fixed bottom-20 left-5 z-20"
        >
          <div className="flex items-center gap-2 text-white/20 text-xs"
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Clique em um planeta para explorar</span>
          </div>
        </motion.div>
      )}
    </>
  );
}
