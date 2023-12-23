import { Box } from "@/app/design-system/components/box";
import { Canvas, Path, Skia, Text, useFont } from "@shopify/react-native-skia";
import * as d3 from "d3";
import { useEffect } from "react";
import { Easing, View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { colors } from "../design-system/colors";

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 12;
const CANVAS_HEIGHT = 350;
const CANVAS_WIDTH = 350;
const GRAPH_HEIGHT = CANVAS_HEIGHT - 2 * GRAPH_MARGIN;
const GRAPH_WIDTH = CANVAS_WIDTH - 2;

const pathToFonts = "../../assets/fonts";

interface DataPoint {
	label: string;
	value: number;
}

const data: DataPoint[] = [
	{ label: "Jan", value: 50 },
	{ label: "Feb", value: 100 },
	{ label: "Mar", value: 350 },
	{ label: "Apr", value: 200 },
	{ label: "May", value: 550 },
	{ label: "Jun", value: 300 },
	{ label: "Jul", value: 150 },
	{ label: "Aug", value: 400 },
	{ label: "Sep", value: 450 },
	{ label: "Oct", value: 500 },
	{ label: "Nov", value: 250 },
	{ label: "Dec", value: 600 },
];

export function BarChart() {
	const { theme, styles } = useStyles(stylesheet);
	const font = useFont(require(`${pathToFonts}/PlusJakartaSans-Bold.ttf`), 10);

	const animationState = useSharedValue(1);

	const xDomain = data.map((dataPoint: DataPoint) => dataPoint.label);
	const xRange = [0, GRAPH_WIDTH];
	const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

	const yDomain: number[] = [
		0,
		d3.max(data, (yDataPoint: DataPoint) => yDataPoint.value)!,
	];

	const yRange = [0, GRAPH_HEIGHT];
	const y = d3.scaleLinear().domain(yDomain).range(yRange);

	useEffect(() => {
		animationState.value = withTiming(1, {
			duration: 1600,
			easing: Easing.inOut(Easing.exp),
		});
	}, []);

	const path = Skia.Path.Make();

	for (const dataPoint of data) {
		const rect = Skia.XYWHRect(
			x(dataPoint.label)! - GRAPH_BAR_WIDTH / 2,
			GRAPH_HEIGHT,
			GRAPH_BAR_WIDTH,
			y(dataPoint.value * animationState.value) * -1,
		);
		const rrect = Skia.RRectXY(rect, 8, 8);
		path.addRRect(rrect);
	}

	if (!font) return <Box />;

	return (
		<View style={styles.container}>
			<Canvas style={styles.canvas}>
				<Path path={path} color={colors.primary} />
				{data.map((dataPoint: DataPoint) => (
					<Text
						key={dataPoint.label}
						font={font}
						x={x(dataPoint.label)! - 10}
						y={CANVAS_HEIGHT - 25}
						text={dataPoint.label}
						color={theme.colors.textColor}
					/>
				))}
			</Canvas>
		</View>
	);
}

const stylesheet = createStyleSheet(() => ({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	canvas: {
		height: CANVAS_HEIGHT,
		width: CANVAS_WIDTH,
	},
}));
