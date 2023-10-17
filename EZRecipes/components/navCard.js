import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';


export default function NavCard({imgURL,text}){
    {/*<ImageBackground style={styles.navButtonImg} source={require(imgURL)}>
        <Text style={styles.navButtonText}>{text}</Text>
</ImageBackground>*/}
}
const styles = StyleSheet.create({
    navButtonImg: {
        width: '100%',
        flex: 1,
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
        textAlign: 'center',
      },
});