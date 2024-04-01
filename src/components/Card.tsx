import { useState } from "react";
import Animated, {
  clamp,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const Card = ({ card, scrollY, index, activeCardIndex }) => {
  const [cardHeight, setCardHeight] = useState(0);
  const translateY = useSharedValue(0);
  useAnimatedReaction(
    () => {
      return scrollY.value;
    },
    (current, previous) => {
      translateY.value = clamp(-current, -index * cardHeight, 0);
    }
  );
  // const translateY = useDerivedValue(() =>
  //   clamp(-scrollY.value, -index * cardHeight, 0)
  // );
  const tap = Gesture.Tap().onEnd(() => {
    activeCardIndex.value = index;
  });

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
