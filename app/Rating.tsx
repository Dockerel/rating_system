// React와 필요한 훅을 임포트합니다.
import React, { useState, useMemo } from "react";

// RatingProps 인터페이스는 Rating 컴포넌트에 전달될 props의 타입을 정의합니다.
interface RatingProps {
  count: number; // 별의 총 개수
  value: number; // 현재 선택된 별의 값
  onChange: (value: number) => void; // 별점 변경 시 호출될 콜백 함수
  size?: number; // 별의 크기 (선택적)
  color?: string; // 별의 기본 색상 (선택적)
  hoverColor?: string; // 호버 시 별의 색상 (선택적)
  activeColor?: string; // 활성화된 별의 색상 (선택적)
  emptyIconPath?: string; // 비활성화된 별의 SVG 경로 (선택적)
  fullIconPath?: string; // 활성화된 별의 SVG 경로 (선택적)
}

// IconProps 인터페이스는 StarIcon 컴포넌트에 전달될 props의 타입을 정의합니다.
interface IconProps {
  size?: number; // 아이콘 크기 (선택적)
  color?: string; // 아이콘 색상 (선택적)
  path: string; // SVG 경로
}

// StarIcon 컴포넌트는 SVG를 사용하여 별 아이콘을 렌더링합니다.
const StarIcon = ({ size = 50, color = "#aaa", path }: IconProps) => (
  <svg height={size} viewBox="0 0 25 25">
    <path d={path} fill={color} /> // SVG path를 사용하여 별 모양을 그립니다.
  </svg>
);

// 별 채워짐, 안채워짐 SVG
const defaultFullIconPath =
  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";
const defaultEmptyIconPath =
  "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z";

// Rating 리액트 함수형컴포넌트
const Rating: React.FC<RatingProps> = ({
  count,
  value,
  onChange,
  size,
  color = "#ffd700", // 기본 색상 = 금색
  hoverColor = "#ffd700",
  activeColor = "#ffd700",
  emptyIconPath = defaultEmptyIconPath,
  fullIconPath = defaultFullIconPath,
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined); // 호버 상태를 관리하는 상태 변수입니다.

  // 각 별의 색상을 결정하는 함수입니다.
  const getColor = (index: number) =>
    hoverValue !== undefined && index <= hoverValue
      ? hoverColor
      : index < value
      ? activeColor
      : color;

  // useMemo를 사용하여 별 배열을 메모이제이션합니다.
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => (
        <div
          key={i} // 반복되는 요소는 고유한 key를 가져야 하기 때문에 key 설정합니다.
          onMouseEnter={() => setHoverValue(i)} // 마우스를 올리면 호버 상태를 설정합니다.
          onMouseLeave={() => setHoverValue(undefined)} // 마우스를 치우면 호버 상태를 해제합니다.
          onClick={() => onChange(i + 1)} // 클릭 시 onChange 콜백을 호출하여 별점을 변경합니다.
        >
          <StarIcon
            size={size}
            color={getColor(i)} // 현재 상태에 따라 별의 색상을 결정합니다.
            path={
              hoverValue !== undefined && i <= hoverValue
                ? fullIconPath
                : i < value
                ? fullIconPath
                : emptyIconPath
            } // 별의 활성화 상태에 따라 SVG 경로를 결정합니다.
          />
        </div>
      )),
    [count, value, hoverValue, size]
  ); // 의존성 배열입니다. 이 배열의 요소 중 하나라도 변경되면 stars가 재계산됩니다.

  // 별점 컴포넌트를 렌더링합니다.
  return <div className="rating">{stars}</div>;
};

// Rating 컴포넌트를 기본으로 내보냅니다.
export default Rating;
