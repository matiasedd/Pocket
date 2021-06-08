import styled from 'styled-components/native';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts';

interface LoginProps {
  alignment?: string;
  visible?: boolean;
  disabled?: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  justify-content: space-between;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Label = styled.Text`
  margin: 16px 0;
  color: ${colors.light.text_on_primary};
  font-size: ${fonts.size.regular};
  font-family: ${fonts.regular};
  text-align: ${(props: LoginProps) => props.alignment || 'auto'};
`;

export const Error = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Message = styled.Text`
  color: ${colors.danger};
  font-size: ${fonts.size.regular};
  font-family: ${fonts.regular};
  margin-left: 10px;
`;

export const Submit = styled.View`
  display: ${(props: LoginProps) => (props.visible ? 'flex' : 'none')};
`;

export const Link = styled.TouchableOpacity`
  color: blue;
`;
