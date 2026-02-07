/**
 * LoadingScreen.tsx — Tela de carregamento cinematográfica
 * Design: "Observatório Espacial" — Sci-Fi Cinematográfico
 * Background com imagem gerada de espaço profundo
 */

import { motion, AnimatePresence } from 'framer-motion';

const LOADING_BG = 'https://private-us-east-1.manuscdn.com/sessionFile/g8EOBesyN34sef4jmFdTbZ/sandbox/SJpqijZrRrFwmWgnX2GfSV-img-3_1770429495000_na1fn_bG9hZGluZy1zY3JlZW4tc3BhY2U.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZzhFT0Jlc3lOMzRzZWY0am1GZFRiWi9zYW5kYm94L1NKcHFpalpyUnJGd21XZ25YMkdmU1YtaW1nLTNfMTc3MDQyOTQ5NTAwMF9uYTFmbl9iRzloWkdsdVp5MXpZM0psWlc0dGMzQmhZMlUuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=hES~37yH1b9nvdpTM0stfZoVdHnootStPn9BmIYCrUfxvJ3FyxfNttqAWmjK9Ib~j2ktSMlks5kiIkHg-yxeNqrBPgsWS7YXxWNnaYnFZHu7ufTfSb2oxHV6TXyoETWtXegOZt8faKcUCJHecN3dUMq9b1tVFH6Q-mVtCmWrNLsTL7e2GlTD0m4WOHbRFtAGCocJbfsy7FZSbVB5cvH~HJ2hiy0x1fZnFHqIzdkf5~0e1U0Fx8YzBuHBc8XcUaFtbzC3yP6nBko7X18B4QjP4MX9S5e7WrbSP6QRtsZ0BGhDF6eKfjzFXEsLlTuEQnF-5yakgrll3zVbUETPgV5oXg__';

interface LoadingScreenProps {
  progress: number;
  isVisible: boolean;
}

export default function LoadingScreen({ progress, isVisible }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            backgroundImage: `url(${LOADING_BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-[0.3em] text-white/90"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              SISTEMA SOLAR
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-sm md:text-base tracking-[0.5em] uppercase text-cyan-400/80"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Explorador Interativo 3D
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="w-64 md:w-96 mt-8"
            >
              <div className="relative h-[2px] bg-white/10 overflow-hidden"
                style={{
                  clipPath: 'polygon(2% 0, 98% 0, 100% 50%, 98% 100%, 2% 100%, 0 50%)',
                }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #0ea5e9, #06b6d4, #0ea5e9)',
                    boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="flex justify-between mt-3 text-xs tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="text-cyan-400/60">CARREGANDO TEXTURAS</span>
                <span className="text-cyan-400/80">{progress}%</span>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-12 text-xs text-white/30 tracking-[0.3em]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              TEXTURAS NASA • SOLAR SYSTEM SCOPE
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
