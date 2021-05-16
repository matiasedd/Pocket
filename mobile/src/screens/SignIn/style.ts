import styled from 'styled-components/native';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts';

interface SignInProps {
  disabled?: boolean;
}

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 16px;
`;

export const Content = styled.View`
  padding: 16px;
  flex: 1;
`;

export const NameContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled.Text`
  margin: 16px 0;
  color: ${colors.light.text_on_primary};
  font-size: ${fonts.size.regular};
  font-family: ${fonts.regular};
`;

export const Input = styled.TextInput`
  padding-bottom: 4px;
  border-bottom-width: 1px;
  border-bottom-color: ${`${colors.light.text_on_primary}32`};

  color: ${colors.light.text_on_primary};
  font-size: ${fonts.size.regular};
  font-family: ${fonts.regular};
`;
