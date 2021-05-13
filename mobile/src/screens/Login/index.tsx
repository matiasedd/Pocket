import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Container,
  Content,
  Label,
  Input,
  Button,
  Text,
  Error,
  Message,
  Submit,
  Link,
} from './style';
import colors from '../../assets/colors';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage] = useState(null);

  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const isInputsEmpties = email === '' || password === '';
    setIsDisabled(isInputsEmpties);
  }, [email, password]);

  Keyboard.addListener('keyboardDidHide', () => setIsVisible(true));

  function handleSubmit() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
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
          onFocus={() => setIsVisible(false)}
        />
        <Label>Senha</Label>
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Digite aqui sua senha"
          autoCapitalize="none"
          secureTextEntry
          onFocus={() => setIsVisible(false)}
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

      <Submit visible={isVisible}>
        <Button
          onPress={handleSubmit}
          activeOpacity={0.5}
          disabled={isDisabled}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text>Entrar</Text>
          )}
        </Button>
        <Link>
          <Label alignment="center">
            Não possui conta? aperte aqui!
          </Label>
        </Link>
      </Submit>
    </Container>
  );
}
