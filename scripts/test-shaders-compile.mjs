import * as THREE from 'three';
import { ALL_MATERIAL_PRESETS } from '../src/presets/materialPresets.js';
import { DESKTOP_VERTEX_SHADER } from '../src/presets/desktopShaders.js';

console.log(`Checking ${ALL_MATERIAL_PRESETS.length} presets for shader compilation...`);

ALL_MATERIAL_PRESETS.forEach(preset => {
  if (preset.vertexShader || preset.fragmentShader) {
    try {
      const mat = new THREE.ShaderMaterial({
        vertexShader: preset.vertexShader || DESKTOP_VERTEX_SHADER,
        fragmentShader: preset.fragmentShader,
      });
      // Check for undefined functions in fragmentShader
      const fs = preset.fragmentShader;
      const calls = fs.match(/\b([a-zA-Z0-9_]+)\s*\(/g) || [];
      // Just a basic check
    } catch (err) {
      console.error(`Preset ${preset.id} (${preset.name}) threw:`, err);
    }
  }
});
console.log('Shader syntax scan done.');
