import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { NavigationProp } from '@react-navigation/native';

type ProductProps = {
    navigation: NavigationProp<any>
}

export default function HomeScreen({ navigation }: ProductProps) {

    const navigateToProducts = () => {
        navigation.navigate('Products');
    };

  return (
    <View style={styles.container}>
      <StatusBar />
      <LottieView
        source={require('../src/animations/Animation - 1731269120932.json')}
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text style={styles.textDescription}>Escolha o produto que deseja avaliar e compartilhe sua experiência com outros consumidores.</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToProducts}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textDescription: {
    textAlign: 'center',
    fontSize: 16,
  }
});
