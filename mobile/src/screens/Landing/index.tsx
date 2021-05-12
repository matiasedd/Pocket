import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Container, Title, Subtitle, Button, TextButton, Logo,
} from './style';

import extendedLogo from '../../assets/images/extended-logo.png';

export default function Landing() {
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
        <Button>
          <TextButton>Entrar</TextButton>
        </Button>
      </View>
    </Container>
  );
}
