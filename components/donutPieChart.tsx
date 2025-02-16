import React from "react";
import { View } from "react-native";
import Svg, { Circle, G, Text as SvgText } from "react-native-svg";

interface DonutPieChartProps {
  proteinsPercentage: number;
  carbsPercentage: number;
  fatsPercentage: number;
}

const DonutPieChart = ({ proteinsPercentage, carbsPercentage, fatsPercentage }: DonutPieChartProps) => {
  const size = 200;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const proteinsLength = (proteinsPercentage / 100) * circumference;
  const carbsLength = (carbsPercentage / 100) * circumference;
  const fatsLength = (fatsPercentage / 100) * circumference;

  return (
    <View style={{ alignItems: "center", marginVertical: 35 }}>
      <Svg width={size} height={size}>
        {/* Fundo do gráfico */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Fatia de Proteínas */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FF6347" // Cor da proteína
          strokeWidth={strokeWidth}
          strokeDasharray={`${proteinsLength}, ${circumference}`}
          strokeLinecap="round"
          fill="transparent"
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />

        {/* Fatia de Carboidratos */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#32CD32" // Cor do carboidrato
          strokeWidth={strokeWidth}
          strokeDasharray={`${carbsLength}, ${circumference}`}
          strokeLinecap="round"
          fill="transparent"
          rotation={-90 + (proteinsPercentage / 100) * 360}
          origin={`${size / 2}, ${size / 2}`}
        />

        {/* Fatia de Gorduras */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1E90FF" // Cor da gordura
          strokeWidth={strokeWidth}
          strokeDasharray={`${fatsLength}, ${circumference}`}
          strokeLinecap="round"
          fill="transparent"
          rotation={-90 + ((proteinsPercentage + carbsPercentage) / 100) * 360}
          origin={`${size / 2}, ${size / 2}`}
        />

        {/* Texto no centro do gráfico */}
        <G>
          <SvgText
            x={size / 2}
            y={size / 2 - 25}
            fontSize={16}
            fontWeight="bold"
            textAnchor="middle"
            fill="#333"
            fontFamily="SpaceMono" // Aplica a fonte SpaceMono
          >
            Macros
          </SvgText>
          <SvgText
            x={size / 2}
            y={size / 2 + 10}
            fontSize={14}
            textAnchor="middle"
            fill="#FF6347" // Cor da proteína
            fontFamily="SpaceMono" // Aplica a fonte SpaceMono
          >
            {`P: ${proteinsPercentage}%`}
          </SvgText>
          <SvgText
            x={size / 2}
            y={size / 2 + 30}
            fontSize={14}
            textAnchor="middle"
            fill="#32CD32" // Cor do carboidrato
            fontFamily="SpaceMono" // Aplica a fonte SpaceMono
          >
            {`C: ${carbsPercentage}%`}
          </SvgText>
          <SvgText
            x={size / 2}
            y={size / 2 + 50}
            fontSize={14}
            textAnchor="middle"
            fill="#1E90FF" // Cor da gordura
            fontFamily="SpaceMono" // Aplica a fonte SpaceMono
          >
            {`G: ${fatsPercentage}%`}
          </SvgText>
        </G>
      </Svg>
    </View>
  );
};

export default DonutPieChart;