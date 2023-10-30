import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RecipeCard({imgURI,text}){
    const navigation = useNavigation();
    return(
        <View>
            <Image style={styles.buttonImg} source={{uri: imgURI}} />
            <Text style={styles.buttonText} onPress={() => navigation.navigate("Recipe", {name: text, image: imgURI})}>{text}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonImg: {
        width: '100%',
        borderWidth: 15,
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