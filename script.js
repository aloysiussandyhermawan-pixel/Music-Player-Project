// Config
const songs = [
  {
    name: "homesick",
    artist: "wave to earth",
    source: "https://files.catbox.moe/33k8lo.mp3",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/71/b6/82/71b6820b-97a2-9968-c5a8-b659103030b1/5054197659843.jpg/300x300bb.webp"
  },
  {
    name: "season",
    artist: "wave to earth",
    source: "https://files.catbox.moe/v833ty.mp3",
    cover: "https://tse3.mm.bing.net/th/id/OIP.mwxgannGi16Ud3iAfhTWEwAAAA?cb=thfc1ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    name: "love",
    artist: "wave to earth",
    source: "https://files.catbox.moe/4z6s8g.mp3",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/71/b6/82/71b6820b-97a2-9968-c5a8-b659103030b1/5054197659843.jpg/300x300bb.webp"
  },
  {
    name: "bad",
    artist: "wave to earth",
    source: "https://files.catbox.moe/y8hznr.mp3",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/71/b6/82/71b6820b-97a2-9968-c5a8-b659103030b1/5054197659843.jpg/300x300bb.webp"
  },
  {
    name: "nuts",
    artist: "Lil Peep (ft. rainy bear)",
    source: "https://files.catbox.moe/gjeheh.mp3",
    cover: "https://images.genius.com/3e3ef9a59380595abbad75bd7cd71dd8.861x861x1.png"
  },
  {
    name: "boy for the weekend",
    artist: "marc indigo",
    source: "https://files.catbox.moe/e1dvcs.mp3",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c8/ad/3c/c8ad3c11-1d28-d6f9-95c0-fdcfe94a214f/artwork.jpg/1200x630wp-60.jpg"
  },
  {
    name: "Once More",
    artist: "d4vd",
    source: "https://files.catbox.moe/wdw1eh.mp3",
    cover: "https://linkstorage.linkfire.com/medialinks/images/1fb3992d-d4ef-44cd-819c-91883720ea42/artwork-600x315.jpg"
  },
  {
    name: "Romantic Homecide",
    artist: "d4vd",
    source: "https://files.catbox.moe/u0znv4.mp3",
    cover: "https://tse4.mm.bing.net/th/id/OIP.03hi-S1n6uShDh9nibkgAQHaHa?cb=thfc1ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    name: "Leave Her",
    artist: "d4vd",
    source: "https://files.catbox.moe/a35q8e.mp3",
    cover: "https://tse3.mm.bing.net/th/id/OIP.nSGvyUFB11gqH6Quj6LCrQHaHa?cb=thfc1ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    name: "My House Is Not A Home",
    artist: "d4vd",
    source: "https://files.catbox.moe/psl0a5.mp3",
    cover: "https://i1.sndcdn.com/artworks-hF4d1gVqZmNi-0-t500x500.jpg"
  },
  {
    name: "Feel It (From Inficible)",
    artist: "d4vd",
    source: "https://files.catbox.moe/somn2q.mp3",
    cover: "https://thafd.bing.com/th/id/OIP._umiq4Gk4qpGnOGl5wyLyQHaHa?w=173&h=180&c=7&r=0&o=7&cb=thfc1&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
  },
];

let currentSongId = 0; 

// Swiper Init
const swiperEl = document.querySelector("swiper-container");
swiperEl.innerHTML = songs
  .map((song) => `<swiper-slide><img src="${song.cover}"></swiper-slide>`)
  .join("");
const swiperParams = {
  initialSlide: currentSongId,
};
Object.assign(swiperEl, swiperParams);
swiperEl.initialize();

// WebGL Background
const fragmentShader = /* glsl */ `
uniform vec3 uTopLeftColor;
uniform vec3 uTopRightColor;
uniform vec3 uBottomLeftColor;
uniform vec3 uBottomRightColor;

vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}

float simplexNoise2D(vec2 v){
const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
vec2 i=floor(v+dot(v,C.yy));
vec2 x0=v-i+dot(i,C.xx);
vec2 i1;
i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
vec4 x12=x0.xyxy+C.xxzz;
x12.xy-=i1;
i=mod289(i);// Avoid truncation effects in permutation
vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))
+i.x+vec3(0.,i1.x,1.));

vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
m=m*m;
m=m*m;
vec3 x=2.*fract(p*C.www)-1.;
vec3 h=abs(x)-.5;
vec3 ox=floor(x+.5);
vec3 a0=x-ox;
m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
vec3 g;
g.x=a0.x*x0.x+h.x*x0.y;
g.yz=a0.yz*x12.xz+h.yz*x12.yw;
return 130.*dot(m,g);
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
vec2 uv=fragCoord/iResolution.xy;

vec3 color=mix(mix(uTopLeftColor,uTopRightColor,uv.x),mix(uBottomLeftColor,uBottomRightColor,uv.x),1.-uv.y);

float noiseAResolution=.5;
float noiseBResolution=1.;
float noiseAVelocity=iTime*.05;
float noiseBVelocity=iTime*.10;
float noiseA=simplexNoise2D(vec2(uv.x*1.5,uv.y*1.5-noiseAVelocity)*noiseAResolution)*.35+.15;
float noiseB=simplexNoise2D(vec2(uv.x+sin(noiseBVelocity*1.50)*.25,uv.y*1.-noiseBVelocity)*noiseBResolution)*.35+.25;
color=mix(color,vec3(noiseA*noiseB),.25);
color=pow(color,vec3(1.3));

vec4 col=vec4(color,1.);

fragColor=col;
}
`;

class Sketch extends kokomi.Base {
  create() {
    const config = {
      topLeft: `#111111`,
      topRight: `#9a18c3`,
      bottomLeft: `#9a18c3`,
      bottomRight: `#5f94e2`,
    };

    this.camera.position.set(0, 0, 1);
    // new kokomi.OrbitControls(this);

    const quad = new kokomi.ScreenQuad(this, {
      fragmentShader,
      shadertoyMode: true,
      uniforms: {
        uTopLeftColor: {
          value: new THREE.Color(config.topLeft),
        },
        uTopRightColor: {
          value: new THREE.Color(config.topRight),
        },
        uBottomLeftColor: {
          value: new THREE.Color(config.bottomLeft),
        },
        uBottomRightColor: {
          value: new THREE.Color(config.bottomRight),
        },
      },
    });
    quad.addExisting();
    quad.mesh.position.z = -10000;
    quad.mesh.renderOrder = -1;
    quad.mesh.frustumCulled = false;
    quad.material.depthWrite = false;
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
};

createSketch();

// Music Player
const swiperSlidesEl = document.querySelectorAll("swiper-slide");
const songEl = document.querySelector(".song");
const songNameEl = document.querySelector(".song-name");
const songArtistEl = document.querySelector(".song-artist");
const progressEl = document.querySelector(".progress");
const playPauseEl = document.querySelector(".play-pause");
const prevIconEl = document.querySelector(".prev-icon");
const nextIconEl = document.querySelector(".next-icon");
const fullscreenIconEl = document.querySelector(".fullscreen-icon");
const updateSongInfo = () => {
  const currentSong = songs[currentSongId];
  songNameEl.textContent = currentSong.name;
  songArtistEl.textContent = currentSong.artist;
  songEl.src = currentSong.source;
};
updateSongInfo();
songEl.addEventListener("timeupdate", () => {
  if (!songEl.paused) {
    progressEl.value = songEl.currentTime;
  }
});
songEl.addEventListener("loadedmetadata", () => {
  progressEl.max = songEl.duration;
  progressEl.value = songEl.currentTime;
});
const playSong = () => {
  songEl.play();
  document.querySelector(".play-icon").classList.add("hidden");
  document.querySelector(".pause-icon").classList.remove("hidden");
};
const pauseSong = () => {
  songEl.pause();
  document.querySelector(".play-icon").classList.remove("hidden");
  document.querySelector(".pause-icon").classList.add("hidden");
};
const playPause = () => {
  if (songEl.paused) {
    playSong();
  } else {
    pauseSong();
  }
};
playPauseEl.addEventListener("click", playPause);
progressEl.addEventListener("input", () => {
  songEl.currentTime = progressEl.value;
});
progressEl.addEventListener("change", () => {
  playSong();
});
const playNewSong = () => {
  updateSongInfo();
  swiperEl.swiper.slideTo(currentSongId);
  playSong();
};
prevIconEl.addEventListener("click", () => {
  currentSongId = (currentSongId - 1 + songs.length) % songs.length;
  playNewSong();
});
nextIconEl.addEventListener("click", () => {
  currentSongId = (currentSongId + 1) % songs.length;
  playNewSong();
});
songEl.addEventListener("ended", () => {
  currentSongId = (swiperEl.swiper.activeIndex + 1) % songs.length;
  playNewSong();
});
swiperEl.addEventListener("swiperslidechange", (event) => {
  const [swiper] = event.detail;
  currentSongId = swiper.activeIndex;
  updateSongInfo();
  playPause();
});
fullscreenIconEl.addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.body.requestFullscreen();
  }
});

// Dof Effect
const getTranslateXYZ = (el) => {
  const style = window.getComputedStyle(el);
  const matrix = new WebKitCSSMatrix(style.transform);
  return {
    x: matrix.m41,
    y: matrix.m42,
    z: matrix.m43,
  };
};

const calcDepth = () => {
  swiperSlidesEl.forEach((slide, i) => {
    const { z } = getTranslateXYZ(slide);
    // console.log({ slide, z });
    slide.style.filter = `blur(${Math.abs(z / 100)}px)`;
    slide.style.opacity = `${Math.max(1 - Math.abs(z / 1600), 0)}`;
  });
};
calcDepth();
const calcDepthRaf = () =>
  window.requestAnimationFrame(() => {
    calcDepth();
    window.requestAnimationFrame(calcDepthRaf);
  });
calcDepthRaf();