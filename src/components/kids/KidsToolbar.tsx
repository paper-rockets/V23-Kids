import React, { useState } from 'react';
import {
  Paintbrush,
  Eraser,
  Stamp,
  PaintBucket,
  Palette,
  Box,
  CircleDot,
  Activity,
  RotateCcw,
  Trash2,
  Check,
  X,
} from 'lucide-react';
import {
  KidBrushSize,
  KidStrokeStyle,
  KidShaderMode,
} from './KidsScene';

export interface KidsToolbarProps {
  isEraser: boolean;
  onSelectBrush: () => void;
  onSelectEraser: () => void;
  currentSize: KidBrushSize;
  onSelectSize: (size: KidBrushSize) => void;
  activeColor: string;
  onSelectColor: (color: string) => void;
  currentShader: KidShaderMode;
  onSelectShader: (shader: KidShaderMode) => void;
  strokeStyle: KidStrokeStyle;
  onToggleStrokeStyle: (style: KidStrokeStyle) => void;
  onOpenToyGallery: () => void;
  onUndo: () => void;
  onClearAll: () => void;
  canUndo: boolean;
}

export const KID_COLORS = [
  { hex: '#EF4444', name: 'Strawberry Red' },
  { hex: '#F97316', name: 'Tangerine Orange' },
  { hex: '#FACC15', name: 'Sunshine Yellow' },
  { hex: '#22C55E', name: 'Lime Green' },
  { hex: '#06B6D4', name: 'Mint Cyan' },
  { hex: '#3B82F6', name: 'Sky Blue' },
  { hex: '#6366F1', name: 'Royal Indigo' },
  { hex: '#A855F7', name: 'Grape Purple' },
  { hex: '#EC4899', name: 'Bubblegum Pink' },
  { hex: '#78350F', name: 'Clay Brown' },
  { hex: '#FFFFFF', name: 'Snow White' },
  { hex: '#18181B', name: 'Midnight Black' },
];

export const SHADER_PRESETS: { id: KidShaderMode; name: string; icon: string; desc: string }[] = [
  { id: 'playdoh_swirl', name: 'Rainbow', icon: '🌀', desc: 'Swirled Play-Doh' },
  { id: 'synthwave_chrome', name: 'Synthwave', icon: '🌆', desc: 'Neon 80s Chrome' },
  { id: 'iridescent_foil', name: 'Rainbow Foil', icon: '💿', desc: 'Shimmering Foil' },
  { id: 'fractal_galaxy', name: 'Fractal Space', icon: '🌌', desc: 'Cosmic Starfield' },
  { id: 'energy_portal', name: 'Energy Portal', icon: '🌀', desc: 'Swirling Portal' },
  { id: 'flowers_mandala', name: 'Mind Flowers', icon: '🌸', desc: 'Flower Geometry' },
  { id: 'galaxy_nebula', name: 'Galaxy Nebula', icon: '🪐', desc: 'Space Nebula' },
  { id: 'candy_chrome', name: 'Candy Chrome', icon: '🍬', desc: 'Glossy Chrome' },
  { id: 'amethyst_crystal', name: 'Amethyst', icon: '💎', desc: 'Purple Crystal' },
  { id: 'clay', name: 'Matte Clay', icon: '🎨', desc: 'Solid Play-Doh' },
  { id: 'candy', name: 'Shiny Glaze', icon: '✨', desc: 'Ultra-Glossy Glaze' },
  { id: 'gold', name: 'Glitter Gold', icon: '🪙', desc: 'Sparkly Gold' },
];

type SubmenuType = 'brush' | 'paint' | 'stamp' | 'none';

