import {Stack, Redirect} from "expo-router";
import {useAuthStore} from "@/store/useAuthStore";

export default function ProtectedLayout() {
    const hasHydrated = useAuthStore.persist.hasHydrated();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!hasHydrated) {
        return null;
    }

    if (!isAuthenticated) {
        return <Redirect href={'/login'} />
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            <Stack.Screen name="postComments/[id]" options={{ title: 'Comments', headerBackButtonDisplayMode: 'minimal' }} />
        </Stack>
    )
}