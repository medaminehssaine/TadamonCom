import React, { useState } from 'react';


const COLORS = {
  // Primary Colors
  powderBlue: '#B8D3E1',
  limeYellow: '#D9E872',
  
  // Gradients
  primaryGradient: ['#B8D3E1', '#D9E872'] as [string, string],
  reverseGradient: ['#D9E872', '#B8D3E1'] as [string, string],
  overlayGradient: ['rgba(184, 211, 225, 0.9)', 'rgba(217, 232, 114, 0.9)'] as [string, string],
  
  // UI Colors
  background: '#FFFFFF',
  text: '#2A4B5C',
  cardBg: 'rgba(184, 211, 225, 0.1)',
  sectionBg: 'rgba(184, 211, 225, 0.05)', // Changed from cream
  overlayBg: 'rgba(184, 211, 225, 0.2)',
  mainBg: 'rgba(184, 211, 225, 0.05)', // Add this new color for main background
};
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  FlatList,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const App = () => {
  const [activeCommunityTab, setActiveCommunityTab] = useState('Active Needs');
  const [activeDonorTab, setActiveDonorTab] = useState('Urgent Needs');
  const [activeOrgTab, setActiveOrgTab] = useState('Active Operations');

  const needsData = [
    { id: '1', title: 'Medical Supplies', priority: 'High', status: 'Matched', eta: '24 hours' },
    { id: '2', title: 'Shelter', priority: 'High', status: 'Searching', posted: '6 hours ago' },
    { id: '3', title: 'Food Supplies', priority: 'Medium', status: 'Matched', eta: '48 hours' },
    { id: '4', title: 'Clothing', priority: 'Low', status: 'Searching', posted: '2 days ago' },
    { id: '5', title: 'Water', priority: 'High', status: 'Matched', eta: '12 hours' },
  ];

  const testimonialData = [
    { id: '1', text: "TadamonCom helped us...", author: "- Community Leader" },
    { id: '2', text: "We received timely help...", author: "- Local Resident" },
    { id: '3', text: "A great platform for...", author: "- Volunteer" },
    { id: '4', text: "Efficient and reliable...", author: "- NGO Partner" },
    { id: '5', text: "The platform is user-friendly...", author: "- Relief Worker" },
    { id: '6', text: "We managed to coordinate...", author: "- Community Organizer" },
    { id: '7', text: "A lifesaver in times of...", author: "- Disaster Response Team" },
    { id: '8', text: "Highly recommend TadamonCom...", author: "- Donor" },
    { id: '9', text: "The best platform for...", author: "- Volunteer Coordinator" },
    { id: '10', text: "We were able to reach...", author: "- NGO Representative" },
    { id: '11', text: "A seamless experience...", author: "- Aid Recipient" },
    { id: '12', text: "TadamonCom is a game-changer...", author: "- Community Member" },
    { id: '13', text: "The support we received...", author: "- Local Authority" },
    { id: '14', text: "An essential tool for...", author: "- Emergency Services" },
    { id: '15', text: "We couldn't have done it...", author: "- Partner Organization" },
    { id: '16', text: "A reliable and efficient...", author: "- Relief Coordinator" }
  ];

  const renderNeedItem = ({ item }: { item: { id: string; title: string; priority: string; status: string; eta?: string } }) => (
    <View style={styles.needItem}>
      <View style={styles.needHeader}>
        <Text style={styles.needTitle}>{item.title}</Text>
        <View style={[styles.priorityBadge, 
          item.priority === 'High' ? styles.priorityHigh :
          item.priority === 'Medium' ? styles.priorityMedium : 
          styles.priorityLow]}>
          <Text style={styles.priorityText}>{item.priority} Priority</Text>
        </View>
      </View>
      <Text style={styles.needDescription}>Description of need</Text>
      <View style={styles.needFooter}>
        <Text>Status: {item.status}</Text>
        {item.eta && <Text>ETA: {item.eta}</Text>}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <LinearGradient
        colors={COLORS.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.navbar}
      >
        <View style={styles.navContainer}>
          <Text style={styles.logo}>Tadamon<Text style={styles.logoSpan}>Com</Text></Text>
          <View style={styles.navRight}>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navButtonText}>Login / Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Hero Section */}
      <ImageBackground 
  source={require('../../assets/images/bg-img.jpg')} 
  style={styles.hero}
  resizeMode="cover"
>
  <View style={styles.heroContent}>
    <Text style={styles.heroTitle}>Make Good Intentions Matter</Text>
    <Text style={styles.heroText}>Connecting communities, donors, and relief organizations</Text>
    <View style={styles.buttonGroup}>
      <TouchableOpacity style={styles.primaryButton}>
        <LinearGradient
          colors={COLORS.primaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}
        >
          <Text style={styles.buttonText}>Register a Need</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={styles.primaryButton}>
        <LinearGradient
          colors={COLORS.reverseGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}
        >
          <Text style={styles.buttonText}>Make a Donation</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  </View>
