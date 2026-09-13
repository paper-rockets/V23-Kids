import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  KidsScene,
  CUTE_TOY_MODELS,
  KidShaderMode,
  KidBrushSize,
  KidStrokeStyle,
  KidToyModel,
} from './KidsScene';
import { KidsToolbar } from './KidsToolbar';
import { KidsBottomBar } from './KidsBottomBar';
import {
  Save,
  Camera,
  HelpCircle,
  FolderHeart,
  Shapes,
  X,
  Download,
  Trash2,
  Check,
  Search,
  RotateCcw,
  Maximize,
  Minimize,
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface SavedCreation {
  id: string;
  toyId: string;
  toyName: string;
  toyBadge: string;
  image: string;
  date: string;
}

export const KidsApp: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<KidsScene | null>(null);
  const { canInstall, isInstalled, promptInstall } = usePWAInstall();

  // Full Screen State
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as any;
      setIsFullscreen(
        Boolean(
          doc.fullscreenElement ||
            doc.webkitFullscreenElement ||
            doc.mozFullScreenElement ||
            doc.msFullscreenElement
        )
      );
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    const doc = document as any;
    const docEl = document.documentElement as any;

    if (
      !doc.fullscreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.msFullscreenElement
    ) {
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(() => {});
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen().catch(() => {});
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
  }, []);

  // Drawing & Tool States
  const [currentColor, setCurrentColor] = useState<string>('#FF3B30');
  const [currentShader, setCurrentShader] = useState<KidShaderMode>('playdoh_swirl');
  const [currentSize, setCurrentSize] = useState<KidBrushSize>('medium');
  const [strokeStyle, setStrokeStyle] = useState<KidStrokeStyle>('3d_tube');
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [strokeCount, setStrokeCount] = useState<number>(0);

  // Model & Scene States
  const [toyIndex, setToyIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMsg, setLoadingMsg] = useState<string>('Loading toy...');
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);

  // Modals & UI States
  const [showToyGallery, setShowToyGallery] = useState<boolean>(false);
  const [showSavedGallery, setShowSavedGallery] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [toySearchQuery, setToySearchQuery] = useState<string>('');
  const [toyCategoryFilter, setToyCategoryFilter] = useState<string>('all');
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [cameraFlash, setCameraFlash] = useState<boolean>(false);

  // Saved creations from localStorage
  const [savedCreations, setSavedCreations] = useState<SavedCreation[]>(() => {
    try {
      const stored = localStorage.getItem('kids_clay_creations');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const currentToy: KidToyModel = CUTE_TOY_MODELS[toyIndex];

  // Initialize scene
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new KidsScene(containerRef.current);
    sceneRef.current = scene;

    scene.onLoadingChange = (isLoading, msg) => {
      setLoading(isLoading);
      if (msg) setLoadingMsg(msg);
    };

    scene.onStrokeCountChange = (count) => {
      setStrokeCount(count);
    };

    // Load initial toy
    scene.loadModel(CUTE_TOY_MODELS[0].file).catch((err) => {
      console.warn('Could not load first model, trying fallback...', err);
    });

    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  // Sync states to 3D scene
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.currentColor = currentColor;
    sceneRef.current.currentShader = currentShader;
    sceneRef.current.currentSize = currentSize;
    sceneRef.current.strokeStyle = strokeStyle;
    sceneRef.current.isEraser = isEraser;
  }, [currentColor, currentShader, currentSize, strokeStyle, isEraser]);

  // Handle Tool selection
  const handleSelectBrush = useCallback(() => {
    setIsEraser(false);
  }, []);

  const handleSelectEraser = useCallback(() => {
    setIsEraser(true);
  }, []);

  const handleSelectColor = useCallback((color: string) => {
    setCurrentColor(color);
    setIsEraser(false);
  }, []);

  const handleSelectShader = useCallback((shader: KidShaderMode) => {
    setCurrentShader(shader);
    setIsEraser(false);
  }, []);

  const handleSelectSize = useCallback((size: KidBrushSize) => {
    setCurrentSize(size);
    setIsEraser(false);
  }, []);

  // Bottom bar actions
  const handleUndo = useCallback(() => {
    sceneRef.current?.undo();
  }, []);

  const handleClearAll = useCallback(() => {
    sceneRef.current?.clearAllStrokes();
    setStrokeCount(0);
  }, []);

  const handleResetView = useCallback(() => {
    sceneRef.current?.resetView();
    setIsAutoSpinning(false);
  }, []);

  const handleRotateToy = useCallback((yaw: number, pitch: number) => {
    sceneRef.current?.rotateToy(yaw, pitch);
    setIsAutoSpinning(false);
  }, []);

  const handleZoom = useCallback((delta: number) => {
    sceneRef.current?.zoomCamera(delta);
  }, []);

  const handleToggleAutoSpin = useCallback(() => {
    if (sceneRef.current) {
      const active = sceneRef.current.toggleAutoSpin();
      setIsAutoSpinning(active);
    }
  }, []);

  const handleSelectToyIndex = useCallback((idx: number) => {
    setToyIndex(idx);
    setShowToyGallery(false);
    setIsAutoSpinning(false);
    sceneRef.current?.loadModel(CUTE_TOY_MODELS[idx].file);
  }, []);

  const handleNextToy = useCallback(() => {
    const nextIdx = (toyIndex + 1) % CUTE_TOY_MODELS.length;
    handleSelectToyIndex(nextIdx);
  }, [toyIndex, handleSelectToyIndex]);

  // SAVE CREATION (Requested by user)
  const handleSaveCreation = useCallback(() => {
    if (!sceneRef.current) return;
    const dataUrl = sceneRef.current.takeSnapshot();

    const newCreation: SavedCreation = {
      id: Date.now().toString(),
      toyId: currentToy.id,
      toyName: currentToy.name,
      toyBadge: currentToy.badge,
      image: dataUrl,
      date: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [newCreation, ...savedCreations.slice(0, 24)];
    setSavedCreations(updated);
    try {
      localStorage.setItem('kids_clay_creations', JSON.stringify(updated));
    } catch (err) {
      console.warn('LocalStorage full, stored in session memory only', err);
    }

    setSaveToast('Saved to your Gallery! 🎉');
    setTimeout(() => setSaveToast(null), 3000);
  }, [currentToy, savedCreations]);

  // CAMERA SNAPSHOT DOWNLOAD
  const handleSnapDownload = useCallback(() => {
    if (!sceneRef.current) return;
    setCameraFlash(true);
    setTimeout(() => setCameraFlash(false), 350);

    const dataUrl = sceneRef.current.takeSnapshot();
    const link = document.createElement('a');
    link.download = `my-clay-${currentToy.id}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  }, [currentToy]);

  // Delete from saved gallery
  const handleDeleteCreation = (id: string) => {
    const updated = savedCreations.filter((c) => c.id !== id);
    setSavedCreations(updated);
    try {
      localStorage.setItem('kids_clay_creations', JSON.stringify(updated));
    } catch {}
  };

  // Filtered toys for gallery modal
  const filteredToys = CUTE_TOY_MODELS.filter((toy) => {
    const matchesSearch = toy.name.toLowerCase().includes(toySearchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (toyCategoryFilter === 'all') return true;
    if (toyCategoryFilter === 'pusheen') return toy.id.includes('pusheen');
    if (toyCategoryFilter === 'sanrio')
      return ['kuromi', 'pompompurin', 'cinnamoroll'].includes(toy.id);
    if (toyCategoryFilter === 'pokemon')
      return [
        'pikachu',
        'bulbasaur',
        'charmander',
        'squirtle',
        'eevee',
        'snorlax',
        'gengar',
        'mew',
        'jigglypuff',
        'togepi',
        'psyduck',
      ].includes(toy.id);
    if (toyCategoryFilter === 'fantasy')
      return ['capybara', 'axolotl', 'dragon', 'rainbow_monster', 'prismatic_snail', 'goku_nimbus', 'foxy'].includes(
        toy.id
      );
    return true;
  });

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#FAF6EF] font-sans">
      {/* 3D WebGL Viewport */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 touch-none" />

      {/* Camera Flash Screen */}
      {cameraFlash && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none transition-opacity duration-300 animate-out fade-out" />
      )}

      {/* Top Header Navigation (Exact layout from Image 1) */}
      <header
        aria-label="Top Navigation"
        className="absolute top-5 left-6 right-6 flex items-center justify-between z-20 pointer-events-none select-none"
      >
        {/* Top-Left: Clear / Restart Canvas & Undo (No studio access) */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {/* 1. Clear / Delete Canvas to Restart (User requested) */}
          <button
            onClick={() => {
              handleClearAll();
              setSaveToast('Canvas cleared! Start fresh 🎨');
              setTimeout(() => setSaveToast(null), 2500);
            }}
            title="Clear Canvas & Restart"
            className="w-13 h-13 rounded-2xl bg-white hover:bg-rose-50 text-neutral-800 hover:text-rose-600 flex items-center justify-center transition-all border-2 border-black active:translate-y-0.5"
          >
            <Trash2 className="w-6 h-6 stroke-[2.4]" />
          </button>

          {/* 2. Undo Button */}
          <button
            onClick={handleUndo}
            disabled={strokeCount === 0}
            title="Undo Last Stroke"
            className={`w-13 h-13 rounded-2xl border-2 flex items-center justify-center transition-all active:translate-y-0.5 ${
              strokeCount > 0
                ? 'bg-white hover:bg-neutral-100 text-neutral-900 border-black cursor-pointer'
                : 'bg-white text-neutral-300 border-neutral-300 cursor-not-allowed'
            }`}
          >
            <RotateCcw className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Top-Right: Fullscreen (White), Install (Purple), Camera (Green), Save (Blue), Toys (Red) */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {/* Full Screen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
            className="w-13 h-13 rounded-2xl bg-white hover:bg-neutral-100 text-black flex items-center justify-center transition-all border-2 border-black active:translate-y-0.5"
          >
            {isFullscreen ? (
              <Minimize className="w-6 h-6 stroke-[2.5]" />
            ) : (
              <Maximize className="w-6 h-6 stroke-[2.5]" />
            )}
          </button>

          {/* PWA Install Button */}
          {!isInstalled && (
            <button
              onClick={promptInstall}
              title="Install App to Home Screen"
              className="w-13 h-13 rounded-2xl bg-[#9333EA] hover:bg-[#7E22CE] text-white flex items-center justify-center transition-all border-2 border-black active:translate-y-0.5"
            >
              <Download className="w-6 h-6 stroke-[2.5]" />
            </button>
          )}

          {/* 1. Camera Snap Button (Green from Image 1) */}
          <button
            onClick={handleSnapDownload}
            title="Take Photo of Toy"
            className="w-13 h-13 rounded-2xl bg-[#2E9E5B] hover:bg-[#25874D] text-white flex items-center justify-center transition-all border-2 border-black active:translate-y-0.5"
          >
            <Camera className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* 2. Save / Export Button (Blue from Image 1) */}
          <button
            onClick={handleSaveCreation}
            title="Save Creation to Gallery"
            className="w-13 h-13 rounded-2xl bg-[#1E88E5] hover:bg-[#1976D2] text-white flex items-center justify-center transition-all border-2 border-black active:translate-y-0.5"
          >
            <Save className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* 3. Toys / 3D Models Button (Red from Image 1) - Replaced star icon with 3D models/shapes */}
          <button
            onClick={() => setShowToyGallery(true)}
            title="Choose a Cute 3D Toy"
            className="w-13 h-13 rounded-2xl bg-[#E53935] hover:bg-[#D32F2F] text-white flex items-center justify-center transition-all border-2 border-black active:translate-y-0.5"
          >
            <Shapes className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </header>

      {/* Save Success Toast */}
      {saveToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md px-6 py-3 rounded-3xl shadow-2xl border-4 border-purple-300 flex items-center gap-3 animate-bounce">
          <span className="text-2xl">🎉</span>
          <span className="text-sm font-black text-purple-950">{saveToast}</span>
        </div>
      )}

      {/* Left Toolbar with Claymorphic Dock & Flyouts */}
      <KidsToolbar
        isEraser={isEraser}
        onSelectBrush={handleSelectBrush}
        onSelectEraser={handleSelectEraser}
        currentSize={currentSize}
        onSelectSize={handleSelectSize}
        activeColor={currentColor}
        onSelectColor={handleSelectColor}
        currentShader={currentShader}
        onSelectShader={handleSelectShader}
        strokeStyle={strokeStyle}
        onToggleStrokeStyle={setStrokeStyle}
        onOpenToyGallery={() => setShowToyGallery(true)}
        onUndo={handleUndo}
        onClearAll={handleClearAll}
        canUndo={strokeCount > 0}
      />

      {/* 3D Turntable D-Pad and Zoom Controls */}
      <KidsBottomBar
        strokeCount={strokeCount}
        onUndo={handleUndo}
        onClearAll={handleClearAll}
        currentToy={currentToy}
        onNextToy={handleNextToy}
        onOpenToyGallery={() => setShowToyGallery(true)}
        onRotateToy={handleRotateToy}
        onZoom={handleZoom}
        onResetView={handleResetView}
        onToggleAutoSpin={handleToggleAutoSpin}
        isAutoSpinning={isAutoSpinning}
      />

      {/* FULL 28-TOY GALLERY MODAL */}
      {showToyGallery && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-md w-full max-w-2xl rounded-3xl shadow-2xl border-4 border-amber-200 p-6 flex flex-col max-h-[85vh] gap-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧸</span>
                <div>
                  <h2 className="text-lg font-black text-amber-950">Pick a Cute Toy to Paint</h2>
                  <p className="text-xs font-bold text-amber-800/70">
                    28 characters ready for dough and marker painting!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowToyGallery(false)}
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Pills & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1">
                {[
                  { id: 'all', label: 'All Toys (28)' },
                  { id: 'pusheen', label: '🐱 Pusheen' },
                  { id: 'sanrio', label: '🎀 Sanrio' },
                  { id: 'pokemon', label: '⚡ Pokemon' },
                  { id: 'fantasy', label: '🐾 Friends' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setToyCategoryFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all ${
                      toyCategoryFilter === tab.id
                        ? 'bg-amber-400 text-amber-950 shadow-sm border border-amber-500'
                        : 'bg-amber-50 hover:bg-amber-100 text-amber-900/80 border border-amber-200/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-48 flex-shrink-0">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search toys..."
                  value={toySearchQuery}
                  onChange={(e) => setToySearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Toys Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 overflow-y-auto pr-1 py-1">
              {filteredToys.map((toy) => {
                const isCurrent = toy.id === currentToy.id;
                const idx = CUTE_TOY_MODELS.findIndex((t) => t.id === toy.id);

                return (
                  <button
                    key={toy.id}
                    onClick={() => handleSelectToyIndex(idx)}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-150 active:scale-95 border-3 ${
                      isCurrent
                        ? 'bg-amber-100 border-amber-500 shadow-md ring-2 ring-amber-400 scale-102'
                        : 'bg-white hover:bg-amber-50/80 border-amber-100 text-neutral-800'
                    }`}
                  >
                    <span className="text-3xl mb-1.5">{toy.badge}</span>
                    <span className="text-xs font-black text-amber-950 line-clamp-1">{toy.name}</span>
                    {isCurrent && (
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 mt-1 px-2 py-0.5 bg-amber-200/80 rounded-full">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SAVED CREATIONS GALLERY MODAL */}
      {showSavedGallery && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-md w-full max-w-2xl rounded-3xl shadow-2xl border-4 border-purple-200 p-6 flex flex-col max-h-[85vh] gap-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                <div>
                  <h2 className="text-lg font-black text-purple-950">My Saved Artwork</h2>
                  <p className="text-xs font-bold text-purple-800/70">
                    {savedCreations.length} painting{savedCreations.length === 1 ? '' : 's'} saved in your studio
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSavedGallery(false)}
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gallery Grid */}
            {savedCreations.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-3 text-neutral-400">
                <span className="text-4xl">🖼️</span>
                <span className="text-sm font-black text-neutral-600">No saved drawings yet!</span>
                <p className="text-xs max-w-xs text-neutral-500">
                  Paint on any toy, then tap the purple <strong>Save</strong> button in the top right corner!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto pr-1 py-1">
                {savedCreations.map((item) => (
                  <div
                    key={item.id}
                    className="relative bg-white rounded-2xl border-2 border-purple-100 shadow-md p-2 flex flex-col gap-2 group"
                  >
                    <div className="aspect-square rounded-xl bg-amber-50/50 overflow-hidden flex items-center justify-center border border-amber-100/50">
                      <img
                        src={item.image}
                        alt={item.toyName}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex items-center justify-between px-1">
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-black text-purple-950 truncate max-w-[110px]">
                          {item.toyBadge} {item.toyName}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-bold">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <a
                          href={item.image}
                          download={`my-clay-${item.toyId}-${item.id}.png`}
                          title="Download Image"
                          className="w-7 h-7 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center active:scale-90"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDeleteCreation(item.id)}
                          title="Delete"
                          className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center active:scale-90"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* HOW TO PLAY / HELP MODAL */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-md w-full max-w-md rounded-3xl shadow-2xl border-4 border-sky-200 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <h2 className="text-lg font-black text-sky-950">How to Create & Play</h2>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✏️</span>
                <div>
                  <h4 className="font-black text-amber-950 text-xs">Paint on Toy or in the Air</h4>
                  <p className="text-[11px] text-amber-900/80 mt-0.5">
                    Drag your stylus or finger to sculpt 3D dough or permanent marker right onto the toy, or paint in empty space to create crowns, wings, and halos!
                  </p>
                </div>
              </div>

              <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-200 flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🔄</span>
                <div>
                  <h4 className="font-black text-cyan-950 text-xs">3D Turntable D-Pad</h4>
                  <p className="text-[11px] text-cyan-900/80 mt-0.5">
                    Tap the 4 arrow buttons in the bottom right corner to spin and tilt your toy smoothly without moving your drawing hand!
                  </p>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">💾</span>
                <div>
                  <h4 className="font-black text-purple-950 text-xs">Save & Share Anytime</h4>
                  <p className="text-[11px] text-purple-900/80 mt-0.5">
                    Tap the purple <strong>Save</strong> button to keep your creation in your gallery, or tap the green <strong>Snap</strong> camera button to download a photo!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-sm active:scale-95 shadow-md"
            >
              Let's Paint! 🎨
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-[#FAF6EF]/70 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-3 pointer-events-none transition-opacity">
          <div className="w-14 h-14 rounded-full border-4 border-amber-300 border-t-amber-500 animate-spin" />
          <span className="text-sm font-black text-amber-950 tracking-wide">{loadingMsg}</span>
        </div>
      )}
    </div>
  );
};
