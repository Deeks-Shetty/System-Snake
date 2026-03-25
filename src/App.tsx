/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Trophy, Gamepad2, Music } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 space-y-8 crt-screen">
      {/* Header */}
      <header className="text-center space-y-2 tear">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-black tracking-tighter glitch-pixel neon-text-pink uppercase"
          data-text="SYSTEM_SNAKE"
        >
          SYSTEM_SNAKE
        </motion.h1>
        <p className="text-neon-blue text-xs uppercase tracking-[0.5em] font-bold animate-pulse">
          [ STATUS: OPERATIONAL ]
        </p>
      </header>

      {/* Main Content Grid */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar - Stats */}
        <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
          <div className="bg-black/80 border-2 border-neon-blue p-6 rounded-none space-y-8 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 bg-neon-pink/10 border border-neon-pink mb-2">
                <Trophy className="text-neon-pink" size={24} />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-neon-pink font-bold">MAX_EFFICIENCY</p>
              <p className="text-3xl font-pixel font-bold text-white neon-text-pink">{highScore}</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 bg-neon-blue/10 border border-neon-blue mb-2">
                <Gamepad2 className="text-neon-blue" size={24} />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-neon-blue font-bold">CURRENT_LOAD</p>
              <div className="glitch-pixel font-pixel font-black text-5xl text-white neon-text-blue" data-text={score}>
                {score}
              </div>
            </div>
          </div>

          <div className="bg-neon-purple/5 border-2 border-neon-purple p-6 rounded-none shadow-[0_0_10px_rgba(188,19,254,0.2)]">
            <h4 className="text-xs font-pixel text-neon-purple uppercase mb-4">PROTOCOL</h4>
            <ul className="text-xs text-neon-blue/70 space-y-3 font-mono-retro">
              <li>{">"} INPUT: ARROW_KEYS</li>
              <li>{">"} OBJECTIVE: CONSUME_ORBS</li>
              <li>{">"} WARNING: COLLISION_FATAL</li>
              <li>{">"} INTERRUPT: SPACE_BAR</li>
            </ul>
          </div>
        </div>

        {/* Center - Game Window */}
        <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="tear"
          >
            <SnakeGame onScoreChange={handleScoreChange} />
          </motion.div>
        </div>

        {/* Right Sidebar - Music Player */}
        <div className="lg:col-span-3 flex justify-center order-3">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            <MusicPlayer />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-8 text-center opacity-50">
        <div className="flex items-center justify-center gap-2 text-neon-blue text-[10px] uppercase tracking-widest font-bold">
          <Music size={12} />
          <span>[ AUDIO_STREAM_ACTIVE ]</span>
        </div>
      </footer>
    </div>
  );
}
