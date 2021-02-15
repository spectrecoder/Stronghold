import React, { useState } from 'react';
import {
  Pressable,
  PressableProps,
  Modal,
  StatusBar,
  StatusBarStyle,
} from 'react-native';
import type { AddPaymentSourceOptions } from '../sdk/types';
import type { CommonProps } from '../types';
import { WebViewPopup } from './WebViewPopup';

type Props = PressableProps & CommonProps & AddPaymentSourceOptions;

export const AddPaymentSource = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(
    'default' as StatusBarStyle
  );

  const toggleOverlay = () => {
    console.log('toggle', !visible);
    if (!visible) {
      setStatusBarStyle('dark-content');
    } else {
      setStatusBarStyle('default');
    }
    setVisible(!visible);
  };

  return (
    <Pressable
      {...props}
      onPressOut={(event) => {
        console.log('onPressOut');
        toggleOverlay();
        if (props.onPress) {
          props.onPress(event);
        }
      }}
      pointerEvents="box-only"
    >
      <StatusBar barStyle={statusBarStyle || 'default'} />
      {props.children}
      <Modal
        visible={visible}
        onDismiss={props.onExit}
        animationType="slide"
        transparent={false}
      >
        <WebViewPopup
          host={props.host}
          publishableKey={props.publishableKey}
          customerToken={props.customerToken}
          type={'addPaymentSource'}
          data={props}
          onExit={props.onExit}
        />
      </Modal>
    </Pressable>
  );
};
