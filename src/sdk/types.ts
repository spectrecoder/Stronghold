import type { StrongholdPayError } from './Error';
import type { EVENT, ENVIRONMENT } from './constants';

export interface ClientOptions {
  environment: ENVIRONMENT;
  publishableKey: string;
  host?: string;
}

export type AddPaymentSourceOnSuccess = (paymentSource: PaymentSource) => void;
export type UpdatePaymentSourceOnSuccess = (
  paymentSource: PaymentSource
) => void;
export type ChargeOnSuccess = (charge: Charge) => void;
export type TipOnSuccess = (tip: Tip) => void;
export type OnExit = () => void;
export type OnReady = () => void;
export type OnError = (error: StrongholdPayError) => void;
export type OnEvent = (event: StrongholdMessageEvent) => void;

interface InternalData {
  // Internal use only
  /**
   * @deprecated Use pay link ID instead
   */
  payLinkCode?: string;
  payLinkId?: string;

  skipSuccessScreen?: boolean;
  skipPayScreen?: boolean;
}

export interface AddPaymentSourceData extends InternalData {}

export interface UpdatePaymentSourceData extends InternalData {
  paymentSourceId: string;
}

export interface ChargeData extends InternalData {
  authorizeOnly?: boolean;
  charge: ChargeDropin;
  tip?: TipDataDropin;
}

export interface TipData extends InternalData {
  authorizeOnly?: boolean;
  tip: TipDropin;
}

export interface Callbacks {
  onExit?: OnExit;
  onError?: OnError;
  onEvent?: OnEvent;
  onReady?: OnReady;
}

export type AddPaymentSourceOptions = AddPaymentSourceData &
  Callbacks & {
    onSuccess: AddPaymentSourceOnSuccess;
  };

export type UpdatePaymentSourceOptions = UpdatePaymentSourceData &
  Callbacks & {
    onSuccess?: UpdatePaymentSourceOnSuccess;
  };

export type ChargeOptions = ChargeData &
  Callbacks & {
    onSuccess: ChargeOnSuccess;
  };

export type TipOptions = TipData &
  Callbacks & {
    tip: TipDropin;
    authorizeOnly?: boolean;
    onSuccess: TipOnSuccess;
  };

export interface StrongholdMessageEvent extends MessageEvent {
  data: {
    event: EVENT;
    payload: {
      err: StrongholdPayError | null;
      // tslint:disable-next-line: no-any
      data: any;
    };
  };
}

export interface ChargeDropin {
  /**
   * The amount to charge, specified in the smallest divisible currency unit. For example, number of cents of United States dollar.
   */
  amount: number;
  paymentSourceId: string;
  externalId?: string;
}

export interface TipDataDropin {
  /**
   * The amount to charge, specified in the smallest divisible currency unit. For example, number of cents of United States dollar.
   */
  amount: number;
  beneficiaryName: string;
  details?: {
    displayMessage?: string;
    terminalId?: string;
    drawerId?: string;
  };
}

export interface TipDropin extends TipDataDropin {
  chargeId: string;
  paymentSourceId: string;
}

// ======================================
// API Models

export interface PaymentSource {
  id: string;
  type: 'bank';
  label: string;
  active: boolean;
  unique_hash: string;
}

export enum CHARGE_TYPE {
  BANK_DEBIT = 'bank_debit',
  BANK_DEBIT_CUSTOMER_NOT_PRESENT = 'bank_debit_cnp',
}

export enum CHARGE_STATUS {
  CREATED = 'created',
  AUTHORIZED = 'authorized',
  CAPTURED = 'captured',
  CANCELED = 'canceled',
  ATTEMPTING_COLLECTION = 'attempting_collection',
  CAPTURE_FAILED = 'capture_failed',
  DISPUTED = 'disputed',
  REFUND_PENDING = 'refund_pending',
  REFUNDED = 'refunded',
}

export interface Charge {
  id: string;
  type: CHARGE_TYPE;
  status: CHARGE_STATUS;
  amount: number;
  created_at: string;
}

export interface Tip {
  id: string;
  created_at: string;
  amount: number;
  beneficiary_name: string;
  details?: {
    display_message?: string;
    terminal_id?: string;
    drawer_id?: string;
  };
  charge_id: string;
  payment_source_id: string;
}
