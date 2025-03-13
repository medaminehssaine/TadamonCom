import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import { validateEmail, validatePassword, encodeBase64 } from '../../utils/validation';

const COLORS = {
  powderBlue: '#B8D3E1',
  limeYellow: '#D9E872',
  primaryGradient: ['rgba(184, 211, 225, 0.7)', 'rgba(217, 232, 114, 0.7)'] as [string, string],
  text: '#2A4B5C',
  cardBg: 'rgba(184, 211, 225, 0.1)',
  logoText: '#1B4242',
  logoSpanText: '#5C8374',
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text.toLowerCase().trim());
    setError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setError('');
  };

  const handleLogin = async () => {
    try {
      setError('');
      setIsLoading(true);

      // Validate inputs
      const emailError = validateEmail(email);
      if (emailError) {
        setError(emailError);
        return;
      }

      const passwordError = validatePassword(password);
      if (passwordError) {
        setError(passwordError);
        return;
      }

      // Encode credentials
      const encodedEmail = encodeBase64(email);
      const encodedPassword = encodeBase64(password);

      const response = await fetch('YOUR_API_ENDPOINT/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: encodedEmail,
          password: encodedPassword,
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned invalid response. Please try again later.");
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error("Failed to parse server response. Please try again.");
      }

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log('Login successful:', data);

    } catch (err: any) {
      const errorMessage = err.message || 'Something went wrong';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={COLORS.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />
      
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/TadamonLogo.png')}
            style={styles.logoImage}
          />
          <Text style={styles.logo}>
            Tadamon<Text style={styles.logoSpan}>Com</Text>
          </Text>
        </View>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <View style={styles.formContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.text}
            keyboardType="email-address"
            value={email}
            onChangeText={handleEmailChange}
            maxLength={50}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={COLORS.text}
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
            maxLength={20}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <LinearGradient
              colors={COLORS.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Loading...' : 'Login'}
              </Text>
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
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.powderBlue,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: COLORS.text,
    fontSize: 14,
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
    marginBottom: 24,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});