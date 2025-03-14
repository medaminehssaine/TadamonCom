import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';

const COLORS = {
  powderBlue: '#B8D3E1',
  limeYellow: '#D9E872',
  text: '#2A4B5C',
  primaryGradient: ['rgba(184, 211, 225, 0.7)', 'rgba(217, 232, 114, 0.7)'] as [string, string],
  background: '#FFFFFF',
  cardBg: 'rgba(184, 211, 225, 0.1)',
  inputBorder: '#E2E8F0',
  placeholderText: '#94A3B8',
  error: '#DC2626',
  success: '#059669',
  inputBackground: '#FFFFFF',
  inputText: '#1E293B',
  focusBorder: '#B8D3E1',
  heading: '#1E293B',
  logoText: '#1B4242',
  logoSpanText: '#5C8374',
};

const RegisterNeedScreen = () => {
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    title: '',
    description: '',
    quantity: '',
    location: '',
    contactName: '',
    phoneNumber: '',
    email: '',
  });

  type CategoryType = {
    [key: string]: {
      name: string;
      subCategories: string[];
    };
  };
  
  const categories: CategoryType = {
    medical: {
      name: 'Medical Needs',
      subCategories: ['Medications', 'Medical Equipment', 'First Aid Supplies', 'Hygiene Products']
    },
    clothing: {
      name: 'Clothing Needs',
      subCategories: ['Winter Clothing', 'Children Clothing', 'Adult Clothing', 'Shoes']
    },
    food: {
      name: 'Food Needs',
      subCategories: ['Non-perishable Food', 'Baby Food', 'Water', 'Special Dietary Needs']
    },
    essential: {
      name: 'Essential Needs',
      subCategories: ['Blankets', 'Shelter Items', 'Basic Electronics', 'School Supplies']
    }
  };

  const handleSubmit = () => {
    // Here you would implement the API call to submit the form
    console.log('Form submitted:', formData);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={COLORS.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/TadamonLogo.png')}
              style={styles.logoImage}
            />
            <Text style={styles.logo}>
              Tadamon<Text style={styles.logoSpan}>Com</Text>
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category <Text style={styles.required}>*</Text></Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  style={styles.picker}
                >
                  <Picker.Item label="Select a category" value="" />
                  {Object.keys(categories).map((key) => (
                    <Picker.Item 
                      key={key} 
                      label={categories[key].name} 
                      value={key} 
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {formData.category && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Sub-category <Text style={styles.required}>*</Text></Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.subCategory}
                    onValueChange={(value) => setFormData({ ...formData, subCategory: value })}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select a sub-category" value="" />
                    {categories[formData.category].subCategories.map((sub) => (
                      <Picker.Item key={sub} label={sub} value={sub} />
                    ))}
                  </Picker>
                </View>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder="Describe the need in detail"
                multiline
                numberOfLines={4}
                placeholderTextColor={COLORS.placeholderText}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Quantity <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={formData.quantity}
                onChangeText={(text) => setFormData({ ...formData, quantity: text })}
                placeholder="Enter required quantity"
                keyboardType="numeric"
                placeholderTextColor={COLORS.placeholderText}
              />
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Contact Information</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={formData.contactName}
                onChangeText={(text) => setFormData({ ...formData, contactName: text })}
                placeholder="Enter your full name"
                placeholderTextColor={COLORS.placeholderText}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={formData.phoneNumber}
                onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                placeholderTextColor={COLORS.placeholderText}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="Enter your email address (optional)"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={COLORS.placeholderText}
              />
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.primaryButton}>
              <LinearGradient
                colors={COLORS.primaryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Submit Need</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 48,
    justifyContent: 'center',
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
  formContainer: {
    width: '100%',
    maxWidth: 800, // Increased width
    alignSelf: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  required: {
    color: COLORS.error,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.inputText,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  pickerContainer: {
    height: 50, // Réduit à 50 pour être cohérent avec les inputs
    justifyContent: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 0, // Supprimé le padding horizontal
    width: '100%',
    overflow: 'hidden',
  },
  picker: {
    height: 50, // Réduit à 50 pour être cohérent avec les inputs
    width: '100%',
    color: COLORS.inputText,
    backgroundColor: 'transparent',
    // Supprimé les marges négatives
    paddingHorizontal: 16, // Ajouté le padding ici à la place
    marginTop: 0, // Assurez-vous qu'il n'y a pas de marge
    marginBottom: 0,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.powderBlue,
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
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
    marginTop: 24,
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
});

export default RegisterNeedScreen;