// import React from 'react'
// import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
// import axios from 'axios'

// export default function RecordScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity>
//         <Text> OOO님의 운동 기록 </Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     justifyContent: 'center',
//     borderWidth: 2,
//     marginVertical: 30,
//     borderRadius: 5,
//     marginBottom: 2
//   }
// })
import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
// import Constants from 'expo-constants';
import {ProgressChart} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

// const data = {
//   labels: ["7", "6", "5", "4", "3", "2", "1", "오늘"],
//   datasets: [
//     {
//       data: [20, 45, 28, 80, 99, 43, 54],
//       color: (opacity = 0) => `rgba(249, 161, 74)`,
//       // strokeWidth: 3 // optional
//     },
//     {
//       data: [66, 44, 11, 22, 33, 39, 12],
//       color: (opacity = 0) => `rgba(250, 105, 136)`,
//       // strokeWidth: 3 // optional
//     },
//     {
//       data: [66, 44, 11, 22, 33, 44, 44],
//       color: (opacity = 0) => `rgba(47, 185, 105)`,
//       // strokeWidth: 3 // optional
//     },
//     {
//       data: [55, 22, 33, 44, 55, 66, 77],
//       color: (opacity = 0) => `rgba(127, 186, 226)`,
//       // strokeWidth: 3 // optional
//     },

//   ],
//   legend: ["당근", "번개", "중고나라", "평균"] // optional
// };

const data = {
  labels: ["전신", "상체", "하체"], // optional
  data: [0.4, 0.6, 0.8]
};

export default function App() {
  return (
    <View style={styles.container}>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    // padding: 8,
    borderWidth: 3,
  },
});