# react-native-strongholdpay-sdk

Stronghold Pay SDK for React Native

- [react-native-strongholdpay-sdk](#react-native-strongholdpay-sdk)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Import the components](#import-the-components)
    - [`AddPaymentSource`](#addpaymentsource)
    - [`UpdatePaymentSource`](#updatepaymentsource)
    - [`Charge`](#charge)
    - [`Tip`](#tip)
  - [How to run the example](#how-to-run-the-example)
    - [Install the dependencies](#install-the-dependencies)
    - [Configure the example](#configure-the-example)
    - [Starts the demo](#starts-the-demo)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

```sh
npm install react-native-strongholdpay-sdk
```

## Usage

This package is based on the [Stronghold Pay Javascript SDK](https://docs.strongholdpay.com/stronghold-pay-js). Check the official documentation for more information.

### Import the components

```typescript
import {
  AddPaymentSource,
  UpdatePaymentSource,
  Charge,
  Tip,
} from 'react-native-strongholdpay-sdk';
```

### `AddPaymentSource`

```typescript
<AddPaymentSource
  publishableKey={publishableKey}
  customerToken={customerToken}
  onPress={() => console.log('on press AddPaymentSource')}
  onExit={() => console.log('on exit')}
  onEvent={(event) => console.log('on event', JSON.stringify(event))}
  onSuccess={(paymentSource) => {
    console.log('add payment source successful', JSON.stringify(paymentSource));
  }}
  onError={(error) => console.log('on error', JSON.stringify(error))}
  onReady={() => console.log('on ready')}
>
  <Button
    title="Add Payment Source"
    onPress={() => console.log('onPress child button')}
  />
</AddPaymentSource>
```

### `UpdatePaymentSource`

```typescript
<UpdatePaymentSource
  publishableKey={publishableKey}
  customerToken={customerToken}
  data={{
    paymentSourceId,
  }}
  onSuccess={() => console.log('update payment source successful')}
>
  <Button
    title="Update Payment Source"
    onPress={() => console.log('onPress child button')}
  />
</UpdatePaymentSource>
```

### `Charge`

```typescript
<Charge
  publishableKey={publishableKey}
  customerToken={customerToken}
  data={{
    charge: { amount: 4950, paymentSourceId, externalId: '12345679' },
    tip: {
        amount: 200,
        beneficiaryName: 'The Beneficiary Person',
    },
  }}
  onSuccess={(charge) => {
    console.log('charge creation successful', JSON.stringify(charge));
  }}
>
  <Button title="Charge" onPress={() => console.log('onPress child button')} />
</Charge>
```

### `Tip`

```typescript
<Tip
  publishableKey={publishableKey}
  customerToken={customerToken}
  data={{
    tip: {
      amount: 300,
      paymentSourceId: paymentSourceId,
      chargeId: chargeId,
      beneficiaryName: 'The Beneficiary Person',
    },
  }}
  onSuccess={(tip) => {
    console.log('tip creation successful', JSON.stringify(tip));
  }}
>
  <Button
    title="Tip"
    onPress={() => console.log('onPress child button')}
  />
</Tip>
```

## How to run the example

### Install the dependencies

```sh
yarn install
```

### Configure the example

```typescript
// Set your publishable key here
const publishableKey = 'pk_sandbox_0ERwWH6SHT8L2iKMniifHed8';

// Set the customer token generated using the API
const customerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJjdXN0b21lcl9IcHdBbG9FbnAxUTYwb0Y4cTNnT0pMeFYiLCJuYmYiOjE2MTM1Njk4NDIsImV4cCI6MTYxMzYxMzA0MiwiaWF0IjoxNjEzNTY5ODQyfQ.GKTFqF5egEc2Z2Gasf-xvXeXU_gFhTf7MCdK6Zql5ZE';
```

### Starts the demo

```sh
yarn example web
```

The demo **is not working on browsers** since it is using webviews. Expo is not compatible with webviews currently so you would need to run it on a mobile device (a simulator or a real device).

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
