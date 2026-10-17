import React from "react";
export const ink = "#292720";
export const paper = "#f5f2e8";
export const Box: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  r?: number;
  stroke?: string;
  sw?: number;
}> = ({ x, y, w, h, fill = paper, r = 9, stroke = ink, sw = 2.5 }) => (
  <g>
    <rect
      x={x + 1}
      y={y + 1}
      width={w}
      height={h}
      rx={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={sw}
    />
    <path
      d={`M${x + 7} ${y + 3} Q${x + 2} ${y + 2} ${x + 3} ${y + 15} L${x + 2} ${y + h - 9} M${x + 10} ${y + h - 2} L${x + w - 8} ${y + h - 1} Q${x + w + 2} ${y + h - 4} ${x + w - 2} ${y + h - 15}`}
      fill="none"
      stroke={stroke}
      strokeWidth=".6"
      opacity=".5"
    />
  </g>
);
export const Txt: React.FC<{
  x: number;
  y: number;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  children: React.ReactNode;
  bold?: boolean;
  outline?: boolean;
}> = ({
  x,
  y,
  size = 17,
  fill = ink,
  anchor = "start",
  children,
  bold = false,
  outline = false,
}) => (
  <text
    x={x}
    y={y}
    fill={fill}
    fontSize={size}
    fontWeight={bold ? 700 : 400}
    textAnchor={anchor}
    stroke={outline ? ink : "none"}
    strokeWidth={outline ? 5 : 0}
    paintOrder="stroke"
    strokeLinejoin="round"
  >
    {children}
  </text>
);
export const Star: React.FC<{
  x: number;
  y: number;
  s?: number;
  color?: string;
}> = ({ x, y, s = 6, color = "#fff9de" }) => (
  <path
    d={`M${x} ${y - s} Q${x + 1} ${y - 1} ${x + s} ${y} Q${x + 1} ${y + 1} ${x} ${y + s} Q${x - 1} ${y + 1} ${x - s} ${y} Q${x - 1} ${y - 1} ${x} ${y - s}`}
    fill={color}
    stroke={ink}
    strokeWidth=".7"
  />
);
export const Robot: React.FC<{
  x: number;
  y: number;
  scale?: number;
  time?: number;
  happy?: boolean;
  shades?: boolean;
  arm?: [number, number];
  dance?: boolean;
}> = ({
  x,
  y,
  scale = 1,
  time = 0,
  happy = false,
  shades = false,
  arm,
  dance = false,
}) => {
  const bob = dance ? Math.sin(time * 8) * 4 : Math.sin(time * 3) * 1.5;
  return (
    <g
      transform={`translate(${x} ${y + bob}) scale(${scale}) rotate(${dance ? Math.sin(time * 8) * 7 : 0} 40 30)`}
      stroke={ink}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {arm && (
        <path
          d={`M5 36 Q${((arm[0] - x) / scale) * 0.4} ${((arm[1] - y) / scale) * 0.4 + 25} ${(arm[0] - x) / scale} ${(arm[1] - y) / scale}`}
          fill="none"
          stroke={ink}
          strokeWidth="13"
        />
      )}
      {arm && (
        <path
          d={`M5 36 Q${((arm[0] - x) / scale) * 0.4} ${((arm[1] - y) / scale) * 0.4 + 25} ${(arm[0] - x) / scale} ${(arm[1] - y) / scale}`}
          fill="none"
          stroke="#c96f59"
          strokeWidth="8"
        />
      )}
      {arm && (
        <circle
          cx={(arm[0] - x) / scale}
          cy={(arm[1] - y) / scale}
          r="7"
          fill="#c96f59"
        />
      )}
      <path
        d={
          dance
            ? "M5 29 L-9 3 M77 29 L91 1"
            : "M4 33 H-8 V43 H4 M78 33 H89 V42 H78"
        }
        fill="#c46b55"
      />
      <path
        d="M13 58 V77 H24 V58 M30 58 V74 H39 V58 M58 58 V77 H69 V58"
        fill="#c46b55"
      />
      <rect x="0" y="9" width="80" height="53" rx="3" fill="#c96e58" />
      <path d="M5 14 H72 M5 18 H18" stroke="#e49c7a" strokeWidth="2" />
      <rect
        x="3"
        y="11"
        width="74"
        height="48"
        fill="url(#hatch)"
        stroke="none"
        opacity=".17"
      />
      {happy ? (
        <path d="M23 32 Q27 23 31 32 M49 32 Q53 23 57 32" fill="none" />
      ) : (
        <g>
          <ellipse cx="27" cy="29" rx="3" ry="6" fill={ink} />
          <ellipse cx="53" cy="29" rx="3" ry="6" fill={ink} />
          <path d="M26 26 V28 M52 26 V28" stroke="white" strokeWidth="1.5" />
        </g>
      )}
      {happy && (
        <>
          <path d="M35 42 Q40 48 45 42" fill="none" />
          <ellipse cx="17" cy="40" rx="6" ry="3" fill="#e9958b" stroke="none" />
          <ellipse cx="64" cy="40" rx="6" ry="3" fill="#e9958b" stroke="none" />
        </>
      )}
      {shades && (
        <g transform="translate(13 -1) rotate(-7)">
          <path d="M0 3 H57 L51 14 H37 L29 7 L23 14 H8 Z" fill={ink} />
          <path
            d="M12 4 L7 10 M20 4 L14 11 M45 4 L40 10"
            stroke="white"
            strokeWidth="1.5"
          />
        </g>
      )}
    </g>
  );
};
export type ArtKind = "city" | "ramen" | "dog" | "disco";
export const Art: React.FC<{ kind: ArtKind; t?: number }> = ({
  kind,
  t = 0,
}) => {
  if (kind === "city")
    return (
      <g>
        <rect width="220" height="330" fill="url(#night)" />
        {Array.from({ length: 28 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 61 + 17) % 220}
            cy={(i * 37 + 19) % 230}
            r={i % 3 === 0 ? 1.5 : 0.7}
            fill="#f3eacc"
            opacity={0.5 + 0.4 * Math.sin(i + t)}
          />
        ))}
        <path
          d="M162 49 C131 52 126 91 151 101 C170 110 189 98 194 86 C168 96 150 77 162 49"
          fill="#f3d765"
          stroke={ink}
          strokeWidth="2"
        />
        <path d="M146 85 Q153 91 159 86" fill="none" stroke={ink} />
        <Star x={54} y={93} s={5} />
        <Star x={151} y={158} s={6} />
        {Array.from({ length: 15 }, (_, i) => {
          const x = i * 17 - 8,
            h = 67 + ((i * 37) % 91);
          return (
            <g key={i}>
              <rect
                x={x}
                y={330 - h}
                width={25}
                height={h}
                fill={["#383958", "#414366", "#282c4d"][i % 3]}
                stroke="#23263d"
                strokeWidth="2"
              />
              {i % 3 === 0 && (
                <rect
                  x={x + 8}
                  y={323 - h}
                  width="9"
                  height="7"
                  fill="#383953"
                  stroke="#23263d"
                />
              )}
              {Array.from({ length: Math.floor(h / 15) * 2 }, (_, j) => (
                <rect
                  key={j}
                  x={x + 5 + (j % 2) * 10}
                  y={340 - h + Math.floor(j / 2) * 15}
                  width="4"
                  height="6"
                  fill={(j + i) % 4 === 0 ? "#454c73" : "#e8d36c"}
                  opacity={(j + i) % 3 === 0 ? 0.55 : 1}
                />
              ))}
            </g>
          );
        })}
      </g>
    );
  if (kind === "ramen")
    return (
      <g>
        <rect width="220" height="330" fill="#f7e6ab" />
        <path d="M0 264 H220 V330 H0Z" fill="#dcb585" />
        <path d="M0 281 H220 M0 303 H220" stroke="#ae8966" />
        <path
          d="M12 0 H207 V58 H12Z"
          fill="#42476e"
          stroke={ink}
          strokeWidth="2"
        />
        <path
          d="M57 0 V58 M112 0 V58 M165 0 V58"
          stroke="#e0c665"
          strokeWidth="2"
        />
        <Txt x={34} y={39} size={24} fill="white">
          •
        </Txt>
        <Txt x={70} y={40} size={28} fill="white" bold>
          拉 面
        </Txt>
        {Array.from({ length: 24 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 53) % 220}
            cy={75 + ((i * 47) % 160)}
            r="2.1"
            fill="#fff5d4"
          />
        ))}
        <path
          d="M43 226 Q47 279 111 283 Q174 281 181 226"
          fill="#fff8dc"
          stroke={ink}
          strokeWidth="2"
        />
        <path
          d="M47 241 Q112 266 177 241 L174 253 Q111 277 50 253 Z"
          fill="#e8a3a0"
          stroke={ink}
          strokeWidth="1"
        />
        <ellipse
          cx="111"
          cy="225"
          rx="69"
          ry="23"
          fill="#ad634e"
          stroke={ink}
          strokeWidth="2.5"
        />
        {Array.from({ length: 10 }, (_, i) => (
          <path
            key={i}
            d={`M${62 + i * 8} 220 q-14 7 1 13 q18 6 25-1`}
            fill="none"
            stroke="#f4dd94"
            strokeWidth="2"
          />
        ))}
        <path
          d="M69 216 L73 193 L95 196 L92 222Z"
          fill="#4c6951"
          stroke={ink}
        />
        <ellipse
          cx="128"
          cy="219"
          rx="19"
          ry="12"
          transform="rotate(-19 128 219)"
          fill="#fff4d2"
          stroke={ink}
        />
        <ellipse cx="128" cy="219" rx="9" ry="7" fill="#efba4c" />
        <path
          d="M129 208 L211 140 M133 212 L215 146"
          stroke={ink}
          strokeWidth="5"
        />
        <path
          d="M129 208 L211 140 M133 212 L215 146"
          stroke="#be925a"
          strokeWidth="2"
        />
        <path
          d={`M98 195 C83 180 114 174 101 ${150 + Math.sin(t * 3) * 7} M119 184 C102 169 132 160 122 144`}
          fill="none"
          stroke="#fff9e1"
          strokeWidth="4"
          opacity=".7"
        />
      </g>
    );
  if (kind === "dog")
    return (
      <g>
        <rect width="220" height="330" fill="#b9e3d8" />
        {Array.from({ length: 48 }, (_, i) => (
          <circle
            key={i}
            cx={(i % 8) * 31 + 8}
            cy={Math.floor(i / 8) * 51 + 19}
            r="2.5"
            fill="#e6f4e6"
            opacity=".7"
          />
        ))}
        <path
          d="M166 229 Q218 185 211 239 Q198 259 170 257"
          fill="#d9944e"
          stroke={ink}
          strokeWidth="2"
        />
        <path
          d="M49 330 L50 260 Q42 224 76 220 H149 Q182 230 181 262 V330"
          fill="#d58c47"
          stroke={ink}
          strokeWidth="2"
        />
        <ellipse cx="115" cy="278" rx="40" ry="47" fill="#fffaf0" />
        <path
          d="M54 143 L61 94 L96 117 M141 118 L179 95 L189 152"
          fill="#d98f47"
          stroke={ink}
          strokeWidth="2.5"
        />
        <path
          d="M64 128 L66 104 L84 119 M157 122 L175 106 L181 133"
          fill="#edb1ac"
        />
        <ellipse
          cx="119"
          cy="174"
          rx="72"
          ry="61"
          fill="#d99652"
          stroke={ink}
          strokeWidth="2.5"
        />
        <path
          d="M52 188 Q73 166 104 187 Q117 197 133 186 Q166 169 187 191 Q174 234 119 235 Q66 230 52 188"
          fill="#fffaf0"
        />
        <ellipse cx="91" cy="158" rx="7" ry="4" fill="#fff8e9" />
        <ellipse cx="146" cy="158" rx="7" ry="4" fill="#fff8e9" />
        <ellipse cx="91" cy="177" rx="4" ry="6" fill={ink} />
        <ellipse cx="146" cy="177" rx="4" ry="6" fill={ink} />
        <path d="M90 173 V175 M145 173 V175" stroke="white" strokeWidth="2" />
        <path
          d="M111 195 Q119 191 126 196 L119 202Z M119 201 V208 M106 207 Q111 218 119 208 Q129 217 133 206"
          fill={ink}
          stroke={ink}
          strokeWidth="2"
        />
        <ellipse cx="73" cy="201" rx="9" ry="5" fill="#eeb4bf" />
        <ellipse cx="165" cy="201" rx="9" ry="5" fill="#eeb4bf" />
        <path
          d="M78 226 Q118 245 159 224 L159 234 Q118 251 78 236Z"
          fill="#c96357"
          stroke={ink}
          strokeWidth="2"
        />
        <circle
          cx="118"
          cy="244"
          r="7"
          fill="#e7c954"
          stroke={ink}
          strokeWidth="2"
        />
        <Txt x={32} y={90 + Math.sin(t * 3) * 4} size={30} fill="#dc94aa">
          ♥
        </Txt>
        <Txt x={178} y={125} size={19} fill="#dc94aa">
          ♥
        </Txt>
      </g>
    );
  return (
    <g>
      <rect width="220" height="330" fill="url(#club)" />
      <path
        d="M109 35 L-40 228 L55 228Z"
        fill="#e8cbef"
        opacity=".13"
        transform={`rotate(${Math.sin(t) * 15} 109 35)`}
      />
      <path d="M109 35 L220 248 L180 248Z" fill="#ffdfa4" opacity=".18" />
      <path d="M0 220 H220 V330 H0Z" fill="#293a5c" />
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 9 }, (_, col) => {
          const top = 220 + row * row * 1.8,
            bot = 220 + (row + 1) * (row + 1) * 1.8;
          const a = (col - 4.5) * (0.4 + row * 0.22) * 25 + 110,
            b = (col - 3.5) * (0.4 + row * 0.22) * 25 + 110,
            c = (col - 3.5) * (0.4 + (row + 1) * 0.22) * 25 + 110,
            d = (col - 4.5) * (0.4 + (row + 1) * 0.22) * 25 + 110;
          return (
            <path
              key={`${row}-${col}`}
              d={`M${a} ${top} H${b} L${c} ${bot} H${d}Z`}
              fill={
                ["#43598c", "#7e73ae", "#87bfc5", "#e0bcd5", "#ddca7d"][
                  (row + col * 3) % 5
                ]
              }
              opacity={0.55 + (row % 2) * 0.2}
            />
          );
        }),
      )}
      <path d="M110 0 V26" stroke={ink} strokeWidth="2" />
      <circle
        cx="110"
        cy="45"
        r="22"
        fill="#c5c5e7"
        stroke={ink}
        strokeWidth="2"
      />
      <path
        d="M91 35 H129 M88 46 H132 M92 56 H128 M103 25 V65 M117 25 V65"
        stroke="#8185ab"
      />
      <path d="M117 35 H129 V45 H117Z" fill="#f6df77" />
      <Robot x={71} y={228} scale={0.9} dance time={t} happy />
      {Array.from({ length: 8 }, (_, i) => (
        <Star
          key={i}
          x={(i * 47 + 22) % 220}
          y={90 + ((i * 29) % 210)}
          s={3 + (i % 3) * 2}
          color={i % 2 ? "#e9d77e" : "#f8efff"}
        />
      ))}
    </g>
  );
};
