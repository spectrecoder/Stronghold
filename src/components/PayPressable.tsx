import React, { Component } from 'react';
import {
  Pressable,
  PressableProps,
  Modal,
  StatusBar,
  StatusBarStyle,
} from 'react-native';
import type { MethodsData, OnSuccessMethod } from '../sdk/types';
import type { Route } from '../sdk/url';
import type { CommonProps } from '../types';
import { WebViewPopup } from './WebViewPopup';

export type Props = PressableProps &
  CommonProps & {
    onSuccess?: OnSuccessMethod;
    route: Route;
    data: MethodsData;
  };

interface State {
  visible: boolean;
  statusBarStyle: StatusBarStyle;
}

export class PayPressable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      statusBarStyle: 'default',
    };
  }

  onExit = () => {
    this.toggleOverlay();
    if (this.props.onExit) {
      this.props?.onExit();
    }
  };

  toggleOverlay = () => {
    const willBeVisible = !this.state.visible;
    // If the overlay will be visible
    // We show the status bar style at `dark-content` because the background is white
    if (willBeVisible) {
      this.setState({ statusBarStyle: 'dark-content' });
    }
    // If not, set the default one
    else {
      this.setState({ statusBarStyle: 'default' });
    }
    this.setState({ visible: willBeVisible });
  };

  render() {
    return (
      <Pressable
        {...this.props}
        onPressOut={(event) => {
          this.toggleOverlay();
          if (this.props.onPress) {
            this.props.onPress(event);
          }
        }}
        pointerEvents="box-only"
      >
        <StatusBar barStyle={this.state.statusBarStyle} />
        {this.props.children}
        <Modal
          visible={this.state.visible}
          onDismiss={this.props.onExit}
          animationType="slide"
          transparent={false}
        >
          <WebViewPopup
            host={this.props.host}
            publishableKey={this.props.publishableKey}
            customerToken={this.props.customerToken}
            route={this.props.route}
            data={this.props.data}
            onEvent={this.props.onEvent}
            onReady={this.props.onReady}
            onSuccess={this.props.onSuccess}
            onError={this.props.onError}
            onExit={this.onExit}
          />
        </Modal>
      </Pressable>
    );
  }
}
