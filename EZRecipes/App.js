import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image } from 'react-native';
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NavCard from './components/navCard';
import GroupCard from './components/groupCard';
import RecipeCard from './components/recipeCard';

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
    <NavCard imgURI={require('./assets/images/BeansAndRice.jpg')} text='Get a Random Recipe!'></NavCard>
    <NavCard imgURI={require('./assets/images/chickenparm.jpg')} text='Sort by Main Ingredient'></NavCard>
    <NavCard imgURI={require('./assets/images/mapotofu.jpg')} text='Sort by Category'></NavCard>
    <StatusBar style="auto" />
    </View>
  )
}

//Category List
function Categories({ navigation }){
  return(
    <View style={styles.container}>
      <ScrollView style={{margin: 15, width: '80%'}}contentContainerStyle={{gap: 30}}>
        <GroupCard imgURI={require('./assets/images/BeansAndRice.jpg')} text='Cajun-Creole'></GroupCard>
        <GroupCard imgURI={require('./assets/images/BeansAndRice.jpg')} text='Cajun-Creole'></GroupCard>
        <GroupCard imgURI={require('./assets/images/BeansAndRice.jpg')} text='Cajun-Creole'></GroupCard>
        <GroupCard imgURI={require('./assets/images/BeansAndRice.jpg')} text='Cajun-Creole'></GroupCard>
      </ScrollView>
    </View>
  )
}

//List of Recipes
function RecipeList({route, navigation }){
  const {name} = route.params;
  return(
    <View style={styles.container}>
    <ScrollView style={{margin: 15, width: '80%'}}contentContainerStyle={{gap: 30}}>
      <RecipeCard imgURI={require('./assets/images/BeansAndRice.jpg')} text='Red Beans and Rice'></RecipeCard>
      <RecipeCard imgURI={require('./assets/images/BeansAndRice.jpg')} text='Red Beans and Rice'></RecipeCard>
      <RecipeCard imgURI={require('./assets/images/BeansAndRice.jpg')} text='Red Beans and Rice'></RecipeCard>
      <RecipeCard imgURI={require('./assets/images/BeansAndRice.jpg')} text='Red Beans and Rice'></RecipeCard>
    </ScrollView>
  </View>
  )
}

//Recipe Page
function Recipe({route, navigation }){
  const {name} = route.params;
  const {image} = route.params;
  return(
    <View style={styles.container}>
      <ScrollView style={{margin: 10, width: '80%',}} contentContainerStyle={{alignItems: 'center'}}>
        <Image source={image} style={{borderWidth: 10, borderColor: '#351100', width: '100%'}}></Image>
        <Text style={{fontWeight: 'bold', fontSize: 26, textAlign: 'center', margin: 8}}>{name}</Text>
        <Text style={{fontSize: 20, fontFamily: 'serif',}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sed faucibus turpis in eu mi bibendum neque. Nunc congue nisi vitae suscipit tellus mauris. Accumsan sit amet nulla facilisi. Feugiat scelerisque varius morbi enim nunc faucibus a. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Consequat mauris nunc congue nisi vitae suscipit. Diam quis enim lobortis scelerisque fermentum dui faucibus in. In fermentum et sollicitudin ac orci phasellus egestas. Tincidunt ornare massa eget egestas purus viverra accumsan in. Phasellus egestas tellus rutrum tellus. Sagittis orci a scelerisque purus semper eget duis.</Text>
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
