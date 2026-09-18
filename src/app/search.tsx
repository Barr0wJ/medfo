//Displays the screen name when the user navigates to the /search route.

import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function SearchScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Search Screen</Text>
              <Link href="/" style={styles.button}>
                Go to Home Screen
              </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightskyblue',
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
});