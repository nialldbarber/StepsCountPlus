import { zustandStorage } from "@/app/store/middleware";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const challengeTypes = [
  { id: `${-1}-challengeTypes`, type: "Custom" },
  { id: `${0}-challengeTypes`, type: "All" },
  { id: `${1}-challengeTypes`, type: "Steps" },
  { id: `${2}-challengeTypes`, type: "Distance" },
  { id: `${3}-challengeTypes`, type: "Flights" },
  { id: `${4}-challengeTypes`, type: "Long distance" },
  { id: `${5}-challengeTypes`, type: "F1 tracks" },
  { id: `${6}-challengeTypes`, type: "Cycling" },
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

export type ChallengeComplete = {
  // @TODO: add endDate and timeTaken later
  //endDate: string;
  //timeTaken: string;
  count?: number;
} & Challenge;

type ChallengesState = {
  challenges: Array<Challenge>;
  completedChallenges: Array<ChallengeComplete>;
};

type ChallengesActions = {
  setAddChallenge: (challenge: Challenge) => void;
  setRemoveChallenge: (id: string) => void;
  setCompletedChallenge: (challenge: ChallengeComplete) => void;
};

export const useChallengesStore = create(
  persist(
    immer<ChallengesState & ChallengesActions>((set) => ({
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
      setCompletedChallenge: (completedChallenge: ChallengeComplete) => {
        set((state) => {
          const existingChallenge = state.completedChallenges.find(
            (challenge) => challenge.id === completedChallenge.id
          );

          if (existingChallenge) {
            console.log(
              `Incrementing count for challenge ${completedChallenge.id}`
            );
            // @ts-expect-error - count is not defined on Challenge
            existingChallenge.count += 1;

            state.challenges = state.challenges.filter(
              (challenge) => challenge.id !== completedChallenge.id
            );
            return;
          }

          console.log(
            `Adding new completed challenge ${completedChallenge.id}`
          );
          const newCompletedChallenge = {
            ...completedChallenge,
            count: 1,
          };
          state.completedChallenges.push(newCompletedChallenge);
          // remove challenge from challenges
          state.challenges = state.challenges.filter(
            (challenge) => challenge.id !== completedChallenge.id
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
