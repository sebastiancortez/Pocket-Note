<script>
  import { T, useTask } from "@threlte/core";
  import { interactivity } from "@threlte/extras";
  import { createNoise2D } from "simplex-noise";
  import { spring } from "svelte/motion";
  import { DirectionalLight, PlaneGeometry } from "three";
  import { DEG2RAD } from "three/src/math/MathUtils.js";

  interactivity();
  const scale = spring(1);

  let rotation = 0;
  useTask((delta) => {
    rotation += delta * 1;
  });

  const noise = createNoise2D();
  const geometry = new PlaneGeometry(10, 10, 100, 100);
  const vertices = geometry.getAttribute("position").array;

  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const y = vertices[i + 1];
    // @ts-ignore
    vertices[i + 2] = noise(x / 4, y / 4);
  }

  geometry.computeVertexNormals();
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  oncreate={({ ref }) => {
    ref.lookAt(0, 1, 0);
  }}
/>

<T.DirectionalLight position={[0, 10, 10]} intensity={1.5} />

<!-- <T.Mesh
  position.y={1}
  scale={$scale}
  onpointerenter={() => scale.set(1.5)}
  onpointerout={() => scale.set(1)}
> -->
<!-- <T.BoxGeometry args={[1, 2, 1]} /> -->
<T.Mesh {geometry} rotation.x={DEG2RAD * -90}>
  <T.MeshNormalMaterial />
</T.Mesh>
