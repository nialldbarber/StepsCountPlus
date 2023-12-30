import { zustandStorage } from "@/app/store/middleware";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const challengeTypes = [
  { id: `${0}-challengeTypes`, type: "All" },
  { id: `${1}-challengeTypes`, type: "Steps" },
  { id: `${2}-challengeTypes`, type: "Distance" },
  { id: `${3}-challengeTypes`, type: "Flights" },
  { id: `${4}-challengeTypes`, type: "Long distance" },
  { id: `${5}-challengeTypes`, type: "F1 tracks" },
] as const;

type Item = (typeof challengeTypes)[number];

export type Value = Item["type"];
type FormatValue<T extends string> = T extends `${infer Word} ${infer Rest}`
  ? `${Lowercase<Word>}-${FormatValue<Rest>}`
  : Lowercase<T>;

export type ChallengeType = FormatValue<Value>;

export type Challenge = {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  emoji: string;
  startDate?: string;
  target: number;
  category: ChallengeType;
};

type ChallengesState = {
  challenges: Array<Challenge>;
  completedChallenges: Array<Challenge>;
};

type ChallengesActions = {
  setAddChallenge: (challenge: Challenge) => void;
  setRemoveChallenge: (id: string) => void;
};

export const useChallengesStore = create(
  persist(
    immer<ChallengesState & ChallengesActions>((set, get) => ({
      challenges: [],
      completedChallenges: [],
      setAddChallenge: (challenge: Challenge) => {
        set((state) => {
          state.challenges.push(challenge);
        });
      },
      setRemoveChallenge: (id: string) => {
        set((state) => {
          state.challenges = state.challenges.filter(
            (challenge) => challenge.id !== id
          );
        });
      },
    })),
    {
      name: "challenges_state",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
