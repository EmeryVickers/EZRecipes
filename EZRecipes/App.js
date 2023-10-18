import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import axios from "axios";
import NavCard from './components/navCard';

//gets food (not done)
let pastaTest = JSON.stringify(getFood());
async function getFood(){
    try{
        const foodURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";
        const foodResponse = await axios.get(foodURL);

        let foodData = foodResponse.data.meals[0].strMeal;

        //return
        return (foodData);
    }catch(error){
        return ("Error!: " + error);
    }
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>EZRecipes </Text>
      <NavCard imgURI={require('./assets/images/BeansAndRice.jpg')} text='Get a Random Recipe!'></NavCard>
      <NavCard imgURI={require('./assets/images/chickenparm.jpg')} text='Sort by Main Ingredient'></NavCard>
      <NavCard imgURI={require('./assets/images/mapotofu.jpg')} text='Sort by Category'></NavCard>
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
