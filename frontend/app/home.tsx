import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// router.push('/auth/register')
const COLORS = {
  powderBlue: '#B8D3E1',
  limeYellow: '#D9E872',
  primaryGradient: ['rgba(184, 211, 225, 0.7)', 'rgba(217, 232, 114, 0.7)'] as [string, string],
  text: '#2A4B5C',
  cardBg: 'rgba(184, 211, 225, 0.1)',
  logoText: '#1B4242',
  logoSpanText: '#5C8374',
};

export default function HomePage() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={COLORS.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />
      
      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/TadamonLogo.png')}
            style={styles.logoImage}
          />
          <Text style={styles.logo}>
            Tadamon<Text style={styles.logoSpan}>Com</Text>
          </Text>
        </View>

        <Text style={styles.title}>Welcome to TadamonCom</Text>
        <Text style={styles.subtitle}>Connecting Communities Through Aid</Text>

        <View style={styles.formContainer}>
          {/* Vertical Feature Cards */}
          <ScrollView 
            horizontal={false} // Change to vertical scrolling
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.featureCards}
          >
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Register Needs</Text>
              <Text style={styles.featureText}>Submit and track community needs</Text>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Connect</Text>
              <Text style={styles.featureText}>Link with relief organizations</Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Coordinate</Text>
              <Text style={styles.featureText}>Find donors and manage aid</Text>
            </View>
          </ScrollView>

          {/* Spacer */}
          <View style={styles.buttonSpacer} />

          {/* Auth Buttons */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/auth/login')}
          >
            <LinearGradient
              colors={COLORS.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.buttonGap} />

          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/auth/register')}
          >
            <LinearGradient
              colors={[...COLORS.primaryGradient].reverse() as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Register</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 48,
  },
  logoImage: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.logoText,
    textShadowColor: 'rgba(27, 66, 66, 0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  logoSpan: {
    color: COLORS.logoSpanText,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 32,
    opacity: 0.8,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'stretch',
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.8,
  },
  featureCards: {
    width: '100%',
    gap: 16,
  },
  featureCard: {
    width: '100%', // Changed from fixed width to 100%
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.powderBlue,
  },
  buttonSpacer: {
    height: 48, // Space between cards and buttons
  },
  buttonGap: {
    height: 16, // Space between buttons
  },
  primaryButton: {
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  authButton: {
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
});
