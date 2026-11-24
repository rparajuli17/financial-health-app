import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

const API_URL = "http://10.0.0.35:3001/health";

type Health = {
  status: string;
  service: string;
  enginesCheck: string;
  db: { latestPingId: number; totalPings: number };
  timestamp: string;
};

export default function Index() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setHealth(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financial Health App</Text>
      <Text style={styles.subtitle}>Step 4 — end-to-end pipe check</Text>

      {loading && <ActivityIndicator />}
      {error && <Text style={styles.error}>API error: {error}</Text>}
      {health && (
        <View style={styles.card}>
          <Text>Status: {health.status}</Text>
          <Text>Service: {health.service}</Text>
          <Text>Engines check: {health.enginesCheck}</Text>
          <Text>
            DB pings: {health.db.totalPings} (latest #{health.db.latestPingId})
          </Text>
          <Text>At: {health.timestamp}</Text>
        </View>
      )}

      <Pressable style={styles.button} onPress={check}>
        <Text style={styles.buttonText}>Ping the API again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 12, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 14, opacity: 0.6 },
  card: { gap: 4, padding: 16, borderWidth: 1, borderColor: "#ccc", borderRadius: 12 },
  error: { color: "#c0392b" },
  button: { marginTop: 8, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 999, backgroundColor: "#208AEF" },
  buttonText: { color: "white", fontWeight: "600" },
});
