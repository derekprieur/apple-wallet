import { View, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  cancelAnimation,
  clamp,
  useSharedValue,
  withClamp,
  withDecay,
} from "react-native-reanimated";
import Card from "./Card";
import { useState } from "react";

const cards = [
  require("../../assets/cards/Card 1.png"),
  require("../../assets/cards/Card 2.png"),
  require("../../assets/cards/Card 3.png"),
  require("../../assets/cards/Card 4.png"),
  require("../../assets/cards/Card 5.png"),
  require("../../assets/cards/Card 6.png"),
  require("../../assets/cards/Card 7.png"),
  require("../../assets/cards/Card 8.png"),
  require("../../assets/cards/Card 9.png"),
];

const CardList = () => {
  const [listHeight, setListHeight] = useState(0);
  const { height: screenHeight } = useWindowDimensions();
  const scrollY = useSharedValue(0);
  const activeCardIndex = useSharedValue(null);
  const maxScrollY = listHeight - screenHeight + 70;
  const pan = Gesture.Pan()
    .onBegin(() => {
      cancelAnimation(scrollY);
    })
    .onStart(() => {})
    .onChange((event) => {
      scrollY.value = clamp(scrollY.value - event.changeY, 0, maxScrollY);
    })
    .onEnd((event) => {
      scrollY.value = withClamp(
        { min: 0, max: maxScrollY },
        withDecay({
          velocity: -event.velocityY,
        })
      );
    });

  return (
    <GestureDetector gesture={pan}>
      <View
        onLayout={(event) => setListHeight(event.nativeEvent.layout.height)}
        style={{
          padding: 10,
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            index={index}
            card={card}
            scrollY={scrollY}
            activeCardIndex={activeCardIndex}
          />
        ))}
      </View>
    </GestureDetector>
  );
};

export default CardList;
