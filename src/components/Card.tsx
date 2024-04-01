import Animated, { useDerivedValue } from "react-native-reanimated";

const Card = ({ index, card, scrollY }) => {
  const translateY = useDerivedValue(() => -scrollY.value);

  return (
    <Animated.Image
      key={index}
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
