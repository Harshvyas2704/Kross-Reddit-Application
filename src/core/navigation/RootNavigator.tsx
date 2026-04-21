import { Text } from 'react-native';
import React from 'react';
import { useAuthStore } from '@store/useAuthStore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@features/auth/screens/LoginScreen';

const Stack = createNativeStackNavigator();

const FeedScreen = () => {
  return <Text>App Stack welcome to app</Text>;
};

const RootNavigator = () => {
  const accessToken = useAuthStore(state => state.accessToken);
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
