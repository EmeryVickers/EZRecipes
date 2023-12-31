import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//cards displaying recipes
export default function RecipeCard({imgURI,text,option}){
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={() => navigation.navigate("Recipe", {name: text, image: imgURI, option: option})}>
            <Image style={styles.buttonImg} source={{uri: imgURI}} />
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    buttonImg: {
        width: '100%',
        borderWidth: 10,
        borderColor: '#351100',
        height: 200
      },
      buttonText: {
        backgroundColor: '#351100',
        color: '#FFFFF2',
        padding: 20,
        width: '100%',
        fontSize: 22,
        fontFamily: 'serif',
        textAlign: 'center',
        fontWeight: 'bold',
      },
});