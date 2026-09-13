import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { ALL_MATERIAL_PRESETS } from '../../presets/materialPresets';
import { resolveAssetUrl } from '../../utils/assetUrl';

// Install Three-Mesh-BVH for 100x accelerated raycasting
if (!('computeBoundsTree' in THREE.BufferGeometry.prototype)) {
  (THREE.BufferGeometry.prototype as any).computeBoundsTree = computeBoundsTree;
  (THREE.BufferGeometry.prototype as any).disposeBoundsTree = disposeBoundsTree;
  (THREE.Mesh.prototype as any).raycast = acceleratedRaycast;
}

export interface KidToyModel {
  id: string;
  name: string;
  file: string;
  badge: string;
}

export const CUTE_TOY_MODELS: KidToyModel[] = [
  // Capybara
  {
    id: 'capybara',
    name: 'Happy Capybaras',
    file: 'models/two_happy_capybaras.glb',
    badge: '🐾',
  },
  // Pusheen collection
  {
    id: 'pusheen',
    name: 'Classic Pusheen',
    file: 'models/pusheen.glb',
    badge: '🐱',
  },
  {
    id: 'pusheen_noodles',
    name: 'Pusheen & Noodles',
    file: 'models/pusheen_vs_noodle.glb',
    badge: '🍜',
  },
  {
    id: 'pusheen_baker',
    name: 'Baker Pusheen',
    file: 'models/Meshy_AI_Pusheen_Baking_Magic_0913065316_texture.glb',
    badge: '🧁',
  },
  {
    id: 'pusheen_cake',
    name: 'Birthday Pusheen',
    file: 'models/Meshy_AI_Pusheen_Cake_Celebrat_0913065248_texture.glb',
    badge: '🎂',
  },
  {
    id: 'pusheen_cool',
    name: 'Cool Pusheen',
    file: 'models/Meshy_AI_Cool_Pusheen_0913045738_texture.glb',
    badge: '😎',
  },
  {
    id: 'pusheen_nurse',
    name: 'Nurse Pusheen',
    file: 'models/Meshy_AI_Nurse_Pusheen_and_Tin_0913064519_texture.glb',
    badge: '🩺',
  },
  // Sanrio favorites
  {
    id: 'kuromi',
    name: 'Kuromi',
    file: 'models/KuromiV2_fixed-compressed.glb',
    badge: '🖤',
  },
  {
    id: 'pompompurin',
    name: 'Pompompurin',
    file: 'models/pom_pom_purin_1.glb',
    badge: '🍮',
  },
  {
    id: 'cinnamoroll',
    name: 'Cinnamoroll',
    file: 'models/cinnamoroll.glb',
    badge: '🐶',
  },
  // Fantasy Friends
  {
    id: 'axolotl',
    name: 'Pink Axolotl',
    file: 'models/Meshy_AI_Cute_Pink_Axolotl_0913051211_texture.glb',
    badge: '🦎',
  },
  {
    id: 'dragon',
    name: 'Bubblegum Dragon',
    file: 'models/Meshy_AI_Bubblegum_Dragon_0913050844_texture.glb',
    badge: '🐲',
  },
  {
    id: 'rainbow_monster',
    name: 'Rainbow Monster',
    file: 'models/Meshy_AI_Rainbow_Plush_Monster_0913045931_texture.glb',
    badge: '🧸',
  },
  {
    id: 'prismatic_snail',
    name: 'Prismatic Snail',
    file: 'models/Meshy_AI_Prismatic_Snail_0913050907_texture.glb',
    badge: '🐌',
  },
  // Pokemon
  {
    id: 'pikachu',
    name: 'Sparky Chu',
    file: 'models/pikachuu.glb',
    badge: '⚡',
  },
  {
    id: 'bulbasaur',
    name: 'Bulbasaur',
    file: 'models/bulbasaur_-_pokemon.glb',
    badge: '🍃',
  },
  {
    id: 'charmander',
    name: 'Charmander',
    file: 'models/charmanderpokemon.glb',
    badge: '🔥',
  },
  {
    id: 'squirtle',
    name: 'Squirtle',
    file: 'models/squirtle.glb',
    badge: '💧',
  },
  {
    id: 'charizard',
    name: 'Charizard',
    file: 'models/charizardpokemon.glb',
    badge: '🐉',
  },
  {
    id: 'ninetales',
    name: 'Ninetales',
    file: 'models/ninetalespokemon.glb',
    badge: '🦊',
  },
  // Cute Kitties & Heroes
  {
    id: 'cat_magician',
    name: 'Tiny Cat Magician',
    file: 'models/Meshy_AI_Tiny_Cat_Magician_0913064508_texture.glb',
    badge: '🪄',
  },
  {
    id: 'nutella_cat',
    name: 'Nutella Cat',
    file: 'models/Meshy_AI_Nutella_Cat_0913065234_texture.glb',
    badge: '🍫',
  },
  {
    id: 'purrouette',
    name: 'Purrouette Ballerina',
    file: 'models/Meshy_AI_Purrouette_0913065347_texture.glb',
    badge: '🩰',
  },
  {
    id: 'whisker_artist',
    name: 'Whisker Artist',
    file: 'models/Meshy_AI_Whisker_Artist_0913064530_texture.glb',
    badge: '🎨',
  },
  {
    id: 'scooter_cat',
    name: 'Scooter Cat',
    file: 'models/Meshy_AI_Scooter_Cat_0913065304_texture.glb',
    badge: '🛵',
  },
  {
    id: 'starry_snuggle',
    name: 'Starry Snuggle',
    file: 'models/Meshy_AI_Starry_Snuggle_0913051226_texture.glb',
    badge: '⭐',
  },
  {
    id: 'baby_goku',
    name: 'Baby Goku Nimbus',
    file: 'models/son_goku_and_kintoun_nimbus.glb',
    badge: '☁️',
  },
  {
    id: 'foxy',
    name: 'Foxy Lankybox',
    file: 'models/foxy_lankybox.glb',
    badge: '🦊',
  },
];

