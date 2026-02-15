import { useAuthStore } from "@/stores/useAuthStore";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);

  if (!_hasHydrated) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href={"/"} />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  )
}