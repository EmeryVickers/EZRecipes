import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, FlatList } from 'react-native';
import axios from "axios";
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NavCard from './components/navCard';
import GroupCard from './components/groupCard';
import RecipeCard from './components/recipeCard';

//stack nav
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{
          title: 'EZRecipes',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
          headerTintColor: '#FFFFF2',
        }}/>
        <Stack.Screen name="Categories" component={Categories} options={{
          title: 'Sort by Category',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
          headerTintColor: '#FFFFF2',
        }}  />
        <Stack.Screen name="Areas" component={Areas} options={{
          title: 'Sort by Area',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
          headerTintColor: '#FFFFF2',
        }}  />
        <Stack.Screen name="RecipeList" component={RecipeList} options={({ route }) => ({
          title: route.params.name,           
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
          headerTintColor: '#FFFFF2',})}  />
        <Stack.Screen name="Recipe" component={Recipe} options={({ route }) => ({
          title: route.params.name,           
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
          headerTintColor: '#FFFFF2',})}  />
        
    </Stack.Navigator>
  );
}

//app with nav container
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

//Homepage
function Home({ navigation }){
  return(
    <View style={styles.container}>
    <NavCard imgURI={require('./assets/images/BeansAndRice.jpg')} text='Get a Random Recipe!' option='Recipe' name="Random Recipe!"></NavCard>
    <NavCard imgURI={require('./assets/images/chickenparm.jpg')} text='Sort by Area' option='Areas'></NavCard>
    <NavCard imgURI={require('./assets/images/mapotofu.jpg')} text='Sort by Category' option='Categories'></NavCard>
    <StatusBar style="auto" />
    </View>
  )
}

//Category List
function Categories({ navigation, route }){
  const { option } = route.params;

  const [categories, setCategories] = useState('Placeholder');
  const categoryURL = `https://www.themealdb.com/api/json/v1/1/list.php?c=list`;

  const getCategories = async () => {
    const catReq = await axios.get(categoryURL).then((response) => {
      setCategories(response.data.meals);
    });
  }

  useEffect(() =>{
    getCategories();
  }, []);

  return(
    <View style={styles.container}>
    <FlatList data={categories} renderItem={({item}) => <GroupCard imgURI={item.strMealThumb} text={item.strCategory} option={option}></GroupCard>}  style={{margin: 15, width: '80%'}}contentContainerStyle={{gap: 20}}/>
    </View>
  )
}

//Areas List
function Areas({ navigation, route }){
  const { option } = route.params;

  const [areas, setAreas] = useState('Placeholder');
  const areaURL = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;

  const getAreas = async () => {
    const areaReq = await axios.get(areaURL).then((response) => {
      setAreas(response.data.meals);
    });
  }

  useEffect(() =>{
    getAreas();
  }, []);

  return(
    <View style={styles.container}>
    <FlatList data={areas} renderItem={({item}) => <GroupCard imgURI={item.strMealThumb} text={item.strArea} option={option}></GroupCard>}  style={{margin: 15, width: '80%'}}contentContainerStyle={{gap: 20}}/>
    </View>
  )
}

//List of Recipes
function RecipeList({route, navigation }){
  const {name} = route.params;
  const {option} = route.params;

  let listFilter;
  if(option === "Categories"){
    listFilter = 'c';
  }else if(option === "Areas"){
    listFilter = 'a';
  }

  const [food, setFood] = useState('Placeholder');
  const foodURL = `https://www.themealdb.com/api/json/v1/1/filter.php?${listFilter}=${name}`;

  const getFood = async () => {
    const foodReq = await axios.get(foodURL).then((response) => {
      setFood(response.data.meals);
    });
  }

  useEffect(() =>{
    getFood();
  }, []);

  return(
    <View style={styles.container}>
      <FlatList data={food} renderItem={({item}) => <RecipeCard imgURI={item.strMealThumb} text={item.strMeal} option={option}></RecipeCard>}  style={{margin: 15, width: '80%'}}contentContainerStyle={{gap: 30}}/>
    </View>
  )
}

//Recipe Page
function Recipe({route, navigation }){
  const {name} = route.params;
  const {image} = route.params;
  const {option} = route.params;

  const [food, setFood] = useState('Placeholder');

  //if navigating straight to recipe page, get a random one
  //otherwise get the chosen recipe
  const foodURL = option === 'Recipe' ? "https://www.themealdb.com/api/json/v1/1/random.php": `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

  const getFood = async () => {
    const foodReq = await axios.get(foodURL).then((response) => {
      setFood(response.data.meals);
    });
  }

  useEffect(() =>{
    getFood();
  }, []);

  return(
    <View style={styles.container}>
      <ScrollView style={{margin: 10, width: '80%',}} contentContainerStyle={{alignItems: 'center'}}>
        <Image source={{uri: food[0].strMealThumb}} style={{borderWidth: 10, borderColor: '#351100', width: '100%', height: 300}}></Image>
        <Text style={{fontWeight: 'bold', fontSize: 26, textAlign: 'center', margin: 8}}>{food[0].strMeal}</Text>
        
        {/* Ingredients! */}
        <Text style={{fontWeight: 'bold', fontSize: 22, textAlign: 'center', margin: 8}}>Ingredients</Text>
        {food[0].strIngredient1 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient1}: {food[0].strMeasure1}</Text>) : null}
        {food[0].strIngredient2 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient2}: {food[0].strMeasure2}</Text>) : null}
        {food[0].strIngredient3 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient3}: {food[0].strMeasure3}</Text>) : null}
        {food[0].strIngredient4 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient4}: {food[0].strMeasure4}</Text>) : null}
        {food[0].strIngredient5 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient5}: {food[0].strMeasure5}</Text>) : null}
        {food[0].strIngredient6 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient6}: {food[0].strMeasure6}</Text>) : null}
        {food[0].strIngredient7 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient7}: {food[0].strMeasure7}</Text>) : null}
        {food[0].strIngredient8 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient8}: {food[0].strMeasure8}</Text>) : null}
        {food[0].strIngredient9 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient9}: {food[0].strMeasure9}</Text>) : null}
        {food[0].strIngredient10 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient10}: {food[0].strMeasure10}</Text>) : null}
        {food[0].strIngredient11 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient11}: {food[0].strMeasure11}</Text>) : null}
        {food[0].strIngredient12 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient12}: {food[0].strMeasure12}</Text>) : null}
        {food[0].strIngredient13 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient13}: {food[0].strMeasure13}</Text>) : null}
        {food[0].strIngredient14 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient14}: {food[0].strMeasure14}</Text>) : null}
        {food[0].strIngredient15 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient15}: {food[0].strMeasure15}</Text>) : null}
        {food[0].strIngredient16 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient16}: {food[0].strMeasure16}</Text>) : null}
        {food[0].strIngredient17 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient17}: {food[0].strMeasure17}</Text>) : null}
        {food[0].strIngredient18 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient18}: {food[0].strMeasure18}</Text>) : null}
        {food[0].strIngredient19 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient19}: {food[0].strMeasure19}</Text>) : null}
        {food[0].strIngredient20 ? (<Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strIngredient20}: {food[0].strMeasure20}</Text>) : null}

        {/* Instructions */}
        <Text style={{fontWeight: 'bold', fontSize: 22, textAlign: 'center', margin: 8}}>Instructions</Text>
        <Text style={{fontSize: 20, fontFamily: 'serif',}}>{food[0].strInstructions}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF2',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#351100',
    borderBottomColor: 'black',
    borderWidth: 1,
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: '#FFFFF2',

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
