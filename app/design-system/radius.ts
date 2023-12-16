export const radius = {
	none: 0,
	small: 4,
	medium: 8,
	large: 12,
	full: 100,
} as const;

export type Radius = keyof typeof radius;
