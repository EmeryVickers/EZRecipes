import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GroupCard({imgURI,text}){
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={() => navigation.navigate("RecipeList", {name: text})}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    buttonImg: {
        width: '100%',
        borderWidth: 15,
        borderColor: '#351100',
      },
      buttonText: {
        backgroundColor: '#351100',
        color: '#FFFFF2',
        padding: 20,
        width: '100%',
        fontSize: 22,
        fontFamily: 'serif',
        fontWeight: 'bold',
        textAlign: 'center',
      },
});