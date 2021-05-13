import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Container, Title, Subtitle, Button, TextButton, Logo } from './style';

import extendedLogo from '../../assets/images/extended-logo.png';

export default function Landing() {
  const navigation = useNavigation();

  const handleLoginScreen = () => navigation.navigate('Login');

  return (
    <Container>
      <StatusBar style="auto" />
      <Logo source={extendedLogo} style={{ resizeMode: 'contain' }} />
      <View>
        <Title>Planejamento Financeiro sem complicações.</Title>
        <Subtitle>
          Com Pocket, seu planejamento financeiro fica muito mais fácil. Deixe as
          planihas de lado e planeja-se com Pocket!
        </Subtitle>
        <Button activeOpacity={0.5} onPress={handleLoginScreen}>
          <TextButton>Entrar</TextButton>
        </Button>
      </View>
    </Container>
  );
}
