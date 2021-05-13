import styled from 'styled-components/native';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.light.primary_dark};
  justify-content: space-evenly;
  padding: 32px;
`;

export const Logo = styled.Image`
  height: 56px;
  width: 100%;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${fonts.bold};
  font-size: ${fonts.size.title};
  line-height: 40px;
  color: ${colors.light.text_on_primary};
`;

export const Subtitle = styled.Text`
  font-family: ${fonts.regular};
  font-size: ${fonts.size.regular};
  margin: 20px 0 36px 0;
  color: ${colors.light.text_on_primary};
`;

export const Button = styled.TouchableOpacity`
  background-color: #000;
  border-radius: 50px;
  height: 50px;
  width: 150px;

  align-items: center;
  justify-content: center;
  elevation: 6;
`;

export const TextButton = styled.Text`
  font-family: ${fonts.bold};
  font-size: ${fonts.size.regular};
  color: #fff;
`;
