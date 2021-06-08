import styled from 'styled-components/native';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts';

export const Container = styled.View``;

export const Content = styled.TextInput`
  width: 100%;
  border-radius: 5px;
  background-color: ${colors.light.primary_light};
  padding: 10px;
  font-size: ${fonts.size.regular};
  font-family: ${fonts.regular};
`;

export const Label = styled.Text`
  margin: 16px 0;
  margin-left: 16px;
  color: ${colors.light.text_on_primary};
  font-size: ${fonts.size.regular};
  font-family: ${fonts.regular};
`;
