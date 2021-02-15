import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { formatUrl, getQueryParamsFromOptions, MethodsData } from '../sdk';
import type {
  AddPaymentSourceData,
  UpdatePaymentSourceData,
} from '../sdk/types';
import type { CommonProps } from '../types';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'transparent',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modalView: {
    // margin: 20,
    // backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    width: '100%',
    height: '100%',
  },
  webView: {
    // width: '100%',
    // height: '100%',
  },
});

interface Props extends CommonProps {
  type: 'addPaymentSource' | 'updatePaymentSource' | 'charge' | 'tip';
  data: AddPaymentSourceData | UpdatePaymentSourceData;
}

export const WebViewPopup = (props: Props) => {
  const {
    host = 'https://strongholdpay.com',
    publishableKey,
    customerToken,
    data,
  } = props;

  const uri = formatUrl({
    host,
    publishableKey,
    customerToken,
    route: '/paymentsources/add',
    data: getQueryParamsFromOptions(data as MethodsData),
  });

  const bridge = (event: WebViewMessageEvent) => {
    console.log('EVENT');
    console.log(event);
    if (event.nativeEvent.data === 'exit' && props.onExit) {
      props.onExit();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalView}>
        <WebView
          startInLoadingState={true}
          originWhitelist={['*']}
          scalesPageToFit={true}
          source={{
            uri,
          }}
          style={styles.webView}
          onMessage={(event) => bridge(event)}
        />
      </View>
    </SafeAreaView>
  );
};
