import React from 'react';
import { View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import { Container, Logo, Title, Subtitle, Button, TextButton } from './style';

export function Landing() {
  const navigation = useNavigation();

  return (
    <Container>
      <StatusBar style="auto" />
      <Logo>
        <Image
          source={require('../../assets/extended-logo.png')}
          style={{ resizeMode: 'contain', flex: 1 }}
        />
      </Logo>
      <View>
        <Title>Planejamento Financeiro sem complicações.</Title>
        <Subtitle>
          Com Pocket, seu planejamento financeiro fica muito mais fácil. Deixe as
          planihas de lado e planeja-se com Pocket!
        </Subtitle>
        <Button onPress={() => navigation.navigate('Login')}>
          <TextButton>Entrar</TextButton>
        </Button>
      </View>
    </Container>
  );
}
