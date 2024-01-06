import { ChallengeCard } from "@/app/components/challenge/card";
import { CompletedChallengeCard } from "@/app/components/challenge/completed";
import { useEffectOnce } from "@/app/hooks/useEffectOnce";
import type { Challenge, ChallengeComplete } from "@/app/store/challenges";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type BaseProps = {
  index: number;
  fn?: (input?: any) => void;
};
type ChallengeProps<T> = BaseProps & {
  item: T;
  challengeType: "current" | "complete";
};
type Props = ChallengeProps<Challenge> | ChallengeProps<ChallengeComplete>;

export function ChallengeItem({ item, index, fn, challengeType }: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffectOnce(() => {
    opacity.value = withTiming(1, { duration: 200 * (index + 1) });
    translateY.value = withTiming(0, { duration: 200 * (index + 1) });
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {challengeType === "complete" ? (
        <CompletedChallengeCard
          key={item.id}
          title={item.title}
          difficulty={item.difficulty}
          emoji={item.emoji}
          count={item.count || 0}
        />
      ) : (
        <ChallengeCard
          id={item.id}
          key={item.id}
          title={item.title}
          difficulty={item.difficulty}
          emoji={item.emoji}
          isSet
          fn={() => fn?.(item.id)}
          startDate={item.startDate}
          target={item.target}
          category={item.category}
        />
      )}
    </Animated.View>
  );
}
