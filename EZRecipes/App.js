import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
//import axios
import axios from "axios";
import NavCard from './components/navCard';


const options = {
  method: 'GET',
  url: 'https://themealdb.p.rapidapi.com/filter.php',
  params: {
    i: 'chicken_breast'
  },
  headers: {
    'X-RapidAPI-Key': 1,
    'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
  }
};

//gets food
let pastaTest = getFood();
async function getFood(){
    try{
        const foodURL = "www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";
        const foodResponse = await axios.get(foodURL);

        let foodData = foodResponse.data.meals[0].strMeal;

        //return
        return (foodData);
    }catch(error){
        return ("Error!: " + error);
    }

  // try {
  //   const response = await axios.request(options);
  //   console.log(response.data);
  //   return(response.data);
  // } catch (error) {
  //   console.error(error);
  // }
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>EZRecipes</Text>
      <NavCard></NavCard>
      <ImageBackground style={styles.navButtonImg} source={require('./assets/images/BeansAndRice.jpg')}>
        <Text style={styles.navButtonText}>Get a Random Recipe!</Text>
      </ImageBackground>
      <ImageBackground style={styles.navButtonImg} source={require('./assets/images/chickenparm.jpg')}>
        <Text style={styles.navButtonText}>Sort by Main Ingredient</Text>
      </ImageBackground>
      <ImageBackground style={styles.navButtonImg} source={require('./assets/images/mapotofu.jpg')}>
        <Text style={styles.navButtonText}>Sort by Category</Text>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF2',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#351100',
    color: '#FFFFF2',
    padding: 30,
    fontSize: 25,
    top: 0,
    fontFamily: 'serif',
    fontWeight: 'bold',
    borderBottomColor: 'black',
    borderWidth: 1,
  },
  navButtonImg: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'center',
    borderBottomColor: 'black',
    borderWidth: 1,
  },
  navButtonText: {
    backgroundColor: '#351100',
    color: '#FFFFF2',
    padding: 15,
    width: '80%',
    fontSize: 20,
    fontFamily: 'serif',
    textAlign: 'center',
  },
});
