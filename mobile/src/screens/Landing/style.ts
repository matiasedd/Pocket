import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #e5e5e5;
  justify-content: space-evenly;
  padding: 32px;
`;

export const Logo = styled.View`
  height: 56px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'PoppinsBold';
  font-size: 32px;
  line-height: 40px;
`; 

export const Subtitle = styled.Text`
  font-family: 'PoppinsRegular';
  font-size: 16px;
  margin: 20px 0 36px 0;
`; 

export const Button = styled.TouchableHighlight`
  background-color: #000;
  border-radius: 50px;
  height: 50px;
  width: 200px;

  align-items: center;
  justify-content: center;
  elevation: 6;
`;

export const TextButton = styled.Text`
  font-family: 'PoppinsBold';
  font-size: 16px;
  color: #fff;
`;