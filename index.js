// app/index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const router = useRouter();

  const goToProfile = () => {
    if (!name.trim()) {
      Alert.alert('Atenção', 'Preencha o nome antes de seguir para o perfil.');
      return;
    }
    router.push({ pathname: '/perfil', params: { name, avatar } });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Mini Perfil</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>URL do avatar</Text>
        <TextInput
          style={styles.input}
          placeholder="https://exemplo.com/avatar.jpg"
          autoCapitalize="none"
          value={avatar}
          onChangeText={setAvatar}
        />

        <Text style={styles.previewLabel}>Preview</Text>
        <View style={styles.previewContainer}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.preview} />
          ) : (
            <View style={styles.previewPlaceholder}>
              <Text style={{ color: '#666' }}>Sem avatar</Text>
            </View>
          )}
        </View>

        <View style={styles.button}>
          <Button title="Ver Perfil" onPress={goToProfile} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#fff' },
  card: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 16, elevation: 2 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  label: { marginTop: 8, marginBottom: 4, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff'
  },
  previewLabel: { marginTop: 12, marginBottom: 6, fontWeight: '600' },
  previewContainer: { alignItems: 'center', marginBottom: 12 },
  preview: { width: 120, height: 120, borderRadius: 60 },
  previewPlaceholder: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center'
  },
  button: { marginTop: 8 }
});
