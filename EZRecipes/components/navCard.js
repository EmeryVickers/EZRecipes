import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NavCard({imgURI,text}){
    const navigation = useNavigation();
    return(
        <ImageBackground style={styles.navButtonImg} source={imgURI}>
            <Text style={styles.navButtonText} onPress={() => navigation.navigate("Categories")}>{text}</Text>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    navButtonImg: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: 'center',
        borderColor: '#351100',
        borderBottomWidth: 4,
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