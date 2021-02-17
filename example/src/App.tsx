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

const host = 'http://192.168.1.202:5002';

// Set your publishable key here
const publishableKey = 'pk_sandbox_0ERwWH6SHT8L2iKMniifHed8';

// Set the customer token generated using the API
const customerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJjdXN0b21lcl9qenBoa2JHRVNyQjNNbU5hQTlBUXRBM00iLCJuYmYiOjE2MTM0OTIzODksImV4cCI6MTYxMzUzNTU4OSwiaWF0IjoxNjEzNDkyMzg5fQ.uUcDjPUN1vLBBhraeIA7374hzmTV6iOXMydd9svgS54';

const Separator = () => <View style={styles.separator} />;

export default function App() {
  const [paymentSourceId, setPaymentSourceId] = useState(null);

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
            console.log('add payment source successful');
            console.log(JSON.stringify(paymentSource));
            setPaymentSourceId(paymentSource.id);
          }}
          onError={(error) => {
            console.log('on error');
            console.log(JSON.stringify(error));
          }}
          onReady={() => console.log('on ready')}
        >
          <Button
            title="Add Payment Source"
            onPress={() => {
              console.log('onPress child button');
            }}
          >
            Add Payment Source
          </Button>
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
          >
            Update Payment Source
          </Button>
        </UpdatePaymentSource>
      </View>
      <Separator />
      <Text style={styles.title}>
        The customer authorize Stronghold Pay to initiate a charge on his
        payment source.
      </Text>
      <Charge
        host={host}
        publishableKey={publishableKey}
        customerToken={customerToken}
        data={{
          charge: { amount: 4950, paymentSourceId },
        }}
        onSuccess={(charge) => {
          console.log('charge creation successful');
          console.log(JSON.stringify(charge));
        }}
      >
        <Button
          title="Charge"
          onPress={() => console.log('onPress child button')}
        >
          Charge
        </Button>
      </Charge>
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
          tip: { amount: 300, paymentSourceId, chargeId: '' },
        }}
        onSuccess={(tip) => {
          console.log('tip creation successful');
          console.log(JSON.stringify(tip));
        }}
      >
        <Button title="Tip" onPress={() => console.log('onPress child button')}>
          Tip
        </Button>
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
