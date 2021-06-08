import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

import User from '../../interfaces/User';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content } from './style';

const SignIn: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    emailAgain: '',
    password: '',
    passwordAgain: '',
  });

  useEffect(() => {
    const isInputsEmpties = user.firstName === ''
      || user.lastName === ''
      || user.email === ''
      || user.emailAgain === ''
      || user.password === ''
      || user.passwordAgain === '';
    setIsDisabled(isInputsEmpties);
  }, [user]);

  function handleSubmit() {
    setIsLoading(true);
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <Input
            label="Nome"
            placeholder="Digite seu nome aqui"
            value={user.firstName}
            onChangeText={(text) => setUser({ ...user, firstName: text })}
          />
          <Input
            label="Sobrenome"
            placeholder="Digite seu sobrenome aqui"
            value={user.lastName}
            onChangeText={(text) => setUser({ ...user, lastName: text })}
          />
          <Input
            label="Email"
            placeholder="Digite seu email aqui"
            value={user.email}
            autoCapitalize="none"
            onChangeText={(text) => setUser({ ...user, email: text })}
            keyboardType="email-address"
          />
          <Input
            label="Confirmar email"
            placeholder="Digite novamente seu email aqui"
            value={user.emailAgain}
            autoCapitalize="none"
            onChangeText={(text) => setUser({ ...user, emailAgain: text })}
            keyboardType="email-address"
          />
          <Input
            label="Senha"
            placeholder="Digite sua senha aqui"
            value={user.password}
            onChangeText={(text) => setUser({ ...user, password: text })}
            secureTextEntry
          />
          <Input
            label="Confirmar senha"
            placeholder="Digite novamente sua senha aqui"
            value={user.passwordAgain}
            onChangeText={(text) => setUser({ ...user, passwordAgain: text })}
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