export const KidsToolbar: React.FC<KidsToolbarProps> = ({
  isEraser,
  onSelectBrush,
  onSelectEraser,
  currentSize,
  onSelectSize,
  activeColor,
  onSelectColor,
  currentShader,
  onSelectShader,
  strokeStyle,
  onToggleStrokeStyle,
  onOpenToyGallery,
  onUndo,
  onClearAll,
  canUndo,
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState<SubmenuType>('brush');

  const handleToolClick = (tool: 'brush' | 'erase' | 'stamp' | 'paint' | 'shape') => {
    if (tool === 'brush') {
      onSelectBrush();
      setActiveSubmenu((prev) => (prev === 'brush' ? 'none' : 'brush'));
    } else if (tool === 'erase') {
      onSelectEraser();
      setActiveSubmenu('none');
    } else if (tool === 'stamp') {
      onSelectBrush();
      setActiveSubmenu((prev) => (prev === 'stamp' ? 'none' : 'stamp'));
    } else if (tool === 'paint') {
      onSelectBrush();
      setActiveSubmenu((prev) => (prev === 'paint' ? 'none' : 'paint'));
    } else if (tool === 'shape') {
      onOpenToyGallery();
      setActiveSubmenu('none');
    }
  };

  return (
    <aside
      aria-label="Drawing Tools"
      className="absolute left-6 top-1/2 -translate-y-1/2 flex items-start z-30 pointer-events-auto select-none"
    >
      {/* 5-Button Discrete Block Stack: Brush (Red), Erase (Blue), Stamp (Green), Paint (Yellow), Shape (White) */}
      <div className="flex flex-col gap-2 select-none">
        {/* 1. Brush Button (Red) */}
        <button
          onClick={() => handleToolClick('brush')}
          title="Brush & Drawing Styles"
          className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all border-2 border-black active:translate-y-0.5 ${
            !isEraser && (activeSubmenu === 'brush' || activeSubmenu === 'none')
              ? 'bg-[#EF4444] text-white ring-2 ring-inset ring-white'
              : 'bg-[#EF4444] text-white hover:bg-[#DC2626]'
          }`}
        >
          <Paintbrush className="w-6 h-6 stroke-[2.6]" />
          <span className="text-[10px] font-black tracking-tight mt-0.5">Brush</span>
        </button>

        {/* 2. Erase Button (Blue) */}
        <button
          onClick={() => handleToolClick('erase')}
          title="Eraser"
          className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all border-2 border-black active:translate-y-0.5 ${
            isEraser
              ? 'bg-[#2563EB] text-white ring-2 ring-inset ring-white'
              : 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
          }`}
        >
          <Eraser className="w-6 h-6 stroke-[2.6]" />
          <span className="text-[10px] font-black tracking-tight mt-0.5">Erase</span>
        </button>

        {/* 3. Stamp / Rubber Stamp Button (Green) - Replaced star icon with stamp icon */}
        <button
          onClick={() => handleToolClick('stamp')}
          title="Magic Dough & Stamps"
          className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all border-2 border-black active:translate-y-0.5 ${
            activeSubmenu === 'stamp' && !isEraser
              ? 'bg-[#16A34A] text-white ring-2 ring-inset ring-white'
              : 'bg-[#22C55E] text-white hover:bg-[#16A34A]'
          }`}
        >
          <Stamp className="w-6 h-6 stroke-[2.6]" />
          <span className="text-[10px] font-black tracking-tight mt-0.5">Stamp</span>
        </button>

        {/* 4. Paint / Color Button (Yellow) */}
        <button
          onClick={() => handleToolClick('paint')}
          title="Paint Colors"
          className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all border-2 border-black active:translate-y-0.5 ${
            activeSubmenu === 'paint' && !isEraser
              ? 'bg-[#EAB308] text-black ring-2 ring-inset ring-black'
              : 'bg-[#FACC15] text-black hover:bg-[#EAB308]'
          }`}
        >
          <PaintBucket className="w-6 h-6 stroke-[2.6]" />
          <span className="text-[10px] font-black tracking-tight mt-0.5">Paint</span>
        </button>

        {/* 5. Shape / Toy Button (White) */}
        <button
          onClick={() => handleToolClick('shape')}
          title="Select Toy Model"
          className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all border-2 border-black bg-white hover:bg-neutral-100 text-black active:translate-y-0.5"
        >
          <Box className="w-6 h-6 stroke-[2.6]" />
          <span className="text-[10px] font-black tracking-tight mt-0.5">Shape</span>
        </button>
      </div>

      {/* Yellow Sub-panel (Flat, NO shadows, NO horizontal scroll) */}
      {activeSubmenu !== 'none' && (
        <div className="relative ml-3 z-40 animate-in fade-in zoom-in-95 duration-100">
          {/* Speech-Bubble Triangle Notch with crisp border */}
          <div
            className={`absolute -left-2.5 w-0 h-0 border-y-[8px] border-y-transparent border-r-[10px] border-r-black pointer-events-none transition-all ${
              activeSubmenu === 'brush'
                ? 'top-[32px] -translate-y-1/2'
                : activeSubmenu === 'stamp'
                ? 'top-[176px] -translate-y-1/2'
                : 'top-[248px] -translate-y-1/2'
            }`}
          />
          <div
            className={`absolute -left-2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-[#FACC15] pointer-events-none transition-all ${
              activeSubmenu === 'brush'
                ? 'top-[32px] -translate-y-1/2'
                : activeSubmenu === 'stamp'
                ? 'top-[176px] -translate-y-1/2'
                : 'top-[248px] -translate-y-1/2'
            }`}
          />

          {/* Yellow Panel Container: Flat, Crisp Black Border, Zero Drop Shadows */}
          <div className="bg-[#FACC15] border-2 border-black rounded-3xl p-3 text-black flex flex-col gap-2 w-[204px] overflow-hidden select-none">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/20 pb-1.5 px-0.5">
              <span className="text-xs font-black uppercase tracking-wider text-black">
                {activeSubmenu === 'brush' && 'Brush Options'}
                {activeSubmenu === 'paint' && 'Paint Colors'}
                {activeSubmenu === 'stamp' && 'Magic Dough'}
              </span>
              <button
                onClick={() => setActiveSubmenu('none')}
                title="Close"
                className="w-5 h-5 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center text-black font-black text-xs active:scale-90"
              >
                <X className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>

            {/* 1. BRUSH SUBMENU (Size, Smooth, Clear, Undo) */}
            {activeSubmenu === 'brush' && (
              <div className="flex flex-col gap-1.5">
                {/* Size Row */}
                <div className="flex flex-col gap-1 py-1 border-b border-black/15">
                  <div className="flex items-center gap-1.5 text-[11px] font-black">
                    <CircleDot className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Size</span>
                  </div>
                  <div className="flex items-center justify-between gap-1.5 mt-0.5">
                    {[
                      { id: 'small' as KidBrushSize, label: 'Thin', dot: 'w-2 h-2' },
                      { id: 'medium' as KidBrushSize, label: 'Med', dot: 'w-3 h-3' },
                      { id: 'big' as KidBrushSize, label: 'Thick', dot: 'w-4 h-4' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => onSelectSize(s.id)}
                        className={`flex-1 py-1 rounded-xl border-2 border-black flex flex-col items-center justify-center gap-0.5 transition-all active:translate-y-0.5 ${
                          currentSize === s.id
                            ? 'bg-white text-black font-black'
                            : 'bg-yellow-300 hover:bg-white/60 font-bold'
                        }`}
                      >
                        <div className={`rounded-full bg-black ${s.dot}`} />
                        <span className="text-[9px]">{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Smooth / Style Row */}
                <div className="flex flex-col gap-1 py-1 border-b border-black/15">
                  <div className="flex items-center gap-1.5 text-[11px] font-black">
                    <Activity className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Smooth</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <button
                      onClick={() => onToggleStrokeStyle('3d_tube')}
                      className={`flex-1 py-1.5 rounded-xl border-2 border-black text-[10px] font-black flex items-center justify-center gap-1 transition-all active:translate-y-0.5 ${
                        strokeStyle === '3d_tube'
                          ? 'bg-white text-black'
                          : 'bg-yellow-300 hover:bg-white/60'
                      }`}
                    >
                      <span>🧽</span>
                      <span>3D Tube</span>
                    </button>
                    <button
                      onClick={() => onToggleStrokeStyle('flat_ribbon')}
                      className={`flex-1 py-1.5 rounded-xl border-2 border-black text-[10px] font-black flex items-center justify-center gap-1 transition-all active:translate-y-0.5 ${
                        strokeStyle === 'flat_ribbon'
                          ? 'bg-white text-black'
                          : 'bg-yellow-300 hover:bg-white/60'
                      }`}
                    >
                      <span>✒️</span>
                      <span>Marker</span>
                    </button>
                  </div>
                </div>

                {/* Clear Canvas Row */}
                <button
                  onClick={onClearAll}
                  className="w-full py-1.5 px-2 rounded-xl border-2 border-black bg-white hover:bg-rose-50 text-rose-700 flex items-center justify-center gap-1.5 text-xs font-black transition-all active:translate-y-0.5"
                >
                  <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Clear Canvas</span>
                </button>

                {/* Undo Row */}
                <button
                  onClick={onUndo}
                  disabled={!canUndo}
                  className={`w-full py-1.5 px-2 rounded-xl border-2 border-black flex items-center justify-center gap-1.5 text-xs font-black transition-all active:translate-y-0.5 ${
                    canUndo
                      ? 'bg-white hover:bg-neutral-100 text-black cursor-pointer'
                      : 'bg-white/50 opacity-40 cursor-not-allowed border-black/40'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 stroke-[2.6]" />
                  <span>Undo Last</span>
                </button>
              </div>
            )}

            {/* 2. PAINT / COLOR SUBMENU (Clean flat grid, zero drop shadows) */}
            {activeSubmenu === 'paint' && (
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-4 gap-2">
                  {KID_COLORS.map((c) => {
                    const isSelected =
                      activeColor.toLowerCase() === c.hex.toLowerCase() &&
                      currentShader === 'clay' &&
                      !isEraser;

                    return (
                      <button
                        key={c.hex}
                        onClick={() => {
                          onSelectColor(c.hex);
                          onSelectShader('clay');
                          onSelectBrush();
                        }}
                        title={c.name}
                        className={`relative w-9 h-9 rounded-full border-2 border-black transition-all active:scale-95 ${
                          isSelected ? 'scale-110 ring-2 ring-black ring-offset-1 z-10' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check
                              className={`w-4 h-4 ${
                                c.hex === '#FFFFFF' || c.hex === '#FACC15'
                                  ? 'text-black'
                                  : 'text-white'
                              } stroke-[3]`}
                            />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Color Picker Button */}
                <label className="flex items-center justify-center gap-2 py-1.5 px-2 rounded-xl bg-white hover:bg-neutral-100 border-2 border-black cursor-pointer text-xs font-black text-black active:translate-y-0.5">
                  <span>🌈</span>
                  <span>Custom Color</span>
                  <input
                    type="color"
                    value={activeColor}
                    onChange={(e) => {
                      onSelectColor(e.target.value);
                      onSelectShader('clay');
                      onSelectBrush();
                    }}
                    className="sr-only"
                  />
                </label>
              </div>
            )}

            {/* 3. STAMP / MAGIC SHADERS SUBMENU (Clean 2-column grid, zero drop shadows) */}
            {activeSubmenu === 'stamp' && (
              <div className="grid grid-cols-2 gap-1.5 max-h-[55vh] overflow-y-auto overflow-x-hidden pr-0.5">
                {SHADER_PRESETS.map((shader) => {
                  const isSelected = currentShader === shader.id && !isEraser;
                  return (
                    <button
                      key={shader.id}
                      onClick={() => {
                        onSelectShader(shader.id);
                        onSelectBrush();
                      }}
                      title={shader.desc}
                      className={`p-1.5 rounded-xl flex flex-col items-center justify-center text-center transition-all active:translate-y-0.5 border-2 border-black ${
                        isSelected
                          ? 'bg-white text-black font-black'
                          : 'bg-yellow-300 hover:bg-white text-black font-bold'
                      }`}
                    >
                      <span className="text-lg mb-0.5">{shader.icon}</span>
                      <span className="text-[9px] font-black leading-tight line-clamp-1">
                        {shader.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};


