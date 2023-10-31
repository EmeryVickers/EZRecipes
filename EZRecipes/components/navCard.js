import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NavCard({imgURI,text, name, foodImg, option}){
    const navigation = useNavigation();
    return(
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate(option, {option: option, name: name, image: foodImg})}>
            <ImageBackground style={styles.navButtonImg} source={imgURI}>
                <Text style={styles.navButtonText}>{text}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    navButton: {
        width: '100%',
        flex: 1,
        borderColor: '#351100',
        borderBottomWidth: 4,
      },
      navButtonImg: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: 'center',
      },
      navButtonText: {
        backgroundColor: '#351100',
        color: '#FFFFF2',
        padding: 15,
        width: '80%',
        fontSize: 20,
        fontFamily: 'serif',
        fontWeight: 'bold',
        textAlign: 'center',
      },
});