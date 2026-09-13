import React, { useState } from 'react';
import {
  Layers,
  Eraser,
  Paintbrush,
  Check,
  X,
  Compass,
} from 'lucide-react';
import {
  KidBrushSize,
  KidStrokeStyle,
  KidShaderMode,
} from './KidsScene';
import { KID_COLORS, SHADER_PRESETS } from './KidsToolbar';

export interface KidsMobileDockProps {
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
  allowAirDrawing: boolean;
  onToggleAirDrawing: () => void;
  showCameraControls: boolean;
  onToggleCameraControls: () => void;
}

type MobileDrawerType = 'none' | 'color' | 'size' | 'brush';

export const KidsMobileDock: React.FC<KidsMobileDockProps> = ({
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
  allowAirDrawing,
  onToggleAirDrawing,
  showCameraControls,
  onToggleCameraControls,
}) => {
  const [activeDrawer, setActiveDrawer] = useState<MobileDrawerType>('none');

  const handleToggleDrawer = (drawer: MobileDrawerType) => {
    setActiveDrawer((prev) => (prev === drawer ? 'none' : drawer));
  };

  return (
    <>
      {/* Active Drawer / Popover Tray (floats just above the mobile dock) */}
      {activeDrawer !== 'none' && (
        <div className="fixed bottom-[74px] left-1/2 -translate-x-1/2 w-[94%] max-w-sm z-40 bg-[#FAF6EF] border-2 border-black rounded-2xl p-2.5 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-150 select-none md:hidden">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-black/15 pb-1 mb-2 px-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-black">
              {activeDrawer === 'color' && 'Paint Colors'}
              {activeDrawer === 'size' && 'Brush Size'}
              {activeDrawer === 'brush' && 'Brush and Dough Styles'}
            </span>
            <button
              onClick={() => setActiveDrawer('none')}
              className="w-5 h-5 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-black active:scale-90"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* 1. COLOR DRAWER */}
          {activeDrawer === 'color' && (
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-6 gap-2">
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
                      className={`relative w-8 h-8 rounded-full border-2 border-black flex items-center justify-center transition-all active:scale-90 ${
                        isSelected ? 'ring-2 ring-black ring-offset-1 scale-110' : ''
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-4 h-4 ${
                            c.hex === '#FFFFFF' || c.hex === '#FACC15'
                              ? 'text-black'
                              : 'text-white'
                          } stroke-[3]`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom Color Input */}
              <label className="flex items-center justify-center gap-1.5 py-1 px-2 rounded-xl bg-white border-2 border-black cursor-pointer text-[11px] font-black text-black active:translate-y-0.5">
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

          {/* 2. SIZE DRAWER */}
          {activeDrawer === 'size' && (
            <div className="flex items-center justify-between gap-2 py-1">
              {[
                { id: 'small' as KidBrushSize, label: 'Thin', dot: 'w-2 h-2' },
                { id: 'medium' as KidBrushSize, label: 'Medium', dot: 'w-3.5 h-3.5' },
                { id: 'big' as KidBrushSize, label: 'Thick', dot: 'w-5 h-5' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectSize(s.id);
                    onSelectBrush();
                    setActiveDrawer('none');
                  }}
                  className={`flex-1 py-2 rounded-xl border-2 border-black flex flex-col items-center justify-center gap-1 transition-all active:translate-y-0.5 ${
                    currentSize === s.id && !isEraser
                      ? 'bg-amber-300 text-black font-black'
                      : 'bg-white text-black font-bold hover:bg-neutral-50'
                  }`}
                >
                  <div className={`rounded-full bg-black ${s.dot}`} />
                  <span className="text-[11px]">{s.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* 3. BRUSH & DOUGH DRAWER */}
          {activeDrawer === 'brush' && (
            <div className="flex flex-col gap-2 max-h-[42vh] overflow-y-auto">
              {/* Style choice */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onToggleStrokeStyle('3d_tube');
                    onSelectShader('clay');
                    onSelectBrush();
                  }}
                  className={`flex-1 py-1.5 rounded-xl border-2 border-black text-xs font-black flex items-center justify-center gap-1 active:translate-y-0.5 ${
                    strokeStyle === '3d_tube' && currentShader === 'clay'
                      ? 'bg-amber-300 text-black'
                      : 'bg-white text-black'
                  }`}
                >
                  <span>🧽</span>
                  <span>3D Tube</span>
                </button>

                <button
                  onClick={() => {
                    onToggleStrokeStyle('flat_ribbon');
                    onSelectShader('clay');
                    onSelectBrush();
                  }}
                  className={`flex-1 py-1.5 rounded-xl border-2 border-black text-xs font-black flex items-center justify-center gap-1 active:translate-y-0.5 ${
                    strokeStyle === 'flat_ribbon' && currentShader === 'clay'
                      ? 'bg-amber-300 text-black'
                      : 'bg-white text-black'
                  }`}
                >
                  <span>✒️</span>
                  <span>Marker</span>
                </button>
              </div>

              {/* Shaders grid */}
              <div className="text-[10px] font-black uppercase text-neutral-600 px-0.5 mt-1">
                Play-Doh and Magic Dough:
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {SHADER_PRESETS.slice(0, 6).map((shader) => {
                  const isSelected = currentShader === shader.id && !isEraser;
                  return (
                    <button
                      key={shader.id}
                      onClick={() => {
                        onSelectShader(shader.id);
                        onSelectBrush();
                        setActiveDrawer('none');
                      }}
                      className={`p-1 rounded-xl border-2 border-black flex flex-col items-center justify-center text-center active:translate-y-0.5 ${
                        isSelected
                          ? 'bg-amber-300 text-black font-black'
                          : 'bg-white text-black font-bold'
                      }`}
                    >
                      <span className="text-base">{shader.icon}</span>
                      <span className="text-[9px] line-clamp-1">{shader.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Mobile Bottom Dock */}
      <nav
        aria-label="Mobile Controls"
        className="fixed bottom-2.5 left-1/2 -translate-x-1/2 w-[94%] max-w-sm z-30 bg-white border-2 border-black rounded-2xl px-1.5 py-1 shadow-md flex items-center justify-around select-none pointer-events-auto md:hidden"
      >
        {/* 1. Surface / Air Toggle */}
        <button
          onClick={onToggleAirDrawing}
          title={allowAirDrawing ? 'Mode: Draw in Air + Surface' : 'Mode: Surface Only'}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-95 ${
            allowAirDrawing
              ? 'bg-amber-100 text-amber-950 font-black'
              : 'text-neutral-800 hover:bg-neutral-100'
          }`}
        >
          <Layers className="w-5 h-5 stroke-[2.4]" />
          <span className="text-[9px] font-black mt-0.5">
            {allowAirDrawing ? 'Air' : 'Surface'}
          </span>
        </button>

        {/* 2. Erase Toggle */}
        <button
          onClick={() => {
            if (isEraser) {
              onSelectBrush();
            } else {
              onSelectEraser();
              setActiveDrawer('none');
            }
          }}
          title="Eraser"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-95 ${
            isEraser
              ? 'bg-[#2563EB] text-white font-black ring-2 ring-inset ring-black'
              : 'text-neutral-800 hover:bg-neutral-100'
          }`}
        >
          <Eraser className="w-5 h-5 stroke-[2.4]" />
          <span className="text-[9px] font-black mt-0.5">Erase</span>
        </button>

        {/* 3. Color Swatch */}
        <button
          onClick={() => handleToggleDrawer('color')}
          title="Choose Color"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-95 ${
            activeDrawer === 'color' ? 'bg-amber-100' : 'hover:bg-neutral-100'
          }`}
        >
          <div
            className="w-5 h-5 rounded-full border-2 border-black"
            style={{ backgroundColor: activeColor }}
          />
          <span className="text-[9px] font-black text-neutral-800 mt-0.5">Color</span>
        </button>

        {/* 4. Brush Size */}
        <button
          onClick={() => handleToggleDrawer('size')}
          title="Choose Size"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-95 ${
            activeDrawer === 'size' ? 'bg-amber-100' : 'hover:bg-neutral-100'
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <div
              className={`rounded-full bg-black ${
                currentSize === 'small'
                  ? 'w-2 h-2'
                  : currentSize === 'medium'
                  ? 'w-3 h-3'
                  : 'w-4 h-4'
              }`}
            />
          </div>
          <span className="text-[9px] font-black text-neutral-800 mt-0.5">Size</span>
        </button>

        {/* 5. Brush & Dough Style */}
        <button
          onClick={() => handleToggleDrawer('brush')}
          title="Brush and Play-Doh Styles"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-95 ${
            !isEraser && activeDrawer === 'brush'
              ? 'bg-amber-100'
              : 'text-neutral-800 hover:bg-neutral-100'
          }`}
        >
          <Paintbrush className="w-5 h-5 stroke-[2.4]" />
          <span className="text-[9px] font-black mt-0.5">Brush</span>
        </button>

        {/* 6. Orbit / D-Pad Toggle */}
        <button
          onClick={onToggleCameraControls}
          title={showCameraControls ? 'Hide Camera Controls' : 'Show Camera Controls'}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-95 ${
            showCameraControls
              ? 'bg-cyan-100 text-cyan-950 font-black'
              : 'text-neutral-800 hover:bg-neutral-100'
          }`}
        >
          <Compass className="w-5 h-5 stroke-[2.4]" />
          <span className="text-[9px] font-black mt-0.5">Orbit</span>
        </button>
      </nav>
    </>
  );
};
