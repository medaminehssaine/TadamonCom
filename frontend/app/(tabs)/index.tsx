import React, { useState } from 'react';
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
      <View style={styles.navbar}>
        <View style={styles.navContainer}>
          <Text style={styles.logo}>Tadamon<Text style={styles.logoSpan}>Com</Text></Text>
          <View style={styles.navRight}>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navButtonText}>Login / Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Hero Section */}
      <ImageBackground 
        source={{ uri: 'https://placekitten.com/1200/600' }} 
        style={styles.hero}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']}
          style={styles.heroContent}
        >
          <Text style={styles.heroTitle}>Make Good Intentions Matter</Text>
          <Text style={styles.heroText}>Connecting communities, donors, and relief organizations</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Register a Need</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.buttonTextSecondary}>Make a Donation</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* How It Works Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How TadamonCom Works</Text>
        <FlatList
          horizontal
          data={[1, 2, 3, 4]}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardIcon}>
                <Text style={styles.cardIconText}>{item}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Step {item}</Text>
                <Text>Description of step</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.cardContainer}
        />
      </View>

      {/* Community Dashboard */}
      <View style={styles.section}>
        <View style={styles.dashboardHeader}>
          <Text style={styles.dashboardTitle}>Community Dashboard</Text>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text>+ Register New Need</Text>
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

      <LinearGradient colors={['#2563eb', '#1d4ed8']} style={styles.testimonialSection}>
        <Text style={styles.sectionTitleWhite}>Impact Stories</Text>
        <FlatList
          horizontal
          data={testimonialData}
          renderItem={({ item }) => (
            <View style={styles.testimonialCard}>
              <Text style={styles.testimonialText}>"{item.text}"</Text>
              <Text style={styles.testimonialAuthor}>{item.author}</Text>
            </View>
          )}
          contentContainerStyle={styles.testimonialContainer}
        />
      </LinearGradient>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerLogo}>TadamonCom</Text>
        <View style={styles.footerColumns}>
          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Quick Links</Text>
            {/* Add footer links */}
          </View>
          {/* Add more columns */}
        </View>
        <Text style={styles.copyright}>© 2023 TadamonCom</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFADA',
  },
  navbar: {
    backgroundColor: '#ADBC9F',
    padding: 16,
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
    color: '#12372A', // Darkest green from palette
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    backgroundColor: '#12372A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  navButtonText: {
    color: '#FBFADA',
    fontWeight: '500',
  },
  hero: {
    height: 400,
    backgroundColor: '#436850', // Second darkest green
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 32,
    color: '#FBFADA',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroText: {
    fontSize: 18,
    color: '#FBFADA',
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#12372A',
    padding: 16,
    borderRadius: 4,
  },
  secondaryButton: {
    backgroundColor: '#FBFADA',
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#12372A',
  },
  buttonText: {
    color: '#FBFADA',
    fontWeight: '500',
  },
  buttonTextSecondary: {
    color: '#12372A',
    fontWeight: '500',
  },
  card: {
    width: width * 0.8,
    backgroundColor: '#FBFADA',
    borderRadius: 8,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ADBC9F',
  },
  needItem: {
    backgroundColor: '#FBFADA',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ADBC9F',
  },
  priorityHigh: {
    borderLeftColor: '#12372A',
  },
  section: {
    padding: 24,
    backgroundColor: '#FBFADA',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#12372A',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionTitleWhite: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FBFADA',
    textAlign: 'center',
    marginBottom: 16,
  },
  cardContainer: {
    paddingVertical: 16,
  },
  cardIcon: {
    backgroundColor: '#ADBC9F',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconText: {
    color: '#12372A',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#12372A',
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
    borderRadius: 4,
    backgroundColor: '#ADBC9F',
  },
  activeTab: {
    backgroundColor: '#12372A',
  },
  activeTabText: {
    color: '#FBFADA',
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
    backgroundColor: '#436850',
  },
  priorityLow: {
    backgroundColor: '#ADBC9F',
  },
  priorityText: {
    color: '#FBFADA',
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
  testimonialSection: {
    padding: 24,
    backgroundColor: '#436850',
  },
  testimonialContainer: {
    paddingVertical: 16,
  },
  testimonialCard: {
    width: width * 0.8,
    backgroundColor: 'rgba(251, 250, 218, 0.1)',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderColor: '#FBFADA',
  },
  testimonialText: {
    color: '#FBFADA',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  testimonialAuthor: {
    color: '#FBFADA',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#12372A',
    padding: 24,
  },
  footerLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FBFADA',
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
    color: '#FBFADA',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  footerLink: {
    color: '#ADBC9F',
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