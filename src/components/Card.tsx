import { useState } from "react";
import Animated, { clamp, useDerivedValue } from "react-native-reanimated";

const Card = ({ card, scrollY, index }) => {
  const [cardHeight, setCardHeight] = useState(0);
  const translateY = useDerivedValue(() =>
    clamp(-scrollY.value, -index * cardHeight, 0)
  );

  return (
    <Animated.Image
      onLayout={(event) => setCardHeight(event.nativeEvent.layout.height + 10)}
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
  );
};

export default Card;
