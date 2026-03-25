/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music2, Volume2 } from 'lucide-react';
import { DUMMY_TRACKS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentTrackIndex, isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="w-full max-w-md bg-black/90 border-2 border-neon-pink p-6 shadow-[0_0_20px_rgba(255,0,255,0.2)] crt-screen">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipForward}
      />

      <div className="flex items-center gap-6 mb-8 tear">
        <motion.div
          key={currentTrack.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-24 h-24 border-2 border-neon-blue overflow-hidden"
        >
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-full h-full object-cover grayscale contrast-150"
            referrerPolicy="no-referrer"
          />
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-neon-blue/20">
              <div className="flex gap-1 items-end h-8">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 20, 8, 16, 4] }}
                    transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.05 }}
                    className="w-1 bg-neon-pink"
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <div className="flex-1 overflow-hidden">
          <h3 className="text-lg font-pixel text-neon-blue truncate glitch-pixel" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="text-neon-pink/70 text-xs font-mono-retro truncate uppercase mt-1">
            {">"} SOURCE: {currentTrack.artist}
          </p>
          <div className="flex items-center gap-2 mt-3 text-neon-pink">
            <Music2 size={12} />
            <span className="text-[8px] font-pixel uppercase tracking-tighter">BIT_STREAM_ACTIVE</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="relative h-2 w-full bg-neon-blue/10 border border-neon-blue/30 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-neon-pink shadow-[0_0_10px_#ff00ff]"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-neon-blue/50 font-mono-retro text-[10px]">
            <Volume2 size={14} />
            <span>VOL_01</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={skipBackward}
              className="text-neon-blue hover:text-neon-pink transition-colors"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center bg-neon-blue text-black hover:bg-neon-pink transition-colors shadow-[0_0_15px_rgba(0,255,255,0.5)]"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>

            <button
              onClick={skipForward}
              className="text-neon-blue hover:text-neon-pink transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="w-12" />
        </div>
      </div>

      {/* Playlist Preview */}
      <div className="mt-8 pt-6 border-t border-neon-blue/20">
        <p className="text-[8px] font-pixel text-neon-blue/50 mb-4">QUEUE_BUFFER</p>
        <div className="space-y-2">
          {DUMMY_TRACKS.map((track, idx) => (
            <div
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(idx);
                setIsPlaying(true);
              }}
              className={`flex items-center gap-3 p-2 border ${
                idx === currentTrackIndex ? 'border-neon-pink bg-neon-pink/10' : 'border-transparent hover:border-neon-blue/30'
              } cursor-pointer transition-all`}
            >
              <div className="w-8 h-8 border border-neon-blue/50 overflow-hidden">
                <img src={track.cover} className="w-full h-full object-cover grayscale" alt="" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className={`text-[10px] font-pixel truncate ${idx === currentTrackIndex ? 'text-neon-pink' : 'text-neon-blue/80'}`}>
                  {track.title}
                </p>
              </div>
              {idx === currentTrackIndex && isPlaying && (
                <div className="w-1 h-4 bg-neon-pink animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
