<script lang="ts">
  console.log("%cI have no idea what I'm doing xD\n%cSvelteKit | Threlte | Iconify | Melt UI | Vercel", "color: red; font-weight: bold; font-size: 2em;", "color: white; font-size: 1.2em;");
  
  import { T, useThrelte, useTask } from '@threlte/core'
  import { ContactShadows, Float, OrbitControls, interactivity, Text, HTML } from '@threlte/extras'
	import { CircleGeometry, Object3D, type MeshStandardMaterial, type PerspectiveCamera } from 'three';
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import Cube from './models/cube.svelte';
	import SocialIcon from './SocialIcon.svelte';

  interactivity();

  const { size } = useThrelte();
  let fov = $size.width < 850 ? 80 : 60;
  $: fov = $size.width < 850 ? 80 : 60;

  let cube_rotation = 0;
  useTask((delta) => {
    cube_rotation += delta;
  });

  const browser_lang = navigator.language.substr(0, 2);

  interface LangText {
    title: string,
    paragraph: string
  };

  interface Text {
    [key : string] : LangText
  };

  let text : Text = {
    pt: {
      title: "Em desenvolvimento",
      paragraph: "Já que veio até aqui, confira também minhas redes sociais:"
     } ,
    en: {
      title: "Under construction",
      paragraph: "Since you are here, you might as well take a look at my socials:"
    }
  };
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-20, 0, 30]}
  {fov}
>
  <OrbitControls />

</T.PerspectiveCamera>

<T.DirectionalLight
  color={"white"}
  intensity={1}
  scale={.05}
  position={[10, 10, 10]}
/>
<T.AmbientLight intensity={5} />

<ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5}
/>

<Cube rotation.y={cube_rotation} position={[0, 7, 0]} />

<Float
  rotationSpeed={[0, 1, 0]}
  rotationIntensity={[0, 1, 0]}>
  <Float
    floatIntensity={.5}
    floatingRange={[0, .5]}>
    <Text
      text={text[browser_lang].title}
      anchorX="center"
      anchorY="center"
      position.y={5}
      position.x={0}
      fontSize={2}
      color="orange"
    />
  </Float>
  <Float
    floatIntensity={.5}
    floatingRange={[0, .5]}
  >
    <Text
      text={text[browser_lang].paragraph}
      maxWidth={15}
      fontWeight="bold"
      textAlign="center"
      anchorX="center"
      anchorY="center"
      position.y={2}
      position.x={0}
      fontSize={.8}
      color="white"
    />
  </Float>

  <HTML transform position.y={-3}>
    <div id="socials">
      <SocialIcon title="Github" hover_color="gray" icon="simple-icons:github" url="https://github.com/uiriansan" />
      <SocialIcon title="Linkedin" hover_color="#0A66C2" icon="simple-icons:linkedin" url="https://www.linkedin.com/in/uiriansan/" />
      <SocialIcon title="Facebook" hover_color="#0165E1" icon="simple-icons:facebook" url="https://facebook.com/uirian" />
      <SocialIcon title="Spotify" hover_color="#1ED760" icon="simple-icons:spotify" url="https://open.spotify.com/user/williansantosnt?si=7738eace4bc548f5" />
      <SocialIcon title="AniList" hover_color="#02a9ff" icon="simple-icons:anilist" url="https://anilist.co/user/uiriansan" />
      <SocialIcon title="Steam" hover_color="#1381b2" icon="simple-icons:steam" url="https://steamcommunity.com/id/uiriansan/" />
    </div>
  </HTML>
</Float>
<T.Mesh scale={50} position={[0, -8, 0]} width={500} height={500} rotation={[-90*DEG2RAD, 0, 0]} >
  <T.CircleGeometry radius={100} segments={32} />
  <T.MeshStandardMaterial color={"#090d16"} />
</T.Mesh>


<style>  
  #socials {
    display: flex;
    text-align: center;
    flex-direction: row;
    gap: 50px;
  }
</style>
