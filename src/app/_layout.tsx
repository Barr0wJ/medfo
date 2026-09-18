import { Stack } from 'expo-router';


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'Home' }} />
      <Stack.Screen name="search" options={{ headerTitle: 'Search' }} />
    </Stack>
  );
}
