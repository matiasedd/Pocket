import styled from 'styled-components/native';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: space-between;
  background-color: ${colors.light.primary};
`;

export const Card = styled.View`
  width: 100%;
  height: 30%;
  border-radius: 20px;
  background-color: ${colors.light.primary_light};
  justify-content: center;
  padding: 32px;
  margin-top: 8px;
`;

export const Title = styled.Text`
  font-family: ${fonts.bold};
  font-size: ${fonts.size.title};
  color: ${colors.light.text_on_primary};
  line-height: 32px;
`;

export const Subtitle = styled.Text`
  font-family: ${fonts.bold};
  font-size: ${fonts.size.subtitle};
  color: ${colors.light.text_on_primary};
`;

export const Balance = styled.Text`
  font-family: ${fonts.regular};
  font-size: ${fonts.size.title};
  color: ${colors.light.text_on_primary}
  opacity: 0.8;
`;

export const Image = styled.Image`
  width: 70%;
  height: 70%;
`;

export const Text = styled.Text`
  font-family: ${fonts.regular};
  font-size: ${fonts.size.regular};
  color: ${colors.light.text_on_primary};
  text-align: center;
  opacity: 0.8;
`;

export const Transactions = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 20px;
  margin: 20px 0;
  background-color: ${colors.light.primary_light};
`;

export const Content = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.light.primary_dark};
`;
