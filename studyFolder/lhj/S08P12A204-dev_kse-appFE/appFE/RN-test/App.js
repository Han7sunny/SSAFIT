import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './src/screens/AppScreen'
// import { store } from './src/redux/store'


export default function App() {
  return (
    <View>
      <Text>HiHI</Text>
      <MainScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
