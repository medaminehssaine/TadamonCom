import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const App = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <View style={styles.navContainer}>
          <Text style={styles.logo}>Tadamon<span style={styles.logoSpan}>Com</span></Text>
          <View style={styles.navLinks}>
            <TouchableOpacity><Text style={styles.navLink}>How It Works</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.navLink}>For Communities</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.navLink}>For Donors</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.navLink}>For Organizations</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.navLink}>Contact</Text></TouchableOpacity>
          </View>
          <View style={styles.languageSelector}>
            <TouchableOpacity><Text style={styles.navLink}>العربية</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.navLink}>English</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.navLink}>Français</Text></TouchableOpacity>
            <TouchableOpacity style={styles.navButton}><Text style={styles.navButtonText}>Login / Register</Text></TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Make Good Intentions Matter</Text>
        <Text style={styles.heroText}>TadamonCom connects affected communities, donors, and relief organizations to ensure aid reaches those who need it most, when they need it.</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.primaryButton}><Text style={styles.buttonText}>Register a Need</Text></TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}><Text style={styles.buttonTextSecondary}>Make a Donation</Text></TouchableOpacity>
        </View>
      </View>

      {/* Additional Sections can be added similarly */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  navbar: {
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  logoSpan: {
    color: '#f59e0b',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 20,
  },
  navLink: {
    color: '#1f2937',
    fontWeight: '500',
  },
  languageSelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 5,
  },
  navButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  hero: {
    padding: 60,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 30,
    color: 'white',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 5,
  },
  secondaryButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  buttonTextSecondary: {
    color: '#2563eb',
    fontWeight: '500',
  },
});

export default App;