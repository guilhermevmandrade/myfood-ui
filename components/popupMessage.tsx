import { RelativePathString, Router } from "expo-router";
import React from "react";
import { Dimensions, TouchableOpacity, StyleSheet, Text, View, Modal } from "react-native";

interface PopupMessageProps {
  message: string;
  onClose: () => void;
  redirectTo?: string;
  router: any;
  status: number | null;
}

export default function PopupMessage({ message, onClose, redirectTo, router, status }: PopupMessageProps) {
  const handleClose = () => {
    onClose();
    if (status === 200 && redirectTo) {
      router.push(redirectTo);
    }
  };

  return (
    <Modal visible={!!message} transparent animationType="none">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.messageText}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
