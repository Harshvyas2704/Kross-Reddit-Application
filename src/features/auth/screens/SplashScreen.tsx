import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { theme } from '@core/theme';
import { moderateScale } from '@core/theme/responsive';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* FIXED: Removed the emoji, cleaned the container */}
        <View style={styles.logoPlaceholder}>
          <Image
            source={require('../../../assets/images/kross-reddit-image-no-name.png')}
            style={styles.logoStyle}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>
          <Text style={[styles.subtitle]}>KROSS </Text>
          <Text style={{ color: theme.colors.primary }}>REDDIT</Text>
        </Text>
      </Animated.View>
    </View>
  );
};

const LOGO_SIZE = moderateScale(180);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContainer: {
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.l, // Space between logo and text
  },
  logoStyle: {
    width: '100%',
    height: '100%',
    // Image ab strictly container(LOGO_SIZE) ke andar fit hogi
  },
  title: {
    ...theme.typography.h1,
    letterSpacing: 4,
    fontWeight: '900',
  },
  subtitle: {
    color: '#FFFFFF',
  },
});

export default SplashScreen;
