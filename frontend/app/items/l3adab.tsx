import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Animated, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Types for needs proposals
type NeedProposal = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  priority?: 'High' | 'Medium' | 'Low';
  submittedBy: string;
  submittedAt: string;
  contact: string;
  quantity: number;
  location: string;
  category: string;
};

const COLORS = {
  powderBlue: '#B8D3E1',
  limeYellow: '#D9E872',
  primaryGradient: ['rgba(184, 211, 225, 0.7)', 'rgba(217, 232, 114, 0.7)'] as [string, string],
  text: '#2A4B5C',
  cardBg: 'rgba(184, 211, 225, 0.1)',
  priorityHigh: '#FF6B6B',
  priorityMedium: '#F4D03F',
  priorityLow: '#2ECC71',
  modalBg: 'rgba(0, 0, 0, 0.7)',
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  modalCard: '#FFFFFF',
  acceptButton: '#4CAF50',
  rejectButton: '#E53935',
  buttonText: '#FFFFFF',
  modalShadow: '#000000',
};

// Add test data
const TEST_NEEDS: NeedProposal[] = [
  {
    id: '1',
    title: 'Medical Supplies for Local Clinic',
    description: 'Need urgent medical supplies including bandages, antiseptics, and basic medications',
    status: 'pending',
    submittedBy: 'Dr. Ahmed',
    submittedAt: '2024-01-20',
    location: 'Casablanca',
    category: 'Medical',
    contact: '+212 666-123456',
    quantity: 100
  },
  {
    id: '2',
    title: 'Emergency Food Supplies',
    description: 'Food supplies needed for 50 families affected by recent flooding',
    status: 'pending',
    submittedBy: 'Relief Center',
    submittedAt: '2024-01-21',
    location: 'Rabat',
    category: 'Food',
    contact: '+212 666-654321',
    quantity: 50
  },
  {
    id: '3',
    title: 'Shelter Materials Needed',
    description: 'Tents and basic shelter materials for displaced families',
    status: 'pending',
    submittedBy: 'Local Authority',
    submittedAt: '2024-01-19',
    location: 'Marrakech',
    category: 'Shelter',
    contact: '+212 666-789012',
    quantity: 30
  }
];

export default function NeedsManagerScreen() {
  const router = useRouter();
  const [needs, setNeeds] = useState(TEST_NEEDS);
  const [selectedNeed, setSelectedNeed] = useState<NeedProposal | null>(null);
  const [fadeAnims] = useState<{ [key: string]: Animated.Value }>({});
  const [slideAnims] = useState<{ [key: string]: Animated.Value }>({});

  // Initialize fade and slide animations for each need
  useEffect(() => {
    needs.forEach(need => {
      if (!fadeAnims[need.id]) {
        fadeAnims[need.id] = new Animated.Value(1);
        slideAnims[need.id] = new Animated.Value(0);
      }
    });
  }, [needs, fadeAnims, slideAnims]);

  const handleInitialDecision = (id: string, isApproved: boolean) => {
    if (!isApproved) {
      router.push("/home")
      Alert.alert(
        'Confirm Rejection',
        'Are you sure you want to reject this need?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Reject',
            style: 'destructive',
            onPress: () => {
              const fadeAnim = fadeAnims[id];
              const slideAnim = slideAnims[id];
              
              if (fadeAnim && slideAnim) {
                Animated.parallel([
                  Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                  }),
                  Animated.timing(slideAnim, {
                    toValue: -500,
                    duration: 300,
                    useNativeDriver: true,
                  }),
                ]).start(() => {
                  // Update the needs state after animation completes
                  setNeeds(prevNeeds => 
                    prevNeeds.map(need => 
                      need.id === id 
                        ? { ...need, status: 'rejected' }
                        : need
                    )
                  );
                });
              }
            }
          }
        ]
      );
      return;
    }
    const need = needs.find(n => n.id === id);
    if (need) {
      setSelectedNeed(need);
    }
  };

  const handlePrioritySelect = (priority: 'High' | 'Medium' | 'Low') => {
    if (selectedNeed) {
      setNeeds(needs.map(need => 
        need.id === selectedNeed.id ? { ...need, priority, status: 'approved' } : need
      ));
      setSelectedNeed(null);
      Alert.alert('Success', `Need has been marked as ${priority} priority`);
    }
  };

  // Update PriorityModal component
  const PriorityModal = () => (
    <Modal
      transparent={true}
      animationType="fade"
      visible={!!selectedNeed}
      onRequestClose={() => setSelectedNeed(null)}
    >
      <View style={styles.modalOverlay}>
        <Animated.View style={styles.modalCard}>
          <LinearGradient
            colors={['rgba(255,255,255,0.98)', 'rgba(255,255,255,0.95)']}
            style={styles.modalCardContent}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set Priority Level</Text>
              <Text style={styles.modalSubtitle}>
                {selectedNeed?.title}
              </Text>
            </View>
            
            <View style={styles.priorityButtonsRow}>
              {['High', 'Medium', 'Low'].map((priority) => (
                <TouchableOpacity 
                  key={priority}
                  style={[styles.priorityButton]}
                  onPress={() => handlePrioritySelect(priority as 'High' | 'Medium' | 'Low')}
                >
                  <LinearGradient
                    colors={
                      priority === 'High' ? ['#FF6B6B', '#EE5253'] :
                      priority === 'Medium' ? ['#F4D03F', '#F1C40F'] :
                      ['#2ECC71', '#27AE60']
                    }
                    style={styles.priorityButtonGradient}
                  >
                    <Text style={styles.priorityButtonText}>{priority}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setSelectedNeed(null)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );

  const renderNeedItem = ({ item }: { item: NeedProposal }) => (
    <Animated.View 
      style={[
        styles.card,
        {
          opacity: fadeAnims[item.id] || 1,
          transform: [{ translateX: slideAnims[item.id] || 0 }],
        }
      ]}
    >
      <View style={styles.cardContent}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📍 Location:</Text>
          <Text style={styles.infoText}>{item.location}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📞 Contact:</Text>
          <Text style={styles.infoText}>{item.contact}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📦 Quantity:</Text>
          <Text style={styles.infoText}>{item.quantity} units</Text>
        </View>

        <Text style={styles.meta}>
          Submitted by {item.submittedBy} on {new Date(item.submittedAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.actionsWrapper}>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.acceptBtn]}
          onPress={() => router.push(`/pay/${item.id}`)}
        >
          <Text style={styles.actionButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={COLORS.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />
      
      <View style={styles.container}>
        <Text style={styles.header}>Needs Review</Text>
        
        <FlatList
          data={needs.filter(n => n.status === 'pending')}
          renderItem={renderNeedItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
        />
      </View>

      <PriorityModal />
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
    padding: 16,
    zIndex: 1,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.powderBlue,
    position: 'relative',
  },
  cardContent: {
    flex: 1,
    paddingRight: 16,
    marginBottom: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  category: {
    backgroundColor: COLORS.powderBlue,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text,
  },
  actionsWrapper: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  actionButtonText: {
    color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  acceptBtn: {
    backgroundColor: COLORS.acceptButton,
  },
  rejectBtn: {
    backgroundColor: COLORS.rejectButton,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.modalOverlay,
  },
  modalCard: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 16,
    shadowColor: COLORS.modalShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
  },
  modalCardContent: {
    padding: 32,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.7,
    textAlign: 'center',
  },
  priorityButtonsRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  priorityButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  priorityButtonGradient: {
    padding: 16,
    borderRadius: 12,
    width: '100%',
    minWidth: 100,
  },
  priorityButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
    alignSelf: 'center',
  },
  cancelText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
  },
});