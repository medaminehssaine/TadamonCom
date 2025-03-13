import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="admin/needs-manager" 
        options={{ 
          title: 'Needs Management',
          headerShown: false 
        }} 
      />
      // ...other screen configurations...
    </Stack>
  );
}
