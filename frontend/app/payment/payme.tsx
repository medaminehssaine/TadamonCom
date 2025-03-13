import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

type RouteParams = {
  needName: string;
  quantity: number;
  totalAmount: number;
};

const COLORS = {
  powderBlue: '#B8D3E1',
  limeYellow: '#D9E872',
  primaryGradient: ['#B8D3E1', '#D9E872'] as [string, string],
  text: '#2A4B5C',
  cardBg: 'rgba(184, 211, 225, 0.1)',
  logoText: '#1B4242',
  logoSpanText: '#5C8374',
};

export default function PaymentScreen() {
  const route = useRoute();
  const { needName = '', quantity: initialQuantity = 0, totalAmount: initialAmount = 0 } = (route.params || {}) as RouteParams;

  const [quantity, setQuantity] = useState(initialQuantity);
  const [totalAmount, setTotalAmount] = useState(initialAmount);
  
  // Calculate price per unit with fallback to 0
  const pricePerUnit = initialQuantity > 0 ? initialAmount / initialQuantity : 0;

  // Update total amount when quantity changes with NaN check
  const handleQuantityChange = (text: string) => {
    const newQuantity = parseInt(text) || 0;
    setQuantity(newQuantity);
    const newTotal = newQuantity * pricePerUnit;
    setTotalAmount(isNaN(newTotal) ? 0 : newTotal);
  };

  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  return (
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

      <View style={styles.orderSummary}>
        <Text style={styles.title}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Need:</Text>
          <Text style={styles.summaryValue}>{needName}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Quantity:</Text>
          <Text style={styles.summaryValue}>{quantity}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Amount:</Text>
          <Text style={styles.summaryValue}>${totalAmount}</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Enter your payment details</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          placeholderTextColor={COLORS.text}
          keyboardType="numeric"
          maxLength={16}
          value={formData.cardNumber}
          onChangeText={(text) => setFormData({...formData, cardNumber: text})}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="MM/YY"
            placeholderTextColor={COLORS.text}
            maxLength={5}
            value={formData.expiryDate}
            onChangeText={(text) => setFormData({...formData, expiryDate: text})}
          />

          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="CVV"
            placeholderTextColor={COLORS.text}
            keyboardType="numeric"
            maxLength={3}
            secureTextEntry
            value={formData.cvv}
            onChangeText={(text) => setFormData({...formData, cvv: text})}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Quantity"
          placeholderTextColor={COLORS.text}
          keyboardType="numeric"
          value={quantity.toString()}
          onChangeText={handleQuantityChange}
        />

        <TouchableOpacity style={styles.primaryButton}>
          <LinearGradient
            colors={COLORS.primaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Pay ${totalAmount}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 32,
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.logoText,
  },
  logoSpan: {
    color: COLORS.logoSpanText,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.7,
    marginBottom: 32,
  },
  formContainer: {
    width: '100%',
    gap: 16,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfInput: {
    flex: 1,
  },
  primaryButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 16,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderSummary: {
    width: '100%',
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: {
    color: COLORS.text,
    opacity: 0.7,
    fontSize: 16,
  },
  summaryValue: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityInput: {
    width: 80,
    height: 40,
    textAlign: 'center',
    marginLeft: 8,
  },
});