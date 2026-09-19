//Displays the screen name when the user navigates to the /search route.
import { Link } from "expo-router";
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, } from "react-native";

/*
async function fetchData(query: string) {
    const apiUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=science%5bjournal%5d+AND+breast+cancer+AND+2008%5bpdat%5d`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
*/

export default function SearchScreen() {
    const [query, setText] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Search Screen</Text>
              <Link href="/" style={styles.button}>
                Go to Home Screen
              </Link>
              <TextInput placeholder="Insert Query" 
                value={query}
                onChangeText={setText}
                style={styles.text}
              />
            {/* <Text style={styles.text}>{fetchData(query)}</Text> */}
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