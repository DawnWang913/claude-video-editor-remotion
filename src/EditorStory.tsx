import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  cancelRender,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Art, ArtKind, Box, ink, paper, Robot, Star, Txt } from "./Art";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const tween = (t: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(t, [a, b], [x, y], clamp);
const ease = (t: number) => t * t * (3 - 2 * t);
const kinds: ArtKind[] = ["city", "ramen", "dog", "disco"];
const names = ["夜景.mp4", "拉面.mp4", "柴犬.mov", "小克蹦迪.mp4"];
const Thumb: React.FC<{
  kind: ArtKind;
  x: number;
  y: number;
  w: number;
  h: number;
  t?: number;
  label?: string;
  repeat?: number;
}> = ({ kind, x, y, w, h, t = 0, label, repeat = 1 }) => (
  <g>
    <Box
      x={x}
      y={y}
      w={w}
      h={h}
      fill={
        kind === "city"
          ? "#42466a"
          : kind === "dog"
            ? "#b9e3d8"
            : kind === "ramen"
              ? "#f2d984"
              : "#927daf"
      }
      r={6}
    />
    <svg
      x={x + 3}
      y={y + 3}
      width={w - 5}
      height={h - 5}
      viewBox={`0 0 ${repeat * 220} 330`}
      preserveAspectRatio="none"
    >
      {Array.from({ length: repeat }, (_, i) => (
        <g key={i} transform={`translate(${i * 220} 0)`}>
          <Art kind={kind} t={t} />
        </g>
      ))}
    </svg>
    {label && (
      <g>
        <rect
          x={x + 5}
          y={y + 4}
          width={Math.min(w - 10, label.length * 9 + 9)}
          height="17"
          rx="6"
          fill="#faf7e9"
        />
        <Txt x={x + 10} y={y + 17} size={12}>
          {label}
        </Txt>
      </g>
    )}
  </g>
);
const Materials: React.FC<{ t: number }> = ({ t }) => {
  const tab = t < 8 ? 0 : t < 11.7 ? 1 : 2;
  return (
    <g>
      <Box x={28} y={65} w={250} h={322} />
      {["素材", "转场", "文字"].map((s, i) => (
        <g key={s}>
          <Box
            x={39 + i * 77}
            y={75}
            w={70}
            h={26}
            fill={tab === i ? "#f3d06c" : paper}
            r={5}
            sw={1.7}
          />
          <Txt x={74 + i * 77} y={94} size={17} anchor="middle">
            {s}
          </Txt>
        </g>
      ))}
      {tab === 0 ? (
        <g>
          {kinds.map((kind, i) => {
            const x = 41 + (i % 2) * 118,
              y = 112 + Math.floor(i / 2) * 95;
            return (
              <g key={kind}>
                <Thumb kind={kind} x={x} y={y} w={107} h={65} />
                <Txt x={x + 53} y={y + 80} size={13} anchor="middle">
                  {names[i]}
                </Txt>
              </g>
            );
          })}
          {[41, 159].map((x) => (
            <g key={x}>
              <rect
                x={x}
                y="306"
                width="106"
                height="57"
                rx="5"
                fill="none"
                stroke="#aaa69b"
                strokeDasharray="4 5"
              />
              <Txt x={x + 53} y={344} size={34} fill="#aaa69b" anchor="middle">
                +
              </Txt>
              <Txt x={x + 53} y={379} size={12} fill="#aaa69b" anchor="middle">
                导入素材
              </Txt>
            </g>
          ))}
        </g>
      ) : tab === 1 ? (
        <g>
          {["旋转", "翻页", "故障", "缩放", "滑动", "溶解"].map((s, i) => {
            const x = 41 + (i % 2) * 118,
              y = 114 + Math.floor(i / 2) * 86;
            return (
              <g key={s}>
                <Box
                  x={x}
                  y={y}
                  w={107}
                  h={61}
                  fill={
                    [
                      "#dad4ec",
                      "#d9e9de",
                      "#eddcde",
                      "#cfe7ed",
                      "#f7eac0",
                      "#e9e4dc",
                    ][i]
                  }
                  r={6}
                  sw={2}
                />
                <Txt
                  x={x + 54}
                  y={y + 43}
                  size={34}
                  fill={i % 2 ? "#696f82" : "#66ad9e"}
                  anchor="middle"
                  bold
                >
                  {["↻", "▤", "▣", "⊕", "➜", "▧"][i]}
                </Txt>
                <Txt x={x + 54} y={y + 76} size={15} anchor="middle">
                  {s}
                </Txt>
              </g>
            );
          })}
        </g>
      ) : (
        <g>
          {["前方高能", "好耶～", "霓虹 NEON"].map((s, i) => (
            <g key={s}>
              <Box
                x={40}
                y={113 + i * 85}
                w={225}
                h={75}
                fill={["#fff4d3", "#f8e3ea", "#2b2539"][i]}
                r={7}
                sw={2}
              />
              <Txt
                x={151}
                y={160 + i * 85}
                size={i === 2 ? 26 : 29}
                anchor="middle"
                bold
                fill={["#f2ce67", "#ce789a", "#f8d9ff"][i]}
                outline={i === 0}
              >
                {s}
              </Txt>
            </g>
          ))}
        </g>
      )}
    </g>
  );
};
const Adjustments: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <Box x={1000} y={65} w={251} h={322} />
    <Txt x={1017} y={94} size={24}>
      调整 ✧
    </Txt>
    <path d="M1017 105 H1233" stroke="#a5a193" />
    {["闪光", "饱和度", "缩放冲击", "速度"].map((label, i) => {
      let v = [0, 0.37, 0, 0.5][i];
      if (t > 16)
        v = [
          tween(t, 16, 17.5, 0, 0.9),
          tween(t, 17.5, 19.4, 0.37, 0.18),
          tween(t, 18, 20, 0, 0.6),
          0.5,
        ][i];
      if (t > 21) v = [0.7, 0.37, 0.6, 0.5][i];
      const y = 142 + i * 65;
      return (
        <g key={label}>
          <Txt x={1018} y={y - 16} size={17}>
            {label}
          </Txt>
          <Txt x={1232} y={y - 16} size={13} fill="#7e7b72" anchor="end">
            {i === 3 ? "1.0x" : `${Math.round(v * (i === 1 ? 300 : 100))}%`}
          </Txt>
          <rect
            x="1020"
            y={y}
            width="211"
            height="7"
            rx="3"
            fill="#e9e6db"
            stroke={ink}
            strokeWidth="1.5"
          />
          <rect
            x="1021"
            y={y + 1}
            width={Math.max(0, 209 * v)}
            height="5"
            rx="3"
            fill="#75b7a8"
          />
          <circle
            cx={1020 + 211 * v}
            cy={y + 3}
            r="9"
            fill="#fffdf4"
            stroke={ink}
            strokeWidth="2"
          />
          <circle cx={1020 + 211 * v} cy={y + 3} r="1.5" fill="#8c9384" />
        </g>
      );
    })}
  </g>
);
const playback = (t: number) =>
  t < 5
    ? 0
    : t < 8
      ? tween(t, 5, 8, 0, 2.4)
      : t < 11.7
        ? tween(t, 8, 11.7, 2.4, 5)
        : t < 16
          ? tween(t, 11.7, 16, 5, 7)
          : tween(t, 16, 25, 7, 10.5);
const Timeline: React.FC<{ t: number }> = ({ t }) => {
  const count = t < 2.35 ? 0 : t < 3.2 ? 1 : t < 3.7 ? 2 : t < 4.2 ? 3 : 4;
  const starts = [0, 190, 380, 570],
    widths = [188, 188, 188, 226];
  const py = 480,
    px = 99 + playback(t) * 74;
  return (
    <g>
      <Box x={28} y={398} w={1224} h={298} />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="91"
          y={449 + i * 64}
          width="1148"
          height={i === 1 ? 72 : 40}
          rx="3"
          fill={i % 2 ? "#ebe8e1" : "#f0ede6"}
        />
      ))}
      <path d="M92 440 H1239" stroke="#77746a" strokeWidth="1.5" />
      {Array.from({ length: 65 }, (_, i) => (
        <g key={i}>
          <path
            d={`M${99 + i * 17.7} 440 v${i % 4 === 0 ? -17 : -6}`}
            stroke="#898579"
          />
          {i % 8 === 0 && (
            <Txt
              x={99 + i * 17.7}
              y={418}
              size={13}
              anchor="middle"
              fill="#77746e"
            >
              0:{String(i / 4).padStart(2, "0")}
            </Txt>
          )}
        </g>
      ))}
      {["T", "▶", "♪"].map((s, i) => (
        <g key={s}>
          <Box
            x={40}
            y={454 + i * 61}
            w={35}
            h={i === 1 ? 65 : 35}
            fill={["#fff2c9", "#d5ece1", "#e5dfee"][i]}
            r={6}
            sw={2}
          />
          <Txt x={57} y={479 + i * 61} size={i === 2 ? 28 : 22} anchor="middle">
            {s}
          </Txt>
        </g>
      ))}
      {kinds.slice(0, count).map((kind, i) => (
        <Thumb
          key={kind}
          kind={kind}
          x={99 + starts[i]}
          y={py + 24}
          w={widths[i]}
          h={69}
          repeat={i === 3 ? 4 : 3}
          label={names[i]}
        />
      ))}
      {t > 4.5 && (
        <g>
          <Box x={99} y={586} w={1038} h={37} fill="#eee9f5" r={6} sw={1.7} />
          <Txt x={109} y={599} size={12}>
            ♪ bgm_小克.wav
          </Txt>
          {Array.from({ length: 287 }, (_, i) => {
            const h =
              5 + Math.abs(Math.sin(i * 1.37) * Math.sin(i * 0.29)) * 20;
            return (
              <path
                key={i}
                d={`M${105 + i * 3.58} ${608 - h / 2} v${h}`}
                stroke="#9b87c2"
                strokeWidth="1.6"
              />
            );
          })}
        </g>
      )}
      {t > 11.8 && (
        <g>
          <Box x={479} y={455} w={188} h={27} fill="#f5d274" r={5} sw={2} />
          <Txt x={488} y={474} size={14}>
            T {t > 14 ? "前方高能预警" : "前方高能"}
          </Txt>
        </g>
      )}
      {t > 8.4 &&
        [289, 479, 669].map((x, i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={539}
              r="13"
              fill="#fffdf2"
              stroke={ink}
              strokeWidth="1.5"
            />
            <Txt
              x={x}
              y={546}
              size={21}
              anchor="middle"
              fill={i === 0 ? "#6ba995" : "#8d83a9"}
            >
              {["↻", "▤", "▣"][i]}
            </Txt>
          </g>
        ))}
      {t > 20.1 && (
        <g>
          {Array.from({ length: 33 }, (_, i) => (
            <path
              key={i}
              d={`M${96 + i * 35} 634 l7 14 l7-14Z`}
              fill="#f3d570"
              stroke={ink}
              opacity={tween(t, 20.1 + i * 0.025, 20.3 + i * 0.025)}
            />
          ))}
          <Box x={1151} y={586} w={87} h={37} fill="#f1d36c" r={6} />
          <Txt x={1194} y={612} size={21} anchor="middle">
            ▼ 卡点
          </Txt>
        </g>
      )}
      <path d={`M${px} 424 V653`} stroke="#ce586a" strokeWidth="2" />
      <path
        d={`M${px - 7} 408 h14 v12 l-7 8 l-7-8Z`}
        fill="#ce586a"
        stroke={ink}
        strokeWidth="1.5"
      />
      <Txt x={44} y={680} size={16} fill="#aaa698">
        − ──○──── +
      </Txt>
      <Txt x={1230} y={680} size={12} fill="#a5a194" anchor="end">
        片段 {count} · 总时长 0:10.5
      </Txt>
    </g>
  );
};
const Phone: React.FC<{ t: number; final?: boolean }> = ({
  t,
  final = false,
}) => {
  const kind: ArtKind = final
    ? t < 27.6
      ? "city"
      : "disco"
    : t < 5.5
      ? "city"
      : t < 11.5
        ? "ramen"
        : t < 16
          ? "dog"
          : "disco";
  const focus = t > 6 && t < 7.7;
  return (
    <g>
      <rect x="-5" y="65" width="5" height="44" rx="2" fill={ink} />
      <rect x="220" y="69" width="5" height="50" rx="2" fill={ink} />
      <Box x={0} y={0} w={220} h={336} r={28} fill="#29292a" sw={3} />
      <rect
        x="5"
        y="5"
        width="210"
        height="325"
        rx="25"
        fill="none"
        stroke="#777368"
      />
      <svg
        x="11"
        y="11"
        width="198"
        height="314"
        viewBox="0 0 220 330"
        style={{ overflow: "hidden" }}
      >
        <defs>
          <clipPath id={final ? "screenFinal" : "screenEditor"}>
            <rect width="220" height="330" rx="20" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${final ? "screenFinal" : "screenEditor"})`}>
          <g
            transform={`rotate(${t > 8.2 && t < 8.9 ? tween(t, 8.2, 8.9, 0, 360) : 0} 110 165)`}
            style={{ filter: focus ? "blur(4px) grayscale(0.85)" : undefined }}
          >
            <Art kind={t > 10.6 && t < 11.5 ? "dog" : kind} t={t} />
          </g>
          {focus && (
            <g>
              <rect width="220" height="330" fill="#777263" opacity=".35" />
              <path
                d="M28 110 v-18 h18 M176 92 h18 v18 M28 229 v18 h18 M176 247 h18 v-18"
                fill="none"
                stroke="white"
                strokeWidth="4"
              />
              <circle
                cx="110"
                cy="157"
                r="18"
                fill="none"
                stroke="#eeeadd"
                strokeWidth="5"
                strokeDasharray="78 36"
                transform={`rotate(${t * 240} 110 157)`}
              />
              <Txt
                x={110}
                y={203}
                size={23}
                fill="white"
                outline
                bold
                anchor="middle"
              >
                对焦中…
              </Txt>
            </g>
          )}
          {t > 10.1 && t < 11.5 && (
            <g>
              <path
                d={`M220 0 L${tween(t, 10.1, 11.5, 220, 0)} 330 L0 ${tween(t, 10.1, 11.5, 0, 330)}Z`}
                fill="#ece8d8"
                stroke={ink}
                strokeWidth="2"
              />
              <path
                d={`M220 0 L${tween(t, 10.1, 11.5, 220, 0)} 330 Q${tween(t, 10.1, 11.5, 210, 0)} 220 220 0`}
                fill="#d9d6c4"
                opacity=".7"
              />
            </g>
          )}
          {t > 12.2 && t < 16 && (
            <Txt
              x={110}
              y={t < 13.5 ? 250 : 243}
              size={24}
              fill="#f4d56d"
              anchor="middle"
              bold
              outline
            >
              {t < 13.5 ? "前方高能" : "前方高能预警"}
            </Txt>
          )}
          {final && (
            <g>
              <Txt x={183} y={108} size={27} fill="#d89baa">
                ♥
              </Txt>
              <Txt x={191} y={126} size={11} fill="white" anchor="middle">
                1.5w
              </Txt>
              <Txt x={180} y={151} size={23} fill="white">
                ▣
              </Txt>
              <Txt x={191} y={169} size={11} fill="white" anchor="middle">
                219
              </Txt>
              <Txt x={183} y={196} size={24} fill="white">
                ➤
              </Txt>
              <Txt x={191} y={213} size={11} fill="white" anchor="middle">
                分享
              </Txt>
              <Txt x={13} y={293} size={14} fill="white">
                @小克 · Opus 5.5
              </Txt>
              <Txt x={13} y={313} size={11} fill="white">
                #AI剪辑 #日常 #code2video
              </Txt>
              {t > 27.6 && (
                <Txt
                  x={110}
                  y={143}
                  size={34}
                  fill="#f5d565"
                  outline
                  anchor="middle"
                  bold
                >
                  拿捏了!
                </Txt>
              )}
            </g>
          )}
        </g>
      </svg>
      <rect x="88" y="16" width="42" height="11" rx="6" fill="#1d1e1d" />
      {!final && (
        <g>
          <Txt x={110} y={359} size={24} anchor="middle" fill="#77786e">
            ⏮ ⊙ ⏵
          </Txt>
        </g>
      )}
    </g>
  );
};
const CharacterAction: React.FC<{ t: number }> = ({ t }) => {
  let x = 156,
    y = 442,
    scale = 1,
    arm: [number, number] | undefined;
  if (t < 5) {
    arm = t < 3.5 ? [96, 247] : [210, 243];
  } else if (t < 8) {
    arm = [tween(t, 5.5, 7.6, 350, 600), 618];
  } else if (t < 11.7) {
    arm = [t < 9.8 ? 91 : 210, t < 9.8 ? 146 : 230];
  } else if (t < 14) {
    x = 190;
    y = 424;
  } else if (t < 16) {
    x = 269;
    y = 465;
  } else if (t < 20) {
    x = 320;
    y = 566;
    arm = [t < 17.7 ? 1188 : 1100, t < 17.7 ? 145 : 210];
  } else if (t < 23.6) {
    x = tween(t, 20, 23, 350, 790);
    y = 565;
  } else {
    x = 885;
    y = 565;
    arm = [1121, 340];
  }
  return (
    <g>
      <Robot
        x={x}
        y={y}
        scale={scale}
        time={t}
        arm={arm}
        happy={t > 19.5}
        shades={t > 21}
        dance={t > 20 && t < 23.6}
      />
      {t > 6.2 && t < 7.7 && (
        <g transform={`translate(${tween(t, 6.2, 7.7, 460, 620)} 492)`}>
          <path
            d="M0-42 Q44 0 0 44 Q14 0 0-42"
            fill="#fff9d2"
            stroke={ink}
            strokeWidth="2"
          />
          <Txt x={-100} y={-49} size={43} fill="#e5a7bb" outline bold>
            唰!
          </Txt>
          <Star x={16} y={40} />
        </g>
      )}
      {t > 13.6 && t < 15.7 && (
        <g>
          <Box x={235} y={531} w={163} h={85} r={12} fill="#e0dccf" sw={3} />
          <Box x={244} y={537} w={145} h={69} r={10} fill="#fffdf5" />
          <Txt x={317} y={585} size={34} bold anchor="middle">
            Ctrl+Z
          </Txt>
        </g>
      )}
    </g>
  );
};
const Intro: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <Box x={13} y={5} w={1253} h={707} r={15} />
    <Box x={26} y={14} w={1227} h={42} r={10} />
    <Txt x={43} y={42} size={16}>
      ◉◉◉ 🎞 小克剪辑_最终版_再也不改(3).mp4
    </Txt>
    {t > 0.3 && (
      <g
        transform={`translate(${tween(t, 0.3, 1.1, 130, 430)} ${tween(t, 0.3, 1.1, -75, 185)}) rotate(-2)`}
        opacity={1 - tween(t, 1.1, 1.5)}
      >
        <Box x={0} y={0} w={360} h={121} fill="#fffdf7" r={4} />
        <Txt x={18} y={32} size={18} fill="#619e99">
          const 剪辑软件 = 小克.写代码()
        </Txt>
        <Txt x={18} y={65} size={18}>
          剪辑软件.画出(时间轴, 预览, 面板)
        </Txt>
        <Txt x={18} y={98} size={18} fill="#b96e5e">
          小克.钻进去()
        </Txt>
        <Robot x={370} y={45} scale={0.8} />
      </g>
    )}
  </g>
);
export const EditorStory: React.FC = () => {
  const frame = useCurrentFrame(),
    t = frame / 30;
  const [fontHandle] = useState(() =>
    delayRender("Loading bundled handwriting font"),
  );
  useEffect(() => {
    const f = new FontFace(
      "WenKai",
      `url(${staticFile("fonts/WenKai-Subset.woff2")})`,
    );
    f.load()
      .then((font) => {
        document.fonts.add(font);
        continueRender(fontHandle);
      })
      .catch((error: Error) => cancelRender(error));
  }, [fontHandle]);
  const zoom = interpolate(
    t,
    [0, 1.4, 2, 5.3, 6.5, 10, 12, 15.5, 16.5, 20, 23.5, 25.5, 26.1],
    [1, 1, 1.1, 1.1, 1.23, 1.23, 1.2, 1.2, 1.14, 1.08, 1, 1, 1],
    clamp,
  );
  const tx = interpolate(
    t,
    [0, 2, 5.3, 6.5, 10, 12, 15.5, 16.5, 20, 23.5],
    [0, -15, -15, -22, -22, -150, -150, -190, -90, 0],
    clamp,
  );
  const ty = interpolate(
    t,
    [0, 2, 5.3, 6.5, 10, 12, 15.5, 16.5, 20, 23.5],
    [0, -65, -65, -150, -100, -80, -80, -40, -20, 0],
    clamp,
  );
  const finale = t > 25.5;
  const f = ease(tween(t, 25.5, 26.4));
  return (
    <AbsoluteFill style={{ backgroundColor: paper }}>
      <Audio src={staticFile("reference-audio.m4a")} />
      <svg
        width="1280"
        height="720"
        viewBox="0 0 1280 720"
        style={{ fontFamily: "WenKai, serif" }}
      >
        <defs>
          <linearGradient id="night" x2=".3" y2="1">
            <stop stopColor="#303550" />
            <stop offset=".5" stopColor="#525785" />
            <stop offset="1" stopColor="#3b3c62" />
          </linearGradient>
          <linearGradient id="club" x2="0" y2="1">
            <stop stopColor="#786ca9" />
            <stop offset=".7" stopColor="#bc80b2" />
            <stop offset="1" stopColor="#5c5f8d" />
          </linearGradient>
          <pattern
            id="hatch"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <path d="M0 6 L6 0" stroke="#794734" strokeWidth=".6" />
          </pattern>
          <filter id="paperNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".63"
              numOctaves="3"
              seed="7"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <g
          transform={`translate(${tx} ${ty}) scale(${zoom})`}
          opacity={finale ? 1 - f * 0.67 : 1}
        >
          <Box x={13} y={6} w={1254} h={705} r={15} />
          <Box x={26} y={15} w={1227} h={40} r={9} sw={1.8} />
          <Txt x={39} y={41} size={16} fill="#7c7d70">
            ◉<tspan fill="#d4ad66">◉</tspan>
            <tspan fill="#7fae93">◉</tspan>
          </Txt>
          <Txt x={94} y={41} size={16}>
            🎞 小克剪辑_最终版_再也不改(3).mp4
          </Txt>
          <rect x="567" y="23" width="146" height="25" rx="4" fill="#34332e" />
          <Txt x={640} y={41} size={15} fill="white" anchor="middle">
            00:00:{String(Math.floor(t)).padStart(2, "0")}:
            {String(frame % 30).padStart(2, "0")}
          </Txt>
          <Txt x={739} y={41} size={13} fill="#aaa69b">
            已自动保存
          </Txt>
          <Box x={993} y={23} w={63} h={24} r={5} sw={1.4} />
          <Txt x={1025} y={40} size={13} anchor="middle">
            1080P
          </Txt>
          <Box
            x={1065}
            y={21}
            w={174}
            h={28}
            fill={t > 24 ? "#f1d56e" : "#86bdb0"}
            r={5}
            sw={1.6}
          />
          <Txt
            x={1152}
            y={41}
            size={15}
            anchor="middle"
            fill={t > 24 ? ink : "white"}
          >
            {t < 24
              ? "↥ 导出"
              : t < 25.5
                ? `渲染中 ${Math.min(99, Math.floor(tween(t, 24, 25.5, 0, 100)))}%`
                : "完成 ✓"}
          </Txt>
          <Materials t={t} />
          <Adjustments t={t} />
          <Timeline t={t} />
          <g
            transform="translate(552 68) scale(.86)"
            opacity={finale ? 1 - f : 1}
          >
            <Phone t={t} />
          </g>
          {t > 14 && t < 15.8 && (
            <g transform="translate(805 245) rotate(-12)">
              <rect
                x="0"
                y="0"
                width="156"
                height="58"
                rx="5"
                fill="none"
                stroke="#74a477"
                strokeWidth="3"
              />
              <rect
                x="6"
                y="6"
                width="144"
                height="46"
                fill="none"
                stroke="#74a477"
              />
              <Txt x={78} y={41} size={36} fill="#74a477" anchor="middle" bold>
                已修正
              </Txt>
            </g>
          )}
          {[1.75, 2.6, 3.25, 3.75].map((start, i) => {
            const end = start + (i < 2 ? 0.6 : 0.45),
              p = ease(tween(t, start, end));
            return t >= start && t < end ? (
              <g
                key={i}
                transform={`translate(${(41 + (i % 2) * 118) * (1 - p) + (99 + i * 190) * p} ${(112 + Math.floor(i / 2) * 95) * (1 - p) + 504 * p - 85 * Math.sin(p * Math.PI)}) rotate(${Math.sin(p * Math.PI) * -8})`}
              >
                <Thumb
                  kind={kinds[i]}
                  x={0}
                  y={0}
                  w={107 + 80 * p}
                  h={65}
                  repeat={2}
                />
              </g>
            ) : null;
          })}
          <g opacity={finale ? 1 - f : 1}>
            <CharacterAction t={t} />
          </g>
        </g>
        {t < 1.6 && (
          <g opacity={1 - tween(t, 1.3, 1.6)}>
            <Intro t={t} />
          </g>
        )}
        {finale && (
          <g opacity={f}>
            <g
              transform={`translate(${552 - 100 * f} ${68 + 62 * f}) scale(${0.86 + 0.5 * f})`}
            >
              <Phone t={t} final />
            </g>
            <g
              transform={`translate(${65 - tween(t, 25.5, 26.4, 80, 0)} 170) rotate(-1)`}
            >
              <Box x={0} y={0} w={357} h={318} r={10} fill="#fffef8" sw={2.5} />
              <rect
                x="129"
                y="-8"
                width="94"
                height="22"
                fill="#e9cc65"
                opacity=".65"
              />
              {t > 27.1 && (
                <Txt x={27} y={78} size={25}>
                  30 秒剪完。
                </Txt>
              )}
              {t > 27.7 && (
                <>
                  <Txt x={27} y={174} size={50}>
                    Opus 5.5
                  </Txt>
                  <path
                    d="M23 191 Q163 182 301 190"
                    fill="none"
                    stroke="#c56757"
                    strokeWidth="3"
                  />
                </>
              )}
            </g>
            <Robot x={954} y={431} scale={1.3} time={t} happy shades dance />
            {Array.from({ length: 14 }, (_, i) => (
              <Star
                key={i}
                x={835 + ((i * 37) % 420)}
                y={(i * 67 + t * 28) % 430}
                s={3 + (i % 4)}
                color={["#e2b9ba", "#dfcf82", "#b8cfc5"][i % 3]}
              />
            ))}
          </g>
        )}
        <rect
          width="1280"
          height="720"
          filter="url(#paperNoise)"
          opacity=".045"
          style={{ mixBlendMode: "multiply" }}
        />
      </svg>
    </AbsoluteFill>
  );
};
