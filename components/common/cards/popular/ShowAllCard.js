import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./showallcard.style.js";
import { COLORS } from "../../../../constants";

const ShowAllCard = ({ handleShowAllPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleShowAllPress()}
    >
      <Text style={styles.text}>Show All</Text>
    </TouchableOpacity>
  );
};

export default ShowAllCard;
