import { colors } from "@/app/design-system/colors";
import { Box } from "@/app/design-system/components/box";
import type { SkFont } from "@shopify/react-native-skia";
import { Canvas, Path, Skia, Text } from "@shopify/react-native-skia";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

type DonutChartProps = {
	strokeWidth: number;
	radius: number;
	font: SkFont;
	smallerFont: SkFont;
	targetPercentage?: number;
	amount: number | string;
	message: string;
	remainingText?: string;
};

export function DonutChart({
	strokeWidth,
	radius,
	font,
	smallerFont,
	remainingText,
	targetPercentage,
	amount,
	message,
}: DonutChartProps) {
	const innerRadius = radius - strokeWidth / 2;

	const endAngle = useMemo(() => {
		return 2 * Math.PI * targetPercentage - Math.PI / 2;
	}, [targetPercentage]);

	const [backgroundPath, path] = useMemo(() => {
		const bgPath = Skia.Path.Make();
		bgPath.addCircle(radius, radius, innerRadius);

		const pth = Skia.Path.Make();
		pth.moveTo(radius, 0);
		for (let angle = -Math.PI / 2; angle <= endAngle; angle += 0.01) {
			pth.lineTo(
				radius + innerRadius * Math.cos(angle),
				radius + innerRadius * Math.sin(angle),
			);
		}
		return [bgPath, pth];
	}, [innerRadius, radius, endAngle]);

	const textWidth = font.measureText(amount.toString()).width;
	const textHeight = font.measureText(amount.toString()).height;
	const messageTextWidth = smallerFont.measureText(message.toString()).width;
	const messageTextCenterX = radius - messageTextWidth / 2;
	const centerX = radius - textWidth / 2;
	const centerY = radius;

	const remainingTextWidth = smallerFont.measureText(remainingText).width;
	const remainingTextCenterX = radius - remainingTextWidth / 2;
	const messageTextHeight = smallerFont.measureText(message).height;
	const remainingTextY = centerY + textHeight + messageTextHeight + 5;

	const styles = StyleSheet.create({
		container: {
			flex: 1,
		},
	});

	return (
		<Box flex={1}>
			<Canvas style={styles.container}>
				<Path
					path={backgroundPath}
					color={colors.white}
					style="stroke"
					strokeWidth={strokeWidth}
					strokeCap="round"
				/>
				<Path
					path={path}
					color={colors.primary}
					style="stroke"
					strokeWidth={strokeWidth}
					strokeCap="round"
				/>
				<Text
					x={centerX}
					y={centerY}
					text={amount.toString()}
					font={font}
					color={colors.primary}
				/>
				<Text
					x={messageTextCenterX}
					y={centerY + textHeight}
					text={message.toString()}
					font={smallerFont}
					color={colors.primary}
				/>
				<Text
					x={remainingTextCenterX}
					y={remainingTextY}
					text={remainingText}
					font={smallerFont}
					color={colors.primary}
				/>
			</Canvas>
		</Box>
	);
}
