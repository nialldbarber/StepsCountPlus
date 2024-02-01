import { Box, resolveToken } from "@/app/design-system/components/box";
import type { Height, Width } from "@/app/design-system/size";
import { heights, widths } from "@/app/design-system/size";
import type { Space } from "@/app/design-system/space";
import { space } from "@/app/design-system/space";

type Props = {
	verticalSpace?: Height | Space;
	horizontalSpace?: Width | Space;
};

export function Spacer({ verticalSpace, horizontalSpace }: Props) {
	const width = resolveToken({ ...widths, ...space }, horizontalSpace);
	const height = resolveToken({ ...heights, ...space }, verticalSpace);

	return verticalSpace ? (
		<Box styles={{ width, height }} />
	) : horizontalSpace ? (
		<Box />
	) : null;
}
