import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Button from '../../components/Button';
import Transaction from '../../interfaces/Transaction';
import piggyBank from '../../assets/images/piggy-bank.png';
import presetsExample from '../../utils/presetsExample.json';

import {
  Container, Card, Transactions, Image, Text, Title, Subtitle, Content, Balance,
} from './style';
import colors from '../../assets/colors';

type TransactionProps = { data: Transaction };

export default function Home() {
  const [transactions] = useState<Array<Transaction> | null>(presetsExample);

  function TransactionComponent({ data }: TransactionProps) {
    let color: string;

    if (data.value !== 0) {
      color = data.value > 0 ? colors.success : colors.danger;
    }

    return (
      <Content>
        <View style={{ alignItems: 'flex-start', maxWidth: '50%' }}>
          <Subtitle>{ data.title }</Subtitle>
          <Text>{ data.category }</Text>
        </View>
        <Balance style={{ color }}>
          {`$ ${data.value.toFixed(2).toString().replace('-', '')}`}
        </Balance>
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
            keyExtractor={(item) => item.transactionId}
            renderItem={({ item }) => <TransactionComponent data={item} />}
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
