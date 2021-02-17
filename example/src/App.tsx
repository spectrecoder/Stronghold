import * as React from 'react';
import { useState } from 'react';

import {
  StyleSheet,
  Button,
  StatusBar,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {
  AddPaymentSource,
  UpdatePaymentSource,
  Charge,
  Tip,
} from 'react-native-strongholdpay-sdk';

const host: string | undefined = undefined;

// Set your publishable key here
const publishableKey = 'pk_sandbox_0ERwWH6SHT8L2iKMniifHed8';

// Set the customer token generated using the API
const customerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJjdXN0b21lcl9IcHdBbG9FbnAxUTYwb0Y4cTNnT0pMeFYiLCJuYmYiOjE2MTM1NzM2ODQsImV4cCI6MTYxMzYxNjg4NCwiaWF0IjoxNjEzNTczNjg0fQ.g7qu8dbFPMpVJojcghvbAsxiTn6wGhdwCgjw23OBQRk';

const Separator = () => <View style={styles.separator} />;

export default function App() {
  // Set to null by default, a sandbox payment source ID can be given here
  const [paymentSourceId, setPaymentSourceId] = useState('');
  const [chargeId, setChargeId] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />
      <View>
        <Text style={styles.title}>
          Let a customer go through the addition of a payment source
        </Text>
        <AddPaymentSource
          host={host}
          publishableKey={publishableKey}
          customerToken={customerToken}
          onPress={() => console.log('on press AddPaymentSource')}
          onExit={() => console.log('on exit')}
          onEvent={(event) => console.log('on event', JSON.stringify(event))}
          onSuccess={(paymentSource) => {
            console.log(
              'add payment source successful',
              JSON.stringify(paymentSource)
            );
            setPaymentSourceId(paymentSource.id);
          }}
          onError={(error) => {
            console.log('on error', JSON.stringify(error));
          }}
          onReady={() => console.log('on ready')}
        >
          <Button
            title="Add Payment Source"
            onPress={() => {
              console.log('onPress child button');
            }}
          />
        </AddPaymentSource>
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>
          The customer needs to update his payment source by entering his
          current credentials
        </Text>
        <UpdatePaymentSource
          host={host}
          publishableKey={publishableKey}
          customerToken={customerToken}
          data={{
            paymentSourceId,
          }}
          onSuccess={() => {
            console.log('update payment source successful');
          }}
          disabled={!paymentSourceId}
        >
          <Button
            title="Update Payment Source"
            onPress={() => console.log('onPress child button')}
            disabled={!paymentSourceId}
          />
        </UpdatePaymentSource>
      </View>
      <Separator />
      <Text style={styles.title}>
        The customer authorize Stronghold Pay to initiate a charge on his
        payment source.
      </Text>
      <View style={styles.fixToText}>
        <Charge
          host={host}
          publishableKey={publishableKey}
          customerToken={customerToken}
          data={{
            charge: { amount: 4950, paymentSourceId },
          }}
          onSuccess={(charge) => {
            console.log('charge creation successful', JSON.stringify(charge));
            setChargeId(charge.id);
          }}
          disabled={!paymentSourceId}
        >
          <Button
            title="Charge"
            onPress={() => console.log('onPress child button')}
            disabled={!paymentSourceId}
          />
        </Charge>
        <Charge
          host={host}
          publishableKey={publishableKey}
          customerToken={customerToken}
          data={{
            charge: { amount: 3000, paymentSourceId },
            tip: {
              amount: 200,
              beneficiaryName: 'My Budtender',
            },
          }}
          onSuccess={(charge) => {
            console.log(
              'charge with tipe creation successful',
              JSON.stringify(charge)
            );
          }}
          disabled={!paymentSourceId}
        >
          <Button
            title="Charge with Tip"
            onPress={() => console.log('onPress child button')}
            disabled={!paymentSourceId}
          />
        </Charge>
      </View>
      <Separator />
      <Text style={styles.title}>
        The customer authorize Stronghold Pay to add a tip on top of an initial
        charge.
      </Text>
      <Tip
        host={host}
        publishableKey={publishableKey}
        customerToken={customerToken}
        data={{
          tip: {
            amount: 300,
            paymentSourceId: paymentSourceId,
            chargeId: chargeId,
            beneficiaryName: 'My Budtender',
          },
        }}
        onSuccess={(tip) => {
          console.log('tip creation successful', JSON.stringify(tip));
        }}
        disabled={!chargeId}
      >
        <Button
          title="Tip"
          onPress={() => console.log('onPress child button')}
          disabled={!chargeId}
        />
      </Tip>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
