import React from 'react';
import type { PressableProps } from 'react-native';
import type { ChargeData, ChargeOnSuccess, MethodsData } from '../sdk/types';
import type { CommonProps } from '../types';
import { PayPressable } from './PayPressable';

export type ChargeProps = PressableProps &
  CommonProps & {
    data: ChargeData;
    onSuccess: ChargeOnSuccess;
  };

export function Charge(props: ChargeProps) {
  return (
    <PayPressable
      {...props}
      route="/charges/add"
      onSuccess={props.onSuccess}
      data={props.data as MethodsData}
    />
  );
}
