import { zustandStorage } from "@/app/store/middleware";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type ChallengeType =
	| "distance"
	| "flights"
	| "long-distance-runs"
	| "f1-tracks";

export type Challenge = {
	id: string;
	title: string;
	difficulty: "easy" | "medium" | "hard";
	emoji: string;
};

type ChallengesState = {
	challenges: Array<Challenge>;
};

type ChallengesActions = {
	setAddChallenge: (challenge: Challenge) => void;
	setRemoveChallenge: (id: string) => void;
};

export const useChallengesStore = create(
	persist(
		immer<ChallengesState & ChallengesActions>((set, get) => ({
			challenges: [],
			setAddChallenge: (challenge: Challenge) => {
				set((state) => {
					state.challenges.push(challenge);
				});
			},
			setRemoveChallenge: (id: string) => {
				set((state) => {
					state.challenges = state.challenges.filter(
						(challenge) => challenge.id !== id,
					);
				});
			},
		})),
		{
			name: "challenges_state",
			storage: createJSONStorage(() => zustandStorage),
		},
	),
);
