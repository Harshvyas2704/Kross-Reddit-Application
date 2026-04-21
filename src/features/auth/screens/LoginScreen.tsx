import { useAuthStore } from '@store/useAuthStore';
import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { loginUser } from '../services/auth.service';
import { theme } from '@core/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { KrossInput } from 'src/components/KrossInput';

export const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const setAuth = useAuthStore(state => state.setAuth);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg('Email and Password required.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const result = await loginUser({ email, password });
      console.log(result, 'result');

      setAuth(result.user, result.accessToken, result.refreshToken);
    } catch (error) {
      console.log(error);

      setErrorMsg('Invalid Credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Logo Text Alternative */}
        <Text style={styles.logoText}>
          <Text style={{ color: theme.colors.textPrimary }}>KROSS </Text>
          <Text style={{ color: theme.colors.primary }}>REDDIT</Text>
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome Back</Text>

        {/* Inputs */}
        <KrossInput
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <KrossInput
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={errorMsg}
        />

        {/* Forgot Password */}
        <Pressable style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </Pressable>

        {/* Main Action */}
        <Pressable
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginButtonText}>LOG IN</Text>
          )}
        </Pressable>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <Pressable>
          <Text style={styles.signupText}>Sign up here</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
