import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ENDPOINT } from '../../utils/validation';

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
  priorityMedium: '#F4D03F', // Warmer yellow
  priorityLow: '#2ECC71',    // Fresh green
  modalBg: 'rgba(0, 0, 0, 0.5)',
  modalCard: '#FFFFFF',
  acceptButton: '#2ECC71', // Green color for accept button
  rejectButton: '#FF4444', // Red color for reject button
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
  const [needs, setNeeds] = useState(TEST_NEEDS);
  const [selectedNeed, setSelectedNeed] = useState<NeedProposal | null>(null);

  const handleInitialDecision = (id: string, isApproved: boolean) => {
    if (!isApproved) {
      Alert.alert(
        'Confirm Rejection',
        'Are you sure you want to reject this need?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Reject',
            style: 'destructive',
            onPress: () => {
              // Simply filter out the rejected need
              setNeeds(prevNeeds => prevNeeds.filter(need => need.id !== id));
              Alert.alert('Success', 'Need has been rejected and removed');
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

  const PriorityModal = () => (
    <View style={styles.modalOverlay}>
      <View style={styles.modalCard}>
        <Text style={styles.modalTitle}>Set Priority Level</Text>
        
        <View style={styles.priorityButtonsRow}>
          <TouchableOpacity 
            style={[styles.priorityButton]}
            onPress={() => handlePrioritySelect('Low')}
          >
            <LinearGradient
              colors={['#2ECC71', '#27AE60']}
              style={styles.priorityButtonGradient}
            >
              <Text style={styles.priorityButtonText}>Low</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.priorityButton]}
            onPress={() => handlePrioritySelect('High')}
          >
            <LinearGradient
              colors={['#FF6B6B', '#EE5253']}
              style={styles.priorityButtonGradient}
            >
              <Text style={styles.priorityButtonText}>High</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.priorityButton]}
            onPress={() => handlePrioritySelect('Medium')}
          >
            <LinearGradient
              colors={['#F4D03F', '#F1C40F']}
              style={styles.priorityButtonGradient}
            >
              <Text style={styles.priorityButtonText}>Medium</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => setSelectedNeed(null)}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNeedItem = ({ item }: { item: NeedProposal }) => (
    <View style={styles.card}>
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
          style={[styles.actionButton, { backgroundColor: COLORS.rejectButton }]}
        >
          <Text onPress={() => {console.log("dyjd"); handleInitialDecision(item.id, false)}} style={styles.actionButtonText}>Reject</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: COLORS.acceptButton }]}
          onPress={() => handleInitialDecision(item.id, true)}
        >
          <Text style={styles.actionButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
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
        
        {!selectedNeed ? (
          <FlatList
            data={needs.filter(n => n.status === 'pending')}
            renderItem={renderNeedItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false} // Hide scrollbar
          />
        ) : (
          <PriorityModal />
        )}
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
    position: 'relative', // For absolute positioning of buttons
  },
  cardContent: {
    flex: 1,
    paddingRight: 16,
    marginBottom: 60, // Space for buttons
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
  actions: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 16,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  rejectButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#ff4444',
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontWeight: 'bold',
  },
  priority: {
    fontSize: 14,
    color: '#666',
  },
  category: {
    backgroundColor: COLORS.powderBlue,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  prioritySelector: {
    padding: 24,
    alignItems: 'center',
  },
  priorityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectedNeedTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  priorityButton: {
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.powderBlue,
  },
  priorityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 24,
    padding: 16,
  },
  cancelText: {
    color: COLORS.text,
    fontSize: 16,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 24,
  },
  priorityButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 24,
  },
  priorityButton: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    overflow: 'hidden',
  },
  priorityButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
  },
  cancelText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
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
    justifyContent: 'center',
    gap: 12,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 6,
    minWidth: 120,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  smallButtonText: {
    fontWeight: '600',
    color: COLORS.text,
    fontSize: 12,
  },
  smallButton: {
    backgroundColor: COLORS.powderBlue,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  acceptButton: {
    backgroundColor: COLORS.powderBlue,
    fontWeight: '600',
    fontSize: 16,
  },
});
