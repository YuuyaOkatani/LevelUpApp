import Svg, {
  G,
  Circle,
  Path,
  Ellipse,
  Rect,
  Line,
  Image,
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
