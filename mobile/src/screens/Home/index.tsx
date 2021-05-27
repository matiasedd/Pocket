import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import piggyBank from '../../assets/images/piggy-bank.png';
import Button from '../../components/Button';
import {
  Container, Card, Transactions, Image, Text, Title, Subtitle, Content, Balance,
} from './style';

export default function Home() {
  const [transactions] = useState<Array<any> | null>([1, 2, 3, 4, 5]);

  function Transaction() {
    return (
      <Content>
        <View style={{ alignItems: 'flex-start', maxWidth: '50%' }}>
          <Subtitle>Título</Subtitle>
          <Text>Categoria</Text>
        </View>
        <Balance>R$ -12,34</Balance>
      </Content>
    );
  }

  return (
    <Container>
      <StatusBar style="auto" />
      <Card>
        <Title>Saldo</Title>
        <Balance>R$ 123,45</Balance>
      </Card>
      <Transactions>
        { transactions ? (
          <FlatList
            data={transactions}
            keyExtractor={({ item }) => item}
            renderItem={() => <Transaction />}
            style={{ width: '90%' }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <>
            <Image source={piggyBank} />
            <Text>
              Não há transações registadas
            </Text>
          </>
        )}
      </Transactions>
      <Button title="Adicionar transação" />
    </Container>
  );
}
