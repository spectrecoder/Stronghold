# react-native-strongholdpay-sdk

Stronghold Pay SDK for React Native

## Installation

```sh
npm install react-native-strongholdpay-sdk
```

## Usage

```js
import StrongholdpaySdk from "react-native-strongholdpay-sdk";

// ...

const result = await StrongholdpaySdk.multiply(3, 7);
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
const customerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJjdXN0b21lcl9IcHdBbG9FbnAxUTYwb0Y4cTNnT0pMeFYiLCJuYmYiOjE2MTM1Njk4NDIsImV4cCI6MTYxMzYxMzA0MiwiaWF0IjoxNjEzNTY5ODQyfQ.GKTFqF5egEc2Z2Gasf-xvXeXU_gFhTf7MCdK6Zql5ZE';
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
