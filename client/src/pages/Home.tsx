/**
 * Home.tsx — Página principal do Sistema Solar 3D
 * Design: "Observatório Espacial" — Sci-Fi Cinematográfico
 * 
 * Integra: SolarSystem (Three.js), LoadingScreen, HUD, PlanetInfoPanel
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SolarSystem from '@/components/SolarSystem';
import LoadingScreen from '@/components/LoadingScreen';
import HUD from '@/components/HUD';
import PlanetInfoPanel from '@/components/PlanetInfoPanel';
import type { PlanetData } from '@/lib/planetData';

// Navigation command type
export type NavCommand = 
  | { type: 'planet'; planet: PlanetData; id: number }
  | { type: 'sun'; id: number }
  | { type: 'overview'; id: number }
  | null;

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [showSunInfo, setShowSunInfo] = useState(false);
  const [navCommand, setNavCommand] = useState<NavCommand>(null);

  const handleLoadingProgress = useCallback((progress: number) => {
    setLoadingProgress(progress);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  const handlePlanetSelect = useCallback((planet: PlanetData | null) => {
    setShowSunInfo(false);
    setSelectedPlanet(planet);
    if (planet) {
      setNavCommand({ type: 'planet', planet, id: Date.now() });
    }
  }, []);

  const handleSunSelect = useCallback(() => {
    setSelectedPlanet(null);
    setShowSunInfo(true);
    setNavCommand({ type: 'sun', id: Date.now() });
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedPlanet(null);
    setShowSunInfo(false);
    setNavCommand({ type: 'overview', id: Date.now() });
  }, []);

  const handleOverview = useCallback(() => {
    setSelectedPlanet(null);
    setShowSunInfo(false);
    setNavCommand({ type: 'overview', id: Date.now() });
  }, []);

  const activeName = selectedPlanet?.name ?? (showSunInfo ? 'Sol' : null);
  const activeColor = selectedPlanet?.color ?? (showSunInfo ? '#FDB813' : '#fff');

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      {/* Loading Screen */}
      <LoadingScreen
        progress={loadingProgress}
        isVisible={isLoading}
      />

      {/* 3D Solar System */}
      <SolarSystem
        navCommand={navCommand}
        onPlanetSelect={handlePlanetSelect}
        onSunSelect={handleSunSelect}
        onLoadingProgress={handleLoadingProgress}
        onLoadingComplete={handleLoadingComplete}
      />

      {/* Planet Name Title Overlay */}
      <AnimatePresence>
        {activeName && !isLoading && (
          <motion.div
            key={activeName}
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center"
          >
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.15em]"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: activeColor,
                textShadow: `0 0 40px ${activeColor}30, 0 0 80px ${activeColor}15`,
                opacity: 0.85,
              }}
            >
              {activeName}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD Overlay */}
      {!isLoading && (
        <HUD
          selectedPlanet={selectedPlanet}
          onPlanetSelect={handlePlanetSelect}
          onOverview={handleOverview}
          onSunSelect={handleSunSelect}
        />
      )}

      {/* Planet Info Panel */}
      {!isLoading && (
        <PlanetInfoPanel
          planet={selectedPlanet}
          showSun={showSunInfo}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
}
