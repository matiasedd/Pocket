import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, Content, Label } from './style';

interface InputProps extends TextInputProps {
  label: string;
}

// eslint-disable-next-line react/prop-types
const InputComponent: React.FC<InputProps> = ({ label, ...rest }) => (
  <Container>
    <Label>{label}</Label>
    <Content {...rest} />
  </Container>
);

export default InputComponent;