export type KidShaderMode =
  | 'playdoh_swirl'
  | 'synthwave_chrome'
  | 'iridescent_foil'
  | 'fractal_galaxy'
  | 'energy_portal'
  | 'flowers_mandala'
  | 'galaxy_nebula'
  | 'candy_chrome'
  | 'amethyst_crystal'
  | 'clay'
  | 'candy'
  | 'rainbow'
  | 'gold';

export type KidBrushSize = 'small' | 'medium' | 'big';
export type KidStrokeStyle = '3d_tube' | 'flat_ribbon';

const DEFAULT_VERTEX_SHADER = `precision mediump float;
varying vec3 v_normal;
varying vec3 v_position;
varying vec2 v_uv;
void main() {
  v_uv = uv;
  v_normal = normalize(normalMatrix * normal);
  v_position = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const PLAYDOH_VERTEX_SHADER = `
varying vec3 v_world_pos;
varying vec3 v_normal;
varying vec3 v_view_dir;
void main() {
  v_normal = normalize(normalMatrix * normal);
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  v_world_pos = worldPos.xyz;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  v_view_dir = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const PLAYDOH_FRAGMENT_SHADER = `
varying vec3 v_world_pos;
varying vec3 v_normal;
varying vec3 v_view_dir;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                 mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                 mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}

float fbm(vec3 p) {
  float v = 0.0;
  v += 0.50 * noise(p); p *= 2.02;
  v += 0.25 * noise(p); p *= 2.03;
  v += 0.125 * noise(p);
  return v;
}

vec3 playdoh_palette(float t) {
  vec3 cRed = vec3(0.96, 0.22, 0.20);
  vec3 cYellow = vec3(1.0, 0.85, 0.06);
  vec3 cGreen = vec3(0.24, 0.78, 0.32);
  vec3 cBlue = vec3(0.08, 0.52, 0.96);
  vec3 cPurple = vec3(0.68, 0.26, 0.88);
  vec3 cOrange = vec3(1.0, 0.52, 0.08);

  float f = fract(t);
  if (f < 0.166) return mix(cRed, cOrange, smoothstep(0.0, 0.166, f));
  if (f < 0.333) return mix(cOrange, cYellow, smoothstep(0.166, 0.333, f));
  if (f < 0.500) return mix(cYellow, cGreen, smoothstep(0.333, 0.500, f));
  if (f < 0.666) return mix(cGreen, cBlue, smoothstep(0.500, 0.666, f));
  if (f < 0.833) return mix(cBlue, cPurple, smoothstep(0.666, 0.833, f));
  return mix(cPurple, cRed, smoothstep(0.833, 1.0, f));
}

void main() {
  vec3 p = v_world_pos * 5.0;
  vec3 q = vec3(fbm(p), fbm(p + vec3(4.3, 1.2, 2.7)), fbm(p + vec3(1.5, 7.8, 3.4)));
  float swirl = fbm(p + 3.2 * q);

  vec3 albedo = playdoh_palette(swirl * 2.2 + v_world_pos.y * 0.8);

  vec3 lightDir = normalize(vec3(0.5, 0.85, 0.6));
  float diff = max(dot(v_normal, lightDir), 0.0);
  float softDiff = diff * 0.6 + 0.4;
  float microGrain = (noise(v_world_pos * 80.0) - 0.5) * 0.07;
  float fresnel = pow(1.0 - max(dot(v_normal, v_view_dir), 0.0), 2.5);
  vec3 rimColor = vec3(1.0, 0.96, 0.88);

  vec3 finalColor = albedo * (softDiff + microGrain) + rimColor * (fresnel * 0.15);
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const RAINBOW_VERTEX_SHADER = `
varying vec3 v_normal;
varying vec3 v_view_dir;
void main() {
  v_normal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  v_view_dir = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const RAINBOW_FRAGMENT_SHADER = `
uniform float u_time;
varying vec3 v_normal;
varying vec3 v_view_dir;

vec3 rainbow(float t) {
  return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
}

void main() {
  float fresnel = 1.0 - max(dot(v_normal, v_view_dir), 0.0);
  float t = fresnel * 2.5 + u_time * 0.9 + v_normal.y * 1.5;
  vec3 col = rainbow(t);
  gl_FragColor = vec4(col, 1.0);
}
`;

interface StrokeRecord {
  mesh: THREE.Object3D;
  dispose: () => void;
}

export class KidsScene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private modelContainer: THREE.Group;
  private strokesContainer: THREE.Group;
  private pedestalMesh: THREE.Mesh;

  private loader: GLTFLoader;
  private modelMeshes: THREE.Mesh[] = [];
  private strokeHistory: StrokeRecord[] = [];

  // Active settings
  public currentColor: string = '#FF3B30';
  public currentShader: KidShaderMode = 'playdoh_swirl';
  public currentSize: KidBrushSize = 'medium';
  public strokeStyle: KidStrokeStyle = '3d_tube';
  public isEraser: boolean = false;

  // Active stroke drawing state
  private isDrawing: boolean = false;
  private wasRaycastMissing: boolean = false;
  private activePoints: THREE.Vector3[] = [];
  private activeNormals: THREE.Vector3[] = [];
  private activeStrokeMesh: THREE.Mesh | null = null;
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private pointerPos: THREE.Vector2 = new THREE.Vector2();
  private currentDrawingDepth: number = 4.2;

  // Touch orbit state
  private isOrbiting: boolean = false;
  private activePointers: Map<number, { x: number; y: number }> = new Map();
  private lastTouchDistance: number = 0;
  private targetRotationY: number = 0;
  private targetRotationX: number = 0.05;
  public isAutoSpinning: boolean = false;

  // Shader uniforms
  private animatedUniforms: Record<string, { value: any }>[] = [];
  private animFrameId: number | null = null;
  private clock: THREE.Clock = new THREE.Clock();

  // Callbacks
  public onLoadingChange?: (loading: boolean, message?: string) => void;
  public onStrokeCountChange?: (count: number) => void;

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#FAF6EF');

    // 2. Camera
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 0.8, 4.2);
    this.camera.lookAt(0, 0.2, 0);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    // 4. Studio Lighting
    this.setupLighting();

    // 5. Groups
    this.modelContainer = new THREE.Group();
    this.strokesContainer = new THREE.Group();
    this.modelContainer.add(this.strokesContainer);
    this.scene.add(this.modelContainer);

    // 6. Pedestal Stage
    this.pedestalMesh = this.createPedestal();
    this.scene.add(this.pedestalMesh);

    // 7. GLTF Loader with Draco
    this.loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(resolveAssetUrl('draco/gltf/'));
    this.loader.setDRACOLoader(dracoLoader);
    (this.raycaster as any).firstHitOnly = true;

    // 8. Event Listeners
    this.bindEvents();

    // 9. Start Animation Loop
    this.animate = this.animate.bind(this);
    this.animate();
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.4);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.bias = -0.0005;
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.0);
    fillLight.position.set(-4, 3, -2);
    this.scene.add(fillLight);

    const bounceLight = new THREE.DirectionalLight(0xfef3c7, 0.6);
    bounceLight.position.set(0, -3, 2);
    this.scene.add(bounceLight);
  }

  private createPedestal(): THREE.Mesh {
    const geo = new THREE.CylinderGeometry(2.2, 2.3, 0.12, 64);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xeddcc8,
      roughness: 0.92,
      metalness: 0.04,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = -0.82;
    mesh.receiveShadow = true;
    return mesh;
  }

  public getRadius(): number {
    switch (this.currentSize) {
      case 'small':
        return 0.022;
      case 'medium':
        return 0.045;
      case 'big':
        return 0.075;
      default:
        return 0.045;
    }
  }

  private createPresetShaderMaterial(presetId: string): THREE.Material | null {
    const preset = ALL_MATERIAL_PRESETS.find((p: any) => p.id === presetId);
    if (!preset) return null;

    if (preset.vertexShader || preset.fragmentShader) {
      const uniforms: Record<string, { value: any }> = {
        u_time: { value: 0 },
        time: { value: 0 },
        iTime: { value: 0 },
        uTime: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        uSunDir: { value: new THREE.Vector3(0.5, 0.8, 0.3).normalize() },
        u_speed: { value: 1.0 },
      };
      this.animatedUniforms.push(uniforms);
      return new THREE.ShaderMaterial({
        vertexShader: preset.vertexShader || DEFAULT_VERTEX_SHADER,
        fragmentShader: preset.fragmentShader,
        uniforms,
        side: THREE.DoubleSide,
      });
    }

    if (preset.url) {
      const loader = new THREE.TextureLoader();
      const texture = loader.load(resolveAssetUrl(preset.url));
      texture.colorSpace = THREE.SRGBColorSpace;
      return new THREE.MeshMatcapMaterial({ matcap: texture, side: THREE.DoubleSide });
    }

    return null;
  }

  private createStrokeMaterial(): THREE.Material {
    let mat: THREE.Material | null = null;

    // 1. Play-Doh Swirl
    if (this.currentShader === 'playdoh_swirl') {
      mat = new THREE.ShaderMaterial({
        vertexShader: PLAYDOH_VERTEX_SHADER,
        fragmentShader: PLAYDOH_FRAGMENT_SHADER,
        side: THREE.DoubleSide,
      });
    } else {
      // 2. Preset Shaders requested by user
      const presetMap: Record<string, string> = {
        synthwave_chrome: 'blobmixer_synthwave_live',
        iridescent_foil: 'blobmixer_iridescent_live',
        fractal_galaxy: 'live_galaxy_fractal',
        energy_portal: 'live_mystic_portal',
        flowers_mandala: 'live_mind_flowers',
        galaxy_nebula: 'live_simplicity_space',
        candy_chrome: 'magic_candy_chrome',
        amethyst_crystal: 'gem_amethyst',
      };

      if (presetMap[this.currentShader]) {
        mat = this.createPresetShaderMaterial(presetMap[this.currentShader]);
      }
    }

    if (!mat) {
      // 3. Built-in Special Shaders
      if (this.currentShader === 'rainbow') {
        const uniforms = { u_time: { value: 0 } };
        this.animatedUniforms.push(uniforms);
        mat = new THREE.ShaderMaterial({
          vertexShader: RAINBOW_VERTEX_SHADER,
          fragmentShader: RAINBOW_FRAGMENT_SHADER,
          uniforms,
          side: THREE.DoubleSide,
        });
      } else if (this.currentShader === 'gold') {
        mat = new THREE.MeshStandardMaterial({
          color: 0xffd700,
          roughness: 0.22,
          metalness: 0.92,
          side: THREE.DoubleSide,
        });
      } else if (this.currentShader === 'candy') {
        mat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(this.currentColor),
          roughness: 0.1,
          metalness: 0.05,
          clearcoat: 1.0,
          clearcoatRoughness: 0.08,
          side: THREE.DoubleSide,
        });
      } else {
        // Default: 'clay'
        mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(this.currentColor),
          roughness: 0.92,
          metalness: 0.02,
          side: THREE.DoubleSide,
        });
      }
    }

    mat.polygonOffset = true;
    mat.polygonOffsetFactor = -1.0;
    mat.polygonOffsetUnits = -2.0;

    return mat;
  }

  public async loadModel(url: string): Promise<void> {
    this.onLoadingChange?.(true, 'Loading cute toy...');
    this.clearAllStrokes();

    const targetUrl = resolveAssetUrl(url);

    return new Promise((resolve, reject) => {
      this.loader.load(
        targetUrl,
        (gltf) => {
          const toRemove: THREE.Object3D[] = [];
          this.modelContainer.children.forEach((child) => {
            if (child !== this.strokesContainer) {
              toRemove.push(child);
            }
          });
          toRemove.forEach((child) => this.modelContainer.remove(child));
          this.modelMeshes = [];

          const model = gltf.scene;

          const bbox = new THREE.Box3().setFromObject(model);
          const size = new THREE.Vector3();
          bbox.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const targetScale = 1.9 / (maxDim || 1);
          model.scale.setScalar(targetScale);

          bbox.setFromObject(model);
          const center = new THREE.Vector3();
          bbox.getCenter(center);
          model.position.x = -center.x;
          model.position.z = -center.z;
          model.position.y = -bbox.min.y - 0.52;

          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              if (mesh.geometry) {
                try {
                  (mesh.geometry as any).computeBoundsTree?.();
                } catch {
                  // Ignore if non-indexed or custom geometry
                }
              }
              this.modelMeshes.push(mesh);
            }
          });

          this.modelContainer.add(model);
          this.modelContainer.rotation.set(0.05, 0, 0);
          this.targetRotationY = 0;
          this.targetRotationX = 0.05;
          this.isAutoSpinning = false;
          this.onLoadingChange?.(false);
          resolve();
        },
        undefined,
        (err) => {
          console.error('Failed to load toy model:', err);
          this.onLoadingChange?.(false, 'Failed to load');
          reject(err);
        }
      );
    });
  }

  private bindEvents(): void {
    const el = this.renderer.domElement;
    el.addEventListener('pointerdown', this.onPointerDown.bind(this));
    window.addEventListener('pointermove', this.onPointerMove.bind(this));
    window.addEventListener('pointerup', this.onPointerUp.bind(this));
    window.addEventListener('pointercancel', this.onPointerUp.bind(this));
    el.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
    window.addEventListener('resize', this.onResize.bind(this));
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  private updatePointerCoords(e: PointerEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointerPos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointerPos.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  private onPointerDown(e: PointerEvent): void {
    this.updatePointerCoords(e);
    this.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    const isStylus = e.pointerType === 'pen';
    const isMouse = e.pointerType === 'mouse';
    const isTouch = e.pointerType === 'touch';

    // Touch: 1 or 2 fingers orbit the toy
    if (isTouch) {
      if (this.activePointers.size === 1) {
        this.isOrbiting = true;
      } else if (this.activePointers.size === 2) {
        this.isOrbiting = true;
        const pts = Array.from(this.activePointers.values());
        this.lastTouchDistance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      }
      return;
    }

    // Right-click or middle-click or Shift-drag: Orbit
    if (isMouse && (e.button === 2 || e.button === 1 || e.shiftKey)) {
      this.isOrbiting = true;
      return;
    }

    // Left-click or Stylus: DRAW! (On model or spatial 3D in the air!)
    if (isStylus || (isMouse && e.button === 0)) {
      if (this.isEraser) {
        this.handleErase();
        return;
      }

      this.startStrokeAtCurrentPointer();
    }
  }

  private onPointerMove(e: PointerEvent): void {
    const prev = this.activePointers.get(e.pointerId);
    if (!prev) return;

    const deltaX = e.clientX - prev.x;
    const deltaY = e.clientY - prev.y;
    this.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (this.isOrbiting) {
      this.updatePointerCoords(e);
      if (this.activePointers.size === 2) {
        const pts = Array.from(this.activePointers.values());
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (this.lastTouchDistance > 0) {
          const pinchDelta = (this.lastTouchDistance - dist) * 0.006;
          this.camera.position.z = Math.max(2.4, Math.min(6.5, this.camera.position.z + pinchDelta));
        }
        this.lastTouchDistance = dist;
      } else {
        this.targetRotationY += deltaX * 0.009;
        this.targetRotationX = Math.max(-0.25, Math.min(0.28, this.targetRotationX + deltaY * 0.006));
      }
      return;
    }

    if (this.isDrawing) {
      const distPx = Math.hypot(deltaX, deltaY);
      // Interpolate steps every 12px for smooth sampling
      const steps = Math.min(8, Math.max(1, Math.ceil(distPx / 12)));
      const rect = this.renderer.domElement.getBoundingClientRect();

      let addedAnyPoint = false;

      for (let s = 1; s <= steps; s++) {
        const curX = prev.x + (deltaX * s) / steps;
        const curY = prev.y + (deltaY * s) / steps;

        this.pointerPos.x = ((curX - rect.left) / rect.width) * 2 - 1;
        this.pointerPos.y = -((curY - rect.top) / rect.height) * 2 + 1;

        if (this.addPointerSample()) {
          addedAnyPoint = true;
        }
      }

      // Rebuild geometry ONCE per mouse event, NOT inside the inner loop!
      if (addedAnyPoint) {
        this.updateActiveStrokeGeometry();
      }
    }
  }

  private onPointerUp(e: PointerEvent): void {
    this.activePointers.delete(e.pointerId);

    if (this.activePointers.size === 0) {
      this.isOrbiting = false;
      this.lastTouchDistance = 0;
    }

    if (this.isDrawing) {
      this.finishStroke();
    }
  }

  private onWheel(e: WheelEvent): void {
    e.preventDefault();
    this.camera.position.z = Math.max(2.4, Math.min(6.5, this.camera.position.z + e.deltaY * 0.002));
  }

  private raycastModel(): THREE.Intersection | null {
    if (this.modelMeshes.length === 0) return null;
    this.raycaster.setFromCamera(this.pointerPos, this.camera);
    const intersects = this.raycaster.intersectObjects(this.modelMeshes, true);
    return intersects.length > 0 ? intersects[0] : null;
  }

  private handleErase(): void {
    this.raycaster.setFromCamera(this.pointerPos, this.camera);
    const strokeMeshes = this.strokeHistory.map((s) => s.mesh);
    const hits = this.raycaster.intersectObjects(strokeMeshes, true);
    if (hits.length > 0) {
      const hitMesh = hits[0].object;
      const index = this.strokeHistory.findIndex((s) => s.mesh === hitMesh);
      if (index !== -1) {
        const removed = this.strokeHistory.splice(index, 1)[0];
        removed.dispose();
        this.onStrokeCountChange?.(this.strokeHistory.length);
      }
    }
  }

  // --- Stroke Building: Filled 3D Tubes & Conformal Flat Permanent Marker ---

  private startStrokeAtCurrentPointer(): void {
    this.isDrawing = true;
    this.activePoints = [];
    this.activeNormals = [];

    const radius = this.getRadius();
    const invQuat = this.modelContainer.quaternion.clone().invert();

    const hit = this.raycastModel();
    let localPoint: THREE.Vector3;
    let localNormal: THREE.Vector3;

    if (hit) {
      this.currentDrawingDepth = hit.distance;
      const worldNormal = (hit.face?.normal || new THREE.Vector3(0, 1, 0)).clone();
      worldNormal.transformDirection(hit.object.matrixWorld).normalize();
      localNormal = worldNormal.applyQuaternion(invQuat).normalize();

      const lp = this.modelContainer.worldToLocal(hit.point.clone());
      localPoint =
        this.strokeStyle === '3d_tube'
          ? lp.clone().addScaledVector(localNormal, radius * 0.55)
          : lp.clone().addScaledVector(localNormal, 0.007);
    } else {
      // Spatial 3D air drawing at currentDrawingDepth!
      this.raycaster.setFromCamera(this.pointerPos, this.camera);
      const worldAir = this.raycaster.ray.origin
        .clone()
        .addScaledVector(this.raycaster.ray.direction, this.currentDrawingDepth);
      localPoint = this.modelContainer.worldToLocal(worldAir);
      localNormal = this.camera
        .getWorldDirection(new THREE.Vector3())
        .negate()
        .applyQuaternion(invQuat)
        .normalize();
    }

    this.activePoints.push(localPoint);
    this.activeNormals.push(localNormal);

    // Initial dab
    let dotGeo: THREE.BufferGeometry;
    if (this.strokeStyle === '3d_tube') {
      dotGeo = new THREE.SphereGeometry(radius, 14, 14);
    } else {
      dotGeo = new THREE.CylinderGeometry(radius * 1.3, radius * 1.3, 0.012, 16);
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), localNormal);
      dotGeo.applyQuaternion(q);
    }

    const mat = this.createStrokeMaterial();
    this.activeStrokeMesh = new THREE.Mesh(dotGeo, mat);
    this.activeStrokeMesh.position.copy(localPoint);
    this.activeStrokeMesh.castShadow = true;
    this.strokesContainer.add(this.activeStrokeMesh);
  }

  private addPointerSample(): boolean {
    if (!this.isDrawing) return false;

    const radius = this.getRadius();
    const invQuat = this.modelContainer.quaternion.clone().invert();

    const hit = this.raycastModel();
    let point: THREE.Vector3;
    let normal: THREE.Vector3;

    if (hit) {
      this.currentDrawingDepth = hit.distance;
      const worldNormal = (hit.face?.normal || new THREE.Vector3(0, 1, 0)).clone();
      worldNormal.transformDirection(hit.object.matrixWorld).normalize();
      normal = worldNormal.applyQuaternion(invQuat).normalize();

      const lp = this.modelContainer.worldToLocal(hit.point.clone());
      point =
        this.strokeStyle === '3d_tube'
          ? lp.clone().addScaledVector(normal, radius * 0.55)
          : lp.clone().addScaledVector(normal, 0.007);
    } else {
      // Spatial 3D air point
      this.raycaster.setFromCamera(this.pointerPos, this.camera);
      const worldAir = this.raycaster.ray.origin
        .clone()
        .addScaledVector(this.raycaster.ray.direction, this.currentDrawingDepth);
      point = this.modelContainer.worldToLocal(worldAir);
      normal = this.camera
        .getWorldDirection(new THREE.Vector3())
        .negate()
        .applyQuaternion(invQuat)
        .normalize();
    }

    if (this.activePoints.length > 0) {
      const lastPoint = this.activePoints[this.activePoints.length - 1];
      const dist = lastPoint.distanceTo(point);

      // Skip redundant tiny steps
      if (dist < radius * 0.22) {
        return false;
      }
    }

    this.activePoints.push(point);
    this.activeNormals.push(normal);
    return true;
  }

  private updateActiveStrokeGeometry(): void {
    if (!this.activeStrokeMesh || this.activePoints.length < 2) return;

    const radius = this.getRadius();

    if (this.strokeStyle === '3d_tube') {
      const tubeGeo = this.createFilledTubeGeometry(this.activePoints, radius);
      this.activeStrokeMesh.geometry.dispose();
      this.activeStrokeMesh.geometry = tubeGeo;
      this.activeStrokeMesh.position.set(0, 0, 0);
    } else {
      // Permanent marker / surface-hugging flat paint
      const flatGeo = this.buildConformalFlatGeometry(
        this.activePoints,
        this.activeNormals,
        radius * 1.3
      );
      this.activeStrokeMesh.geometry.dispose();
      this.activeStrokeMesh.geometry = flatGeo;
      this.activeStrokeMesh.position.set(0, 0, 0);
    }
  }

  private createFilledTubeGeometry(
    points: THREE.Vector3[],
    radius: number
  ): THREE.BufferGeometry {
    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
    const tubularSegments = Math.max(points.length * 3, 12);
    const radialSegments = 10;

    const tubeGeo = new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false);

    // Spherical Start Cap (100% filled Play-Doh cap)
    const startSphere = new THREE.SphereGeometry(radius, radialSegments, radialSegments);
    startSphere.translate(points[0].x, points[0].y, points[0].z);

    // Spherical End Cap (100% filled Play-Doh cap)
    const lastPt = points[points.length - 1];
    const endSphere = new THREE.SphereGeometry(radius, radialSegments, radialSegments);
    endSphere.translate(lastPt.x, lastPt.y, lastPt.z);

    const merged = mergeGeometries([tubeGeo, startSphere, endSphere], false);
    tubeGeo.dispose();
    startSphere.dispose();
    endSphere.dispose();

    return merged || tubeGeo;
  }

  private buildConformalFlatGeometry(
    points: THREE.Vector3[],
    normals: THREE.Vector3[],
    width: number
  ): THREE.BufferGeometry {
    const vertices: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const count = points.length;

    // 1. Tangents along curve (in modelContainer local space)
    const tangents: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      let t = new THREE.Vector3();
      if (i === 0) {
        t.subVectors(points[1] || points[0], points[0]);
      } else if (i === count - 1) {
        t.subVectors(points[count - 1], points[count - 2]);
      } else {
        t.subVectors(points[i + 1], points[i - 1]);
      }
      if (t.lengthSq() < 1e-6) {
        t.set(1, 0, 0);
      } else {
        t.normalize();
      }
      tangents.push(t);
    }

    // 2. Darboux Surface Frame: strictly outward-pointing, aligned with localNormal
    const smoothedNormals: THREE.Vector3[] = [];
    const binormals: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const origN = (normals[i] || new THREE.Vector3(0, 1, 0)).clone().normalize();
      let t = tangents[i].clone();

      // Project t onto surface tangent plane defined by origN
      t.addScaledVector(origN, -t.dot(origN));
      if (t.lengthSq() < 1e-4) {
        if (i > 0) {
          t.copy(tangents[i - 1]).addScaledVector(origN, -tangents[i - 1].dot(origN));
        }
        if (t.lengthSq() < 1e-4) {
          t.set(1, 0, 0).cross(origN);
          if (t.lengthSq() < 1e-4) t.set(0, 0, 1).cross(origN);
        }
      }
      t.normalize();

      // Binormal in surface tangent plane: b = origN x t
      let b = new THREE.Vector3().crossVectors(origN, t).normalize();

      // Maintain binormal sign continuity along stroke
      if (i > 0 && b.dot(binormals[i - 1]) < 0) {
        b.negate();
      }

      // Exact surface normal from cross product: n = b x t
      let n = new THREE.Vector3().crossVectors(b, t).normalize();

      // Crucial: normal MUST point outward from the toy model (never inward)
      if (n.dot(origN) < 0) {
        n.negate();
        b.negate();
      }

      smoothedNormals.push(n);
      binormals.push(b);
    }

    // 3. Permanent Marker Arched Profile: hugs surface completely
    const segmentsAcross = 5;
    const uSteps = [-1.0, -0.5, 0.0, 0.5, 1.0];
    const baseElevation = 0.007;
    const domePeak = width * 0.16;

    for (let i = 0; i < count; i++) {
      const p = points[i];
      const n = smoothedNormals[i];
      const b = binormals[i];
      const v = i / Math.max(1, count - 1);

      for (let j = 0; j < segmentsAcross; j++) {
        const u = uSteps[j];
        const lateral = u * width;
        const arch = Math.sqrt(Math.max(0, 1.0 - u * u));
        const elevation = baseElevation + domePeak * arch;

        const vertexPos = p.clone().addScaledVector(b, lateral).addScaledVector(n, elevation);
        vertices.push(vertexPos.x, vertexPos.y, vertexPos.z);
        uvs.push((u + 1.0) * 0.5, v);
      }

      if (i < count - 1) {
        for (let j = 0; j < segmentsAcross - 1; j++) {
          const rowCurrent = i * segmentsAcross;
          const rowNext = (i + 1) * segmentsAcross;
          const a = rowCurrent + j;
          const bIdx = rowCurrent + (j + 1);
          const c = rowNext + (j + 1);
          const d = rowNext + j;

          // CCW winding: face normal points outward (+n)
          indices.push(a, bIdx, d);
          indices.push(bIdx, c, d);
        }
      }
    }

    // 4. Rounded Start Cap (dome fan around points[0])
    const startCenterIdx = vertices.length / 3;
    const p0 = points[0];
    const n0 = smoothedNormals[0];
    const t0 = tangents[0];
    const b0 = binormals[0];

    const c0 = p0.clone().addScaledVector(n0, baseElevation + domePeak);
    vertices.push(c0.x, c0.y, c0.z);
    uvs.push(0.5, 0.0);

    const capSteps = 6;
    const startCapIndices: number[] = [];
    for (let step = 0; step <= capSteps; step++) {
      const angle = Math.PI * (step / capSteps);
      const dir = b0.clone().multiplyScalar(Math.cos(angle)).addScaledVector(t0, -Math.sin(angle));
      const pt = p0.clone().addScaledVector(dir, width).addScaledVector(n0, baseElevation);
      const idx = vertices.length / 3;
      vertices.push(pt.x, pt.y, pt.z);
      uvs.push(0.5 + 0.5 * Math.cos(angle), 0.0);
      startCapIndices.push(idx);
    }
    for (let step = 0; step < capSteps; step++) {
      indices.push(startCenterIdx, startCapIndices[step + 1], startCapIndices[step]);
    }

    // 5. Rounded End Cap (dome fan around points[count - 1])
    const endCenterIdx = vertices.length / 3;
    const pEnd = points[count - 1];
    const nEnd = smoothedNormals[count - 1];
    const tEnd = tangents[count - 1];
    const bEnd = binormals[count - 1];

    const cEnd = pEnd.clone().addScaledVector(nEnd, baseElevation + domePeak);
    vertices.push(cEnd.x, cEnd.y, cEnd.z);
    uvs.push(0.5, 1.0);

    const endCapIndices: number[] = [];
    for (let step = 0; step <= capSteps; step++) {
      const angle = Math.PI * (step / capSteps);
      const dir = bEnd.clone().multiplyScalar(-Math.cos(angle)).addScaledVector(tEnd, Math.sin(angle));
      const pt = pEnd.clone().addScaledVector(dir, width).addScaledVector(nEnd, baseElevation);
      const idx = vertices.length / 3;
      vertices.push(pt.x, pt.y, pt.z);
      uvs.push(0.5 - 0.5 * Math.cos(angle), 1.0);
      endCapIndices.push(idx);
    }
    for (let step = 0; step < capSteps; step++) {
      indices.push(endCenterIdx, endCapIndices[step], endCapIndices[step + 1]);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  private finishStroke(): void {
    if (!this.isDrawing) return;
    this.isDrawing = false;

    if (this.activeStrokeMesh) {
      const mesh = this.activeStrokeMesh;
      const record: StrokeRecord = {
        mesh,
        dispose: () => {
          this.strokesContainer.remove(mesh);
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material.dispose();
          }
        },
      };
      this.strokeHistory.push(record);
      this.activeStrokeMesh = null;
      this.onStrokeCountChange?.(this.strokeHistory.length);
    }
    this.activePoints = [];
    this.activeNormals = [];
  }

  public undo(): void {
    if (this.strokeHistory.length === 0) return;
    const last = this.strokeHistory.pop();
    if (last) {
      last.dispose();
      this.onStrokeCountChange?.(this.strokeHistory.length);
    }
  }

  public clearAllStrokes(): void {
    this.strokeHistory.forEach((s) => s.dispose());
    this.strokeHistory = [];
    this.onStrokeCountChange?.(0);
  }

  public resetView(): void {
    this.targetRotationY = 0;
    this.targetRotationX = 0.05;
    this.isAutoSpinning = false;
    this.camera.position.set(0, 0.8, 4.2);
    this.camera.lookAt(0, 0.2, 0);
  }

  public rotateToy(deltaYaw: number, deltaPitch: number): void {
    this.targetRotationY += deltaYaw;
    this.targetRotationX = Math.max(-0.25, Math.min(0.28, this.targetRotationX + deltaPitch));
    this.isAutoSpinning = false;
  }

  public zoomCamera(deltaZoom: number): void {
    const newZ = Math.max(2.4, Math.min(6.5, this.camera.position.z + deltaZoom));
    this.camera.position.z = newZ;
  }

  public toggleAutoSpin(): boolean {
    this.isAutoSpinning = !this.isAutoSpinning;
    return this.isAutoSpinning;
  }

  public takeSnapshot(): string {
    this.renderer.render(this.scene, this.camera);
    return this.renderer.domElement.toDataURL('image/png');
  }

  private onResize(): void {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private animate(): void {
    this.animFrameId = requestAnimationFrame(this.animate);

    const time = this.clock.getElapsedTime();

    if (this.isAutoSpinning && !this.isOrbiting && !this.isDrawing) {
      this.targetRotationY += 0.005;
    }

    this.modelContainer.rotation.y += (this.targetRotationY - this.modelContainer.rotation.y) * 0.12;
    this.modelContainer.rotation.x += (this.targetRotationX - this.modelContainer.rotation.x) * 0.12;

    for (let i = 0; i < this.animatedUniforms.length; i++) {
      const u = this.animatedUniforms[i];
      if (u.u_time) u.u_time.value = time;
      if (u.time) u.time.value = time;
      if (u.iTime) u.iTime.value = time;
      if (u.uTime) u.uTime.value = time;
    }

    this.renderer.render(this.scene, this.camera);
  }

  public dispose(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    window.removeEventListener('resize', this.onResize.bind(this));
    this.clearAllStrokes();
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