</ImageBackground>

      {/* How It Works Section */}
      <View style={styles.section}>
  <Text style={styles.sectionTitle}>How TadamonCom Works</Text>
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={[
      { id: '1', title: 'Register', description: 'Create your account' },
      { id: '2', title: 'Connect', description: 'Find needs and donors' },
      { id: '3', title: 'Coordinate', description: 'Manage aid delivery' },
      { id: '4', title: 'Track', description: 'Monitor progress' }
    ]}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <View style={[styles.cardIcon, { backgroundColor: COLORS.powderBlue }]}>
          <Text style={styles.cardIconText}>{item.id}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
      </View>
    )}
    keyExtractor={item => item.id}
    contentContainerStyle={styles.cardContainer}
  />
</View>

      {/* Community Dashboard */}
      <View style={styles.section}>
        <View style={styles.dashboardHeader}>
          <Text style={styles.dashboardTitle}>Community Dashboard</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <LinearGradient
              colors={COLORS.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}
            >
              <Text style={styles.buttonText}>+ Register New Need</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          {['Active Needs', 'Fulfilled Needs', 'All Needs'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeCommunityTab === tab && styles.activeTab]}
              onPress={() => setActiveCommunityTab(tab)}
            >
              <Text style={activeCommunityTab === tab && styles.activeTabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={needsData}
          renderItem={renderNeedItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.needList}
        />
      </View>

      {/* Impact Stories Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: COLORS.text }]}>Impact Stories</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={testimonialData}
          renderItem={({ item }) => (
            <View style={styles.testimonialCard}>
              <Text style={styles.testimonialText}>"{item.text}"</Text>
              <Text style={styles.testimonialAuthor}>{item.author}</Text>
            </View>
          )}
          contentContainerStyle={styles.testimonialContainer}
        />
      </View>

      {/* Footer */}
      <LinearGradient
        colors={COLORS.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.footer}
      >
        <Text style={styles.footerLogo}>TadamonCom</Text>
        <View style={styles.footerColumns}>
          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Quick Links</Text>
            {/* Add footer links */}
          </View>
          {/* Add more columns */}
        </View>
        <Text style={styles.copyright}>© {new Date().getFullYear()} TadamonCom</Text>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBg, // Change from white to match section background
  },
  
  // Background
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Overlay
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Navbar
  navbar: {
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  
  // Text Styles
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textShadowColor: 'rgba(42, 75, 92, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  // Buttons
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
  
  buttonText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  
  // Cards
  card: {
    width: width * 0.7,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.powderBlue,
  },
  
  // Section Headers
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  
  // Testimonials
  testimonialSection: {
    padding: 24,
    backgroundColor: COLORS.sectionBg,
    marginVertical: 0, // Remove vertical margin
    borderRadius: 0, // Remove border radius
  },
  
  testimonialCard: {
    width: width * 0.8,
    backgroundColor: COLORS.overlayBg,
    borderRadius: 12,
    padding: 20,
    margin: 8,
    borderWidth: 1,
    borderColor: COLORS.powderBlue,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  
  // Footer
  footer: {
    overflow: 'hidden',
    padding: 24,
    marginTop: 0, // Remove top margin
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSpan: {
    color: '#436850', // Second darkest green
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  navButton: {
    backgroundColor: COLORS.powderBlue,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  navButtonText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  hero: {
    height: 600, // Increased height for better image display
    width: '100%',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Lighter overlay for better image visibility
  },
  heroTitle: {
    fontSize: 48, // Larger text
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  heroText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 32,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.powderBlue,
  },
  buttonTextSecondary: {
    color: COLORS.text,
    fontWeight: '500',
  },
  needItem: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    padding: 16,
    margin: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.powderBlue,
  },
  priorityHigh: {
    backgroundColor: COLORS.powderBlue,
  },
  section: {
    padding: 24,
    backgroundColor: COLORS.sectionBg,
    marginVertical: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(184, 211, 225, 0.1)',
  },
  sectionTitleWhite: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text, // Changed from cream
    textAlign: 'center',
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardContainer: {
    paddingVertical: 16,
  },
  cardIcon: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.powderBlue,
  },
  cardIconText: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 16,
    backgroundColor: 'rgba(184, 211, 225, 0.05)',
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: COLORS.text,
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dashboardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#12372A',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(184, 211, 225, 0.2)',
  },
  activeTab: {
    backgroundColor: COLORS.powderBlue,
  },
  activeTabText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  needList: {
    paddingBottom: 16,
  },
  needHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  needTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#12372A',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityMedium: {
    backgroundColor: COLORS.limeYellow,
  },
  priorityLow: {
    backgroundColor: 'rgba(184, 211, 225, 0.5)',
  },
  priorityText: {
    color: COLORS.text, // Changed from cream
    fontSize: 12,
    fontWeight: '500',
  },
  needDescription: {
    color: '#436850',
    marginBottom: 8,
  },
  needFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  testimonialContainer: {
    paddingVertical: 16,
  },
  testimonialText: {
    color: COLORS.text,
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 24,
  },
  testimonialAuthor: {
    color: COLORS.powderBlue,
    fontWeight: 'bold',
    fontSize: 14,
  },
  footerLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  footerColumns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    marginBottom: 24,
  },
  footerColumn: {
    flex: 1,
    minWidth: 150,
  },
  footerHeading: {
    color: COLORS.text, // Changed from cream
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  footerLink: {
    color: COLORS.text,
    marginBottom: 8,
  },
  copyright: {
    color: '#ADBC9F',
    textAlign: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(251, 250, 218, 0.2)',
  },
  langText: {
    color: '#12372A',
    fontSize: 14,
  },
});

export default App;