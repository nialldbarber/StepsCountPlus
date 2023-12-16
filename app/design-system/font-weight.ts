export const fontWeight = {
	light: "PlusJakartaSans-Light",
	regular: "PlusJakartaSans-Regular",
	medium: "PlusJakartaSans-Medium",
	semiBold: "PlusJakartaSans-SemiBold",
	bold: "PlusJakartaSans-Bold",
	extraBold: "PlusJakartaSans-ExtraBold",
} as const;

export type FontWeight = keyof typeof fontWeight;
