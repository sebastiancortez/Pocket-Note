<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { Gizmo, interactivity, OrbitControls } from "@threlte/extras";
  import { createNoise2D } from "simplex-noise";
  import { spring } from "svelte/motion";
  import { DirectionalLight, PlaneGeometry } from "three";
  import { DEG2RAD } from "three/src/math/MathUtils.js";

  interactivity();
  const scale = spring(1);

  let time = 0;
  const noise2D = createNoise2D();
  const geometry = new PlaneGeometry(10, 10, 200, 200);
  const vertices = geometry.getAttribute("position").array;

  // New time-dependent noise function
  function noise(x: number, y: number, t: number): number {
    return noise2D(x, y) + noise2D(x + t, y + t) * 0.5;
  }

  // Initial noise-based z-coordinates
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const y = vertices[i + 1];
    vertices[i + 2] = noise(x / 4, y, time);
  }

  geometry.computeVertexNormals();

  useTask((delta) => {
    time += delta * 0.5; // Adjust speed of wave

    // Update z-coordinates to create wave effect
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      vertices[i + 2] = noise(x / 4, y / 4, time);
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  });
</script>

<!-- <T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  oncreate={({ ref }) => {
    ref.lookAt(0, 1, 0);
  }}
/> -->

<T.PerspectiveCamera makeDefault position={[10, 10, 10]} lookAt.y={1}>
  <OrbitControls enableDamping zoomToCursor enableZoom />
</T.PerspectiveCamera>

<Gizmo />

<T.DirectionalLight position={[0, 10, 10]} intensity={1.5} />

<T.Mesh {geometry} rotation.x={DEG2RAD * -90}>
  <T.MeshNormalMaterial />
</T.Mesh>
