import styled from 'styled-components/native';
import fonts from '../../assets/fonts';

export const Button = styled.TouchableOpacity`
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: ${fonts.size.regular};
  font-family: ${fonts.bold};
`;
