import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { formatUrl, getQueryParamsFromOptions, Route } from '../sdk/url';
import { handleEvent } from '../sdk/events';
import type {
  AddPaymentSourceData,
  MessageEventData,
  MethodsData,
  OnSuccessMethod,
  UpdatePaymentSourceData,
} from '../sdk/types';
import type { CommonProps } from '../types';

const styles = StyleSheet.create({
  container: {},
  modalView: {
    width: '100%',
    height: '100%',
  },
  webView: {},
});

interface Props extends CommonProps {
  route: Route;
  data: AddPaymentSourceData | UpdatePaymentSourceData;
  onSuccess?: OnSuccessMethod;
}

export class WebViewPopup extends Component<Props> {
  bridge = (event: WebViewMessageEvent) => {
    const {
      onError = () => {},
      onEvent = () => {},
      onExit = () => {},
      onReady = () => {},
      onSuccess,
    } = this.props;

    const messageEventData = JSON.parse(
      event.nativeEvent.data
    ) as MessageEventData;

    handleEvent(
      {
        onError,
        onEvent,
        onExit,
        onReady,
        onSuccess: onSuccess || (() => {}),
      },
      messageEventData
    );
  };

  render() {
    const {
      host = 'https://strongholdpay.com',
      publishableKey,
      customerToken,
      route,
    } = this.props;

    const uri = formatUrl({
      host,
      publishableKey,
      customerToken,
      route,
      data: getQueryParamsFromOptions(this.props.data as MethodsData),
    });

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
            onMessage={(event) => this.bridge(event)}
          />
        </View>
      </SafeAreaView>
    );
  }
}
