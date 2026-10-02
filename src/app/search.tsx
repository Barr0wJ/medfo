import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { SemanticScholarPaperResult } from "../lib/apicall";

export default function SearchScreen() {
  const [query, setQuery] = useState("transformer");
  const [results, setResults] = useState<SemanticScholarPaperResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8081/api/search?q=${encodeURIComponent(query)}&limit=5`
      );

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed (${response.status})`);
      }

      const data = await response.json();
      setResults(data.results ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void handleSearch();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Screen</Text>

      <Link href="/" style={styles.button}>
        <Text style={styles.button}>Go to Home Screen</Text>
      </Link>

      <TextInput
        placeholder="Insert Query"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
        onSubmitEditing={() => void handleSearch()}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView style={styles.resultsContainer}>
          {results.map((paper) => (
            <View key={paper.paperId ?? paper.title ?? paper.url ?? `${paper.title}-${paper.year}`} style={styles.resultCard}>
              <Text style={styles.resultTitle}>{paper.title ?? "Untitled paper"}</Text>
              <Text style={styles.resultMeta}>{paper.year ?? "Unknown year"}</Text>
              <Text style={styles.resultMeta}>{paper.venue ?? "Unknown venue"}</Text>
              <Text style={styles.resultAbstract} numberOfLines={4}>
                {paper.abstract ?? "No abstract available."}
              </Text>

              {paper.url ? (
                <Pressable
                  accessibilityRole="link"
                  onPress={() => void Linking.openURL(paper.url!)}
                >
                  <Text style={styles.paperLink}>Open paper</Text>
                </Pressable>
              ) : null}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightskyblue",
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    fontSize: 18,
    textDecorationLine: "underline",
    color: "#fff",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  resultsContainer: {
    width: "100%",
    marginTop: 12,
  },
  resultCard: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  resultMeta: {
    fontSize: 12,
    color: "#333",
    marginBottom: 4,
  },
  resultAbstract: {
    fontSize: 12,
    color: "#222",
  },
  error: {
    color: "#b00020",
    fontSize: 14,
    fontWeight: "600",
  },
  paperLink: {
    color: "#0645AD",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    textDecorationLine: "underline",
  },
});