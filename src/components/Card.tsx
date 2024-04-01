import { useState } from "react";
import Animated, {
  clamp,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useWindowDimensions } from "react-native";

const Card = ({ card, scrollY, index, activeCardIndex }) => {
  const [cardHeight, setCardHeight] = useState(0);
  const { height: screenHeight } = useWindowDimensions();
  const translateY = useSharedValue(0);
  const tap = Gesture.Tap().onEnd(() => {
    if (activeCardIndex.value === null) {
      activeCardIndex.value = index;
    } else {
      activeCardIndex.value = null;
    }
  });

  useAnimatedReaction(
    () => scrollY.value,
    (current) => {
      translateY.value = clamp(-current, -index * cardHeight, 0);
    }
  );

  useAnimatedReaction(
    () => activeCardIndex.value,
    (current, previous) => {
      if (current === previous) return;

      if (activeCardIndex.value === null) {
        translateY.value = withTiming(
          clamp(-scrollY.value, -index * cardHeight, 0)
        );
      } else if (activeCardIndex.value === index) {
        translateY.value = withTiming(-index * cardHeight);
      } else {
        translateY.value = withTiming(
          -index * cardHeight * 0.9 + screenHeight * 0.7
        );
      }
    }
  );

  return (
    <GestureDetector gesture={tap}>
      <Animated.Image
        onLayout={(event) =>
          setCardHeight(event.nativeEvent.layout.height + 10)
        }
        source={card}
        style={{
          width: "100%",
          aspectRatio: 7 / 4,
          height: undefined,
          marginVertical: 5,
          transform: [
            {
              translateY: translateY,
            },
          ],
        }}
      />
    </GestureDetector>
  );
};

export default Card;
