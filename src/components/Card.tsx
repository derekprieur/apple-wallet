import Animated from "react-native-reanimated";

const Card = ({ index, card, scrollY }) => {
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
            translateY: scrollY,
          },
        ],
      }}
    />
  );
};

export default Card;
