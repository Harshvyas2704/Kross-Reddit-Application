import { Text } from 'react-native';
import React, { useState } from 'react';
import { useAuthStore } from '@store/useAuthStore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@features/auth/screens/LoginScreen';
import SplashScreen from '@features/auth/screens/SplashScreen';

const Stack = createNativeStackNavigator();

const FeedScreen = () => {
  return <Text>App Stack welcome to app</Text>;
};

const RootNavigator = () => {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const accessToken = useAuthStore(state => state.accessToken);

  if (!isSplashFinished) {
    return <SplashScreen onFinish={() => setIsSplashFinished(true)} />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {accessToken ? (
          <Stack.Screen name="feed" component={FeedScreen} />
        ) : (
          <Stack.Screen name="login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
