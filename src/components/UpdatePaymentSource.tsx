import React from 'react';
import type { PressableProps } from 'react-native';
import type {
  MethodsData,
  UpdatePaymentSourceData,
  UpdatePaymentSourceOnSuccess,
} from '../sdk/types';
import type { CommonProps } from '../types';
import { PayPressable } from './PayPressable';

export type UpdatePaymentSourceProps = PressableProps &
  CommonProps & {
    data: UpdatePaymentSourceData;
    onSuccess: UpdatePaymentSourceOnSuccess;
  };

export const UpdatePaymentSource = (props: UpdatePaymentSourceProps) => {
  return (
    <PayPressable
      {...props}
      route="/paymentsources/update"
      onSuccess={props.onSuccess}
      data={props.data as MethodsData}
    />
  );
};
