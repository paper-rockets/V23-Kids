import React from 'react';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Box,
  Plus,
  Minus,
  Search,
} from 'lucide-react';
import { KidToyModel } from './KidsScene';

interface KidsBottomBarProps {
  strokeCount: number;
  onUndo: () => void;
  onClearAll: () => void;
  currentToy: KidToyModel;
  onNextToy: () => void;
  onOpenToyGallery: () => void;
  onRotateToy: (yaw: number, pitch: number) => void;
  onZoom: (delta: number) => void;
  onResetView: () => void;
  onToggleAutoSpin: () => void;
  isAutoSpinning: boolean;
  showCameraControls?: boolean;
}

export const KidsBottomBar: React.FC<KidsBottomBarProps> = ({
  onRotateToy,
  onZoom,
  onResetView,
  onToggleAutoSpin,
  isAutoSpinning,
  showCameraControls = true,
}) => {
  return (
    <>
      {/* Right Side Zoom Pill */}
      <div
        className={`${
          showCameraControls ? 'flex' : 'hidden md:flex'
        } absolute right-2 sm:right-6 top-18 sm:top-1/2 sm:-translate-y-1/2 scale-80 sm:scale-100 origin-top-right sm:origin-right bg-white border-2 border-black rounded-full p-1 sm:p-1.5 flex-col items-center gap-1 sm:gap-1.5 select-none z-20 pointer-events-auto`}
      >
        {/* Zoom In (+) */}
        <button
          onClick={() => onZoom(-0.35)}
          title="Zoom In"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center text-black active:translate-y-0.5"
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
        </button>

        {/* Center Magnifying Glass / Reset Zoom */}
        <button
          onClick={onResetView}
          title="Reset Zoom & Center Toy"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center text-black active:translate-y-0.5"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.6]" />
        </button>

        {/* Zoom Out (-) */}
        <button
          onClick={() => onZoom(0.35)}
          title="Zoom Out"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center text-black active:translate-y-0.5"
        >
          <Minus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
        </button>
      </div>

      {/* Bottom-Right 4-Way Flower / Clover D-Pad Controller */}
      <div
        className={`${
          showCameraControls ? 'block' : 'hidden md:block'
        } absolute bottom-20 sm:bottom-6 right-2 sm:right-6 scale-75 sm:scale-100 origin-bottom-right z-20 pointer-events-auto select-none`}
      >
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Top Petal (Red Arrow Up) */}
          <button
            onClick={() => onRotateToy(0, -0.15)}
            title="Tilt Up"
            className="absolute top-0 w-8 h-10 rounded-t-full bg-white border-2 border-black flex items-start justify-center pt-1 hover:bg-neutral-100 active:translate-y-0.5"
          >
            <ArrowUp className="w-5 h-5 text-[#E53935] stroke-[3.2]" />
          </button>

          {/* Bottom Petal (Green Arrow Down) */}
          <button
            onClick={() => onRotateToy(0, 0.15)}
            title="Tilt Down"
            className="absolute bottom-0 w-8 h-10 rounded-b-full bg-white border-2 border-black flex items-end justify-center pb-1 hover:bg-neutral-100 active:translate-y-0.5"
          >
            <ArrowDown className="w-5 h-5 text-[#43A047] stroke-[3.2]" />
          </button>

          {/* Left Petal (Yellow Arrow Left) */}
          <button
            onClick={() => onRotateToy(-0.25, 0)}
            title="Rotate Left"
            className="absolute left-0 h-8 w-10 rounded-l-full bg-white border-2 border-black flex items-center justify-start pl-1 hover:bg-neutral-100 active:translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5 text-[#FBC02D] stroke-[3.2]" />
          </button>

          {/* Right Petal (Blue Arrow Right) */}
          <button
            onClick={() => onRotateToy(0.25, 0)}
            title="Rotate Right"
            className="absolute right-0 h-8 w-10 rounded-r-full bg-white border-2 border-black flex items-center justify-end pr-1 hover:bg-neutral-100 active:translate-y-0.5"
          >
            <ArrowRight className="w-5 h-5 text-[#1E88E5] stroke-[3.2]" />
          </button>

          {/* Center Blue Circle with White 3D Cube */}
          <button
            onClick={onResetView}
            onDoubleClick={onToggleAutoSpin}
            title={isAutoSpinning ? 'Turntable Spinning (Tap to Stop)' : 'Tap to Center Front, Double-Tap to Spin'}
            className={`z-10 w-11 h-11 rounded-full border-2 border-black flex items-center justify-center transition-all active:scale-95 ${
              isAutoSpinning
                ? 'bg-cyan-400 text-white animate-pulse'
                : 'bg-[#1E88E5] text-white hover:bg-[#1976D2]'
            }`}
          >
            <Box className="w-5 h-5 stroke-[2.8]" />
          </button>
        </div>
      </div>
    </>
  );
};
