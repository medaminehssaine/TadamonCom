import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import { validateEmail, validatePassword, encodeBase64, hashData, ENDPOINT } from '@/utils/validation';
import { Picker } from '@react-native-picker/picker';

const COLORS = {
  powderBlue: '#B8D3E1',
  limeYellow: '#D9E872',
  primaryGradient: ['rgba(184, 211, 225, 0.7)', 'rgba(217, 232, 114, 0.7)'] as [string, string],
  text: '#2A4B5C',
  cardBg: 'rgba(184, 211, 225, 0.1)',
  logoText: '#1B4242',
  logoSpanText: '#5C8374',
};

const USER_TYPES = [
 
  { id: 'user', label: 'Regular User' },
  { id: 'affected', label: 'Affected Individual' }
];

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setError('');
      setIsLoading(true);

      // Basic validation
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

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (!userType) {
        setError('Please select a user type');
        return;
      }

      // Encode and hash credentials
      const encodedEmail = encodeBase64(email.toLowerCase().trim());
      const hashedPassword = encodeBase64(hashData(password));

      const response = await fetch(ENDPOINT + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: encodedEmail,
          password: hashedPassword,
          userType,
        }),
      });

      // Check content type before parsing
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server error: Expected JSON response but got HTML");
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error("Failed to parse server response");
      }

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      Alert.alert('Success', 'Registration successful!');

    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={COLORS.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />
      
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/TadamonLogo.png')}
            style={styles.logoImage}
          />
          <Text style={styles.logo}>
            Tadamon<Text style={styles.logoSpan}>Com</Text>
          </Text>
        </View>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our community</Text>

        <View style={styles.formContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.text}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            maxLength={50}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={COLORS.text}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            maxLength={20}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={COLORS.text}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            maxLength={20}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={userType}
              onValueChange={(itemValue) => setUserType(itemValue)}
              style={styles.picker}
            >
              {USER_TYPES.map((type) => (
                <Picker.Item 
                  key={type.id} 
                  label={type.label} 
                  value={type.id}
                  color={COLORS.text}
                />
              ))}
            </Picker>
          </View>

          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <LinearGradient
              colors={COLORS.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Creating Account...' : 'Register'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 14,
    marginBottom: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: COLORS.text,
    fontSize: 16,
  },
  loginLink: {
    color: COLORS.logoText,
    fontSize: 16,
    fontWeight: '600',
  },
  pickerContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.powderBlue,
    marginBottom: 24,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: COLORS.text,
  },
});