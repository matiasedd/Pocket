import React from "react";
import { View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Container, Logo, Title, Subtitle, Button, TextButton } from "./style";

const Landing: React.FC = () => (
  <Container>
    <StatusBar style="auto" />
    <Logo>
      <Image
        source={require("../../assets/extended-logo.png")}
        style={{ resizeMode: "contain", flex: 1 }}
      />
    </Logo>
    <View>
      <Title>Planejamento Financeiro sem complicações.</Title>
      <Subtitle>
        Com Pocket, seu planejamento financeiro fica muito mais fácil. Deixe as
        planihas de lado e planeja-se com Pocket!
      </Subtitle>
      <Button>
        <TextButton>Entrar</TextButton>
      </Button>
    </View>
  </Container>
);

export default Landing;
