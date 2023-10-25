import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RecipeCard({imgURI,text}){
    const navigation = useNavigation();
    return(
        <View>
            <ImageBackground style={styles.buttonImg} source={imgURI} />
            <Text style={styles.buttonText} onPress={() => navigation.navigate("Recipe", {name: text, image: imgURI})}>{text}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonImg: {
        height: 200,
        borderWidth: 15,
        borderColor: '#351100',
      },
      buttonText: {
        backgroundColor: '#351100',
        color: '#FFFFF2',
        padding: 20,
        width: '100%',
        fontSize: 20,
        fontFamily: 'serif',
        textAlign: 'center',
      },
});