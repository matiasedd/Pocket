import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

import {
  Container, Content, NameContainer, Label, Input,
} from './style';
import Button from '../../components/Button';

interface UserProps {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword?: string,
}

const SignIn: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<UserProps>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const isInputsEmpties = user.firstName === ''
      || user.lastName === ''
      || user.email === ''
      || user.password === ''
      || user.confirmPassword === '';
    setIsDisabled(isInputsEmpties);
  }, [user]);

  function handleSubmit() {
    setIsLoading(true);
    delete user.confirmPassword;
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NameContainer>
          <Content>
            <Label>Nome</Label>
            <Input
              value={user.firstName}
              onChangeText={(text) => setUser({ ...user, firstName: text })}
            />
          </Content>
          <Content>
            <Label>Sobrenome</Label>
            <Input
              value={user.lastName}
              onChangeText={(text) => setUser({ ...user, lastName: text })}
            />
          </Content>
        </NameContainer>
        <Content>
          <Label>Email</Label>
          <Input
            value={user.email}
            autoCapitalize="none"
            onChangeText={(text) => setUser({ ...user, email: text })}
            keyboardType="email-address"
          />
          <Label>Senha</Label>
          <Input
            value={user.password}
            onChangeText={(text) => setUser({ ...user, password: text })}
            secureTextEntry
          />
          <Label>Confirmar senha</Label>
          <Input
            value={user.confirmPassword}
            onChangeText={(text) => setUser({ ...user, confirmPassword: text })}
            secureTextEntry
          />
        </Content>
      </ScrollView>
      <Button
        title="Confirmar"
        onPress={handleSubmit}
        isDisabled={isDisabled}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default SignIn;
