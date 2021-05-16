import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';

import {
  Container,
  Content,
  Label,
  Input,
  Error,
  Message,
  Submit,
  Link,
} from './style';
import colors from '../../assets/colors';
import Button from '../../components/Button';

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const isInputsEmpties = email === '' || password === '';
    setIsDisabled(isInputsEmpties);
  }, [email, password]);

  function handleSubmit() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }

  function handleSignIn() {
    navigation.navigate('SignIn');
  }

  return (
    <Container>
      <Content>
        <Label>Email</Label>
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Digite aqui seu email"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Label>Senha</Label>
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Digite aqui sua senha"
          autoCapitalize="none"
          secureTextEntry
        />
        <Link>
          <Label alignment="right">Esqueceu sua senha?</Label>
        </Link>

        {errorMessage && (
          <Error>
            <MaterialIcons
              name="error-outline"
              size={24}
              color={colors.danger}
            />
            <Message>Lorem ipsum dolor sit amet.</Message>
          </Error>
        )}
      </Content>

      <Button
        title="Entrar"
        isLoading={isLoading}
        isDisabled={isDisabled}
        onPress={handleSubmit}
      />
      <Link onPress={handleSignIn}>
        <Label alignment="center">Não possui conta? aperte aqui!</Label>
      </Link>
    </Container>
  );
}
