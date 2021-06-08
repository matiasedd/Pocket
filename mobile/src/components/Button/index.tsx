/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacityProps, Keyboard } from 'react-native';
import { Button, Text } from './style';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  title,
  isLoading,
  isDisabled,
  ...rest
}: ButtonProps) => {
  const [isVisible, setIsVisible] = useState(true);

  Keyboard.addListener('keyboardDidHide', () => setIsVisible(true));
  Keyboard.addListener('keyboardDidShow', () => setIsVisible(false));

  return (
    <Button
      {...rest}
      activeOpacity={0.5}
      disabled={isDisabled}
      style={{
        display: isVisible ? 'flex' : 'none',
        backgroundColor: isDisabled ? '#ccc' : '#000',
      }}
    >
      {isLoading ? <ActivityIndicator color="white" size="large" /> : <Text>{title}</Text>}
    </Button>
  );
};

export default ButtonComponent;
