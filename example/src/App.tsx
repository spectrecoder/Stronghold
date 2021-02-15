import * as React from 'react';

import { StyleSheet, Button, StatusBar, SafeAreaView } from 'react-native';
import { AddPaymentSource } from 'react-native-strongholdpay-sdk';
// import Stronghold, { ENVIRONMENT } from '@stronghold/pay-dropin';

// const client = Stronghold.Pay({
//   environment: ENVIRONMENT.sandbox,
//   publishableKey: 'pk_sandbox_0ERwWH6SHT8L2iKMniifHed8',
//   host: 'https://api-development.strongholdpay.com',
// });

const customerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJjdXN0b21lcl9hUE0tdDhpV01xamtuUWxNWER5ZFpucVgiLCJuYmYiOjE2MTMxNDg5NjQsImV4cCI6MTYxMzE5MjE2NCwiaWF0IjoxNjEzMTQ4OTY0fQ.-Jf6o-Az7IvinehSpE1nT7c5u807so7wTtacUgMDCSg';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />
      <AddPaymentSource
        host="https://api-development.strongholdpay.com"
        publishableKey="pk_sandbox_0ERwWH6SHT8L2iKMniifHed8"
        customerToken={customerToken}
        onPress={() => console.log('onPress AddPaymentSource')}
        onExit={() => console.log('on exit')}
        onSuccess={(paymentSource) => {
          console.log('on success');
          console.log(paymentSource);
        }}
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
      {/* <PlaidLink
        tokenConfig={{
          token: 'link-sandbox-6f379ede-400c-4862-8198-853b65623b3e',
        }}
        onSuccess={(success) => {
          console.log(success);
        }}
        onExit={(exit) => {
          console.log(exit);
        }}
      >
        <Text>Plaid Link</Text>
      </PlaidLink> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
