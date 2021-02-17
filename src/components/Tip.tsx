import React from 'react';
import type { PressableProps } from 'react-native';
import type { MethodsData, TipData, TipOnSuccess } from '../sdk/types';
import type { CommonProps } from '../types';
import { PayPressable } from './PayPressable';

export type TipProps = PressableProps &
  CommonProps & {
    data: TipData;
    onSuccess: TipOnSuccess;
  };

export function Tip(props: TipProps) {
  return (
    <PayPressable
      {...props}
      route="/tips/add"
      onSuccess={props.onSuccess}
      data={props.data as MethodsData}
    />
  );
}
