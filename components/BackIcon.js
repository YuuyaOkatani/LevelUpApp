import Svg, {
  G,
  Circle,
  Path,
  Ellipse,
  Rect,
  Line,
  Image,
  Polygon,
  LinearGradient,
  Stop,
  Defs,
  ClipPath,
  Mask,
} from 'react-native-svg';

export const BackIcon = ({size = 40, color = 'white'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const Checkbox = ({size = 30, color = 'white'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Caixa do checkbox */}
    <Rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="0"
      stroke={color}
      strokeWidth="0.7"
    />
    {/* Check dentro da caixa */}
  </Svg>
);

// export const CloudIcon = ({ size = 40, color = 'white' }) => (
//     <Svg height="80" width="80" viewBox="0 0 24 24">
//         {/* Nuvem */}
//         <Circle cx="8" cy="14" r="4" fill="#A0C4FF" />
//         <Circle cx="16" cy="14" r="5" fill="#A0C4FF" />
//         <Ellipse cx="12" cy="16" rx="10" ry="5" fill="#A0C4FF" />
//     </Svg>
// );

export const GearIcon = ({size = 40, color = 'white'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G stroke={color} strokeWidth="2">
      {/* Centro da engrenagem */}
      <Circle cx="12" cy="12" r="2.5" fill={color} />

      {/* Braços da engrenagem */}
      <Path d="M12 3.5v2M12 18.5v2M4.6 4.6l1.4 1.4M17.9 17.9l1.4 1.4M3.5 12h2M18.5 12h2M4.6 19.4l1.4-1.4M17.9 6.1l1.4-1.4" />

      {/* Contorno da engrenagem */}
      <Path d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
    </G>
  </Svg>
);

export const AddIcon = ({size = 40, color = 'white'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Linha vertical do símbolo de adição */}
    <Line
      x1="12"
      y1="5"
      x2="12"
      y2="19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Linha horizontal do símbolo de adição */}
    <Line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);
export const EpicIcon = ({size = 100, borderRadius = 10}) => {
  const halfSize = size / 2;
  const triangleOffset = size * 0.35;
  const prismOffset = size * 0.15;
  const prismHeight = size * 0.3;
  const prismWidth = size * 0.3;

  return (
    <Svg height={size} width={size}>
      <Defs>
        {/* ClipPath para arredondar as bordas */}
        <ClipPath id="roundRect">
          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx={borderRadius}
            ry={borderRadius}
          />
        </ClipPath>

        {/* Mask para aplicar o recorte */}
        <Mask id="mask">
          <Rect x="0" y="0" width="100%" height="100%" fill="white" />
        </Mask>
      </Defs>

      {/* Fundo arredondado */}
      <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="#001f3f"
        rx={borderRadius}
        ry={borderRadius}
        clipPath="url(#roundRect)" // Aplica o arredondamento
        mask="url(#mask)"
      />

      {/* Triângulo superior (apenas contorno branco) */}
      <Polygon
        points={`${halfSize},${halfSize - triangleOffset} ${
          halfSize + triangleOffset
        },${halfSize} ${halfSize - triangleOffset},${halfSize}`}
        fill="none"
        stroke="white"
        strokeWidth="2"
      />

      {/* Triângulo inferior (apenas contorno branco) */}
      <Polygon
        points={`${halfSize},${halfSize + triangleOffset} ${
          halfSize - triangleOffset
        },${halfSize} ${halfSize + triangleOffset},${halfSize}`}
        fill="none"
        stroke="white"
        strokeWidth="2"
      />

      {/* Prisma (apenas contorno branco) */}
      <Path
        d={`M${halfSize},${halfSize - prismOffset} L${
          halfSize + prismWidth / 2
        },${halfSize - prismOffset + prismHeight / 2} L${
          halfSize + prismWidth / 2
        },${halfSize + prismHeight / 2} L${halfSize},${
          halfSize + prismOffset
        } L${halfSize - prismWidth / 2},${
          halfSize + prismOffset - prismHeight / 2
        } L${halfSize - prismWidth / 2},${halfSize - prismHeight / 2} Z`}
        fill="none"
        stroke="white"
        strokeWidth="1"
      />
      <Path
        d={`M${halfSize + prismWidth / 2},${
          halfSize - prismOffset + prismHeight / 2
        } L${halfSize + prismWidth / 2},${
          halfSize + prismHeight / 2
        } L${halfSize},${halfSize + prismOffset}`}
        stroke="white"
        strokeWidth="0.5"
      />
      <Path
        d={`M${halfSize - prismWidth / 2},${
          halfSize - prismOffset + prismHeight / 2
        } L${halfSize - prismWidth / 2},${
          halfSize + prismHeight / 2
        } L${halfSize},${halfSize + prismOffset}`}
        stroke="white"
        strokeWidth="0.5"
      />
      <Path
        d={`M${halfSize},${halfSize - prismOffset} L${
          halfSize + prismWidth / 2
        },${halfSize - prismOffset + prismHeight / 2} L${
          halfSize - prismWidth / 2
        },${halfSize - prismOffset + prismHeight / 2}`}
        stroke="white"
        strokeWidth="0.5"
      />
    </Svg>
  );
};
