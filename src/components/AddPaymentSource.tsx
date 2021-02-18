import React from 'react';
import type { PressableProps } from 'react-native';
import type {
  AddPaymentSourceData,
  AddPaymentSourceOnSuccess,
  MethodsData,
} from '../sdk/types';
import type { CommonProps } from '../types';
import { PayPressable } from './PayPressable';

export type AddPaymentSourceProps = PressableProps &
  CommonProps & {
    data?: AddPaymentSourceData;
    onSuccess: AddPaymentSourceOnSuccess;
  };

export const AddPaymentSource = (props: AddPaymentSourceProps) => {
  return (
    <PayPressable
      {...props}
      route="/paymentsources/add"
      onSuccess={props.onSuccess}
      data={props.data as MethodsData}
    />
  );
};
