import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import { useStyles } from "react-native-unistyles";
import { Bar, CartesianChart } from "victory-native";
import { Box } from "../design-system/components/box";

type Props = {
  data: Array<{
    timestamp: number;
    value: number;
  }>;
};

/**
 * if the time period is:
 * 24 hours, then data should be hours (0-23)
 * 7 days, then data should be days (0-6)
 * 30 days, then data should be days (0-29)
 * 365 days, then data should be months (0-11)
 */

const pathToFonts = "../../assets/fonts";

export function BarChart({ data }: Props) {
  const { theme } = useStyles();
  const font = useFont(require(`${pathToFonts}/PlusJakartaSans-Bold.ttf`), 12);

  if (!data || data.length === 0) return null;

  return (
    <Box height="400px" backgroundColor={theme.colors.chartBackgroundColor}>
      <CartesianChart
        data={data}
        xKey="timestamp"
        yKeys={["value"]}
        domainPadding={{ left: 50, right: 50, top: 50 }}
        axisOptions={{
          font,
          formatXLabel: (value) => {
            const date = new Date(2023, value - 1);
            return date.toLocaleString("default", { month: "short" });
          },
          lineColor: theme.colors.chartBackgroundColor,
          labelColor: theme.colors.chartLabelColor,
        }}
      >
        {({ points, chartBounds }) => (
          <Bar
            chartBounds={chartBounds}
            points={points.value}
            roundedCorners={{
              topLeft: 5,
              topRight: 5,
            }}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, 400)}
              colors={["#00D632", "#00D63250"]}
            />
          </Bar>
        )}
      </CartesianChart>
    </Box>
  );
}
