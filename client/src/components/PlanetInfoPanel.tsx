/**
 * PlanetInfoPanel.tsx — Painel lateral de informações do planeta
 * Design: "Observatório Espacial" — Sci-Fi Cinematográfico
 * HUD translúcido com bordas em ciano e dados de telemetria
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Thermometer, Globe, Clock, Orbit, Scale, Moon } from 'lucide-react';
import type { PlanetData } from '@/lib/planetData';
import { SUN_DATA } from '@/lib/planetData';

interface PlanetInfoPanelProps {
  planet: PlanetData | null;
  showSun: boolean;
  onClose: () => void;
}

function DataRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-cyan-500/10 last:border-0">
      <Icon className="w-4 h-4 mt-0.5 text-cyan-400/70 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/50 mb-0.5"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {label}
        </div>
        <div className="text-sm text-white/90"
          style={{ fontFamily: "'Exo 2', sans-serif" }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export default function PlanetInfoPanel({ planet, showSun, onClose }: PlanetInfoPanelProps) {
  const isVisible = planet !== null || showSun;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full sm:w-[380px] z-40 pointer-events-auto"
        >
          {/* Panel background with glassmorphism */}
          <div className="h-full overflow-y-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(2, 6, 23, 0.92) 0%, rgba(8, 15, 40, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(14, 165, 233, 0.2)',
            }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 p-4"
              style={{
                background: 'linear-gradient(180deg, rgba(2, 6, 23, 0.98) 0%, rgba(2, 6, 23, 0.8) 80%, transparent 100%)',
              }}
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 text-cyan-400/70 hover:text-cyan-400 transition-colors text-sm"
                  style={{ fontFamily: "'Exo 2', sans-serif" }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="tracking-wider">VOLTAR</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-8">
              {showSun && !planet ? (
                // Sun info
                <>
                  <div className="mb-6">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-amber-400/60 mb-2"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      ESTRELA CENTRAL
                    </div>
                    <h2 className="text-3xl font-bold tracking-wider"
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: SUN_DATA.color,
                        textShadow: `0 0 30px ${SUN_DATA.color}40`,
                      }}
                    >
                      {SUN_DATA.name}
                    </h2>
                    <div className="text-xs text-white/30 mt-1 tracking-widest"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {SUN_DATA.nameEN}
                    </div>
                  </div>

                  {/* Decorative line */}
                  <div className="h-[1px] mb-6"
                    style={{
                      background: `linear-gradient(90deg, ${SUN_DATA.color}40, transparent)`,
                    }}
                  />

                  <p className="text-sm text-white/70 leading-relaxed mb-6"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    {SUN_DATA.description}
                  </p>

                  <div className="rounded-lg p-4"
                    style={{
                      background: 'rgba(14, 165, 233, 0.03)',
                      border: '1px solid rgba(14, 165, 233, 0.1)',
                    }}
                  >
                    <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/50 mb-3"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      DADOS TÉCNICOS
                    </div>
                    <DataRow icon={Globe} label="Diâmetro" value={SUN_DATA.facts.diameter} />
                    <DataRow icon={Scale} label="Massa" value={SUN_DATA.facts.mass} />
                    <DataRow icon={Thermometer} label="Temperatura" value={SUN_DATA.facts.temperature} />
                    <DataRow icon={Orbit} label="Tipo" value={SUN_DATA.facts.type} />
                    <DataRow icon={Clock} label="Idade" value={SUN_DATA.facts.age} />
                  </div>
                </>
              ) : planet ? (
                // Planet info
                <>
                  <div className="mb-6">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/60 mb-2"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {planet.facts.type}
                    </div>
                    <h2 className="text-3xl font-bold tracking-wider"
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: planet.color,
                        textShadow: `0 0 30px ${planet.color}40`,
                      }}
                    >
                      {planet.name}
                    </h2>
                    <div className="text-xs text-white/30 mt-1 tracking-widest"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {planet.nameEN}
                    </div>
                  </div>

                  {/* Decorative line */}
                  <div className="h-[1px] mb-6"
                    style={{
                      background: `linear-gradient(90deg, ${planet.color}40, transparent)`,
                    }}
                  />

                  <p className="text-sm text-white/70 leading-relaxed mb-6"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    {planet.description}
                  </p>

                  {/* Facts grid */}
                  <div className="rounded-lg p-4"
                    style={{
                      background: 'rgba(14, 165, 233, 0.03)',
                      border: '1px solid rgba(14, 165, 233, 0.1)',
                    }}
                  >
                    <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/50 mb-3"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      TELEMETRIA
                    </div>
                    <DataRow icon={Globe} label="Diâmetro" value={planet.facts.diameter} />
                    <DataRow icon={Scale} label="Massa" value={planet.facts.mass} />
                    <DataRow icon={Orbit} label="Distância do Sol" value={planet.facts.distanceFromSun} />
                    <DataRow icon={Clock} label="Período Orbital" value={planet.facts.orbitalPeriod} />
                    <DataRow icon={Clock} label="Duração do Dia" value={planet.facts.dayLength} />
                    <DataRow icon={Thermometer} label="Temperatura" value={planet.facts.temperature} />
                    <DataRow icon={Moon} label="Luas" value={planet.facts.moons} />
                  </div>

                  {/* Controls hint */}
                  <div className="mt-6 p-3 rounded"
                    style={{
                      background: 'rgba(14, 165, 233, 0.05)',
                      border: '1px solid rgba(14, 165, 233, 0.08)',
                    }}
                  >
                    <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/40 mb-2"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      CONTROLES
                    </div>
                    <div className="space-y-1.5 text-xs text-white/50"
                      style={{ fontFamily: "'Exo 2', sans-serif" }}
                    >
                      <p>🖱️ Arrastar — Rotacionar vista</p>
                      <p>🔍 Scroll — Zoom (aproximar/afastar)</p>
                      <p>⌨️ Botão direito — Mover câmera</p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
