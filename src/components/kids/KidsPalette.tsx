import React from 'react';
import { Sparkles } from 'lucide-react';
import { KidShaderMode } from './KidsScene';

interface KidsPaletteProps {
  currentColor: string;
  onSelectColor: (color: string) => void;
  currentShader: KidShaderMode;
  onSelectShader: (shader: KidShaderMode) => void;
  isEraser: boolean;
}

export const KID_COLORS = [
  { hex: '#FF3B30', name: 'Strawberry Red' },
  { hex: '#FF9500', name: 'Tangerine Orange' },
  { hex: '#FFCC00', name: 'Sunshine Yellow' },
  { hex: '#34C759', name: 'Lime Green' },
  { hex: '#007AFF', name: 'Sky Blue' },
  { hex: '#AF52DE', name: 'Grape Purple' },
  { hex: '#FF2D55', name: 'Bubblegum Pink' },
  { hex: '#FFFFFF', name: 'Snow White' },
];

export const SHADER_PRESETS: { id: KidShaderMode; name: string; icon: string; desc: string }[] = [
  { id: 'playdoh_swirl', name: 'Rainbow Dough', icon: '🌀', desc: 'Swirled Multi-Color Play-Doh' },
  { id: 'synthwave_chrome', name: 'Synthwave Chrome', icon: '🌆', desc: 'Neon 80s Chrome' },
  { id: 'iridescent_foil', name: 'Iridescent Foil', icon: '💿', desc: 'Shimmering Rainbow Foil' },
  { id: 'fractal_galaxy', name: 'Fractal Galaxy', icon: '🌌', desc: 'Cosmic Fractal Starfield' },
  { id: 'energy_portal', name: 'Energy Portal', icon: '🌀', desc: 'Mystic Swirling Portal' },
  { id: 'flowers_mandala', name: 'Flowers Mandala', icon: '🌸', desc: 'Psychedelic Flower Geometry' },
  { id: 'galaxy_nebula', name: 'Galaxy Nebula', icon: '🪐', desc: 'Deep Space Nebula' },
  { id: 'candy_chrome', name: 'Candy Chrome', icon: '🍬', desc: 'Glossy Pastel Chrome' },
  { id: 'amethyst_crystal', name: 'Amethyst Crystal', icon: '💎', desc: 'Purple Mineral Crystal' },
  { id: 'clay', name: 'Matte Clay', icon: '🎨', desc: 'Solid Play-Doh Clay' },
  { id: 'candy', name: 'Shiny Glaze', icon: '✨', desc: 'Ultra-Glossy Shiny Glaze' },
  { id: 'gold', name: 'Glitter Gold', icon: '🪙', desc: 'Sparkly Metallic Gold' },
];

export const KidsPalette: React.FC<KidsPaletteProps> = ({
  currentColor,
  onSelectColor,
  currentShader,
  onSelectShader,
  isEraser,
}) => {
  return (
    <aside
      aria-label="Color & Magic Shader Palette"
      className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 z-20"
    >
      {/* Magic Dough / Shaders Pill */}
      <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-3xl shadow-xl border-4 border-amber-100 flex flex-col items-center gap-1.5 max-h-[50vh] overflow-y-auto scrollbar-thin">
        <div className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-black tracking-wider text-amber-900/80 uppercase sticky top-0 bg-white/90 backdrop-blur-xs rounded-lg z-10 w-full justify-center">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>Magic Shaders</span>
        </div>

        <div className="flex flex-col gap-1 w-44">
          {SHADER_PRESETS.map((shader) => {
            const isSelected = currentShader === shader.id && !isEraser;
            return (
              <button
                key={shader.id}
                onClick={() => onSelectShader(shader.id)}
                title={shader.desc}
                className={`px-2 py-1 rounded-xl flex items-center gap-2 text-left transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 font-black shadow-sm ring-2 ring-amber-500 scale-102'
                    : 'bg-amber-50/70 hover:bg-amber-100/90 text-neutral-700 font-bold'
                }`}
              >
                <span className="text-base leading-none">{shader.icon}</span>
                <span className="text-[11px] truncate leading-tight">{shader.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors Strip */}
      <div className="bg-white/95 backdrop-blur-md p-2 rounded-3xl shadow-xl border-4 border-amber-100 flex flex-col items-center gap-1.5">
        <span className="text-[9px] font-black tracking-wider text-neutral-400 uppercase">
          Colors
        </span>

        <div className="grid grid-cols-4 gap-1.5">
          {KID_COLORS.map((c) => {
            const isSelected =
              currentColor.toLowerCase() === c.hex.toLowerCase() &&
              currentShader === 'clay' &&
              !isEraser;

            return (
              <button
                key={c.hex}
                onClick={() => {
                  onSelectColor(c.hex);
                  onSelectShader('clay');
                }}
                title={c.name}
                className={`relative w-8 h-8 rounded-full transition-all duration-150 active:scale-90 shadow-sm ${
                  isSelected
                    ? 'scale-115 ring-3 ring-blue-400 z-10'
                    : 'hover:scale-105 border border-white/80'
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {c.hex === '#FFFFFF' && (
                  <div className="absolute inset-0 rounded-full border border-neutral-200" />
                )}
                <div className="absolute top-0.5 left-1 w-2.5 h-1 rounded-full bg-white/45 -rotate-30 pointer-events-none" />
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
