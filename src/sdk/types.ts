import type { StrongholdPayError } from './Error';
import type { EVENT, ENVIRONMENT } from './constants';

export interface ClientOptions {
  environment: ENVIRONMENT;
  publishableKey: string;
  host?: string;
}

export type AddPaymentSourceOnSuccess = (paymentSource: PaymentSource) => void;
export type UpdatePaymentSourceOnSuccess = () => void;
export type ChargeOnSuccess = (charge: Charge) => void;
export type TipOnSuccess = (tip: Tip) => void;
export type OnSuccessMethod =
  | AddPaymentSourceOnSuccess
  | UpdatePaymentSourceOnSuccess
  | ChargeOnSuccess
  | TipOnSuccess;
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
  /**
   * The payment source that needs to be updated.
   */
  paymentSourceId: string;
}

export interface ChargeData extends InternalData {
  /**
   * Determine if the charge will be only autorized or captured as well.
   * @default false
   */
  authorizeOnly?: boolean;
  /**
   * The information related to the charge.
   */
  charge: ChargeDropin;
  /**
   * The information related to the tip.
   */
  tip?: TipDataDropin;
}

export interface TipData extends InternalData {
  authorizeOnly?: boolean;
  tip: TipDropin;
}

export type MethodsData =
  | AddPaymentSourceData
  | UpdatePaymentSourceData
  | ChargeData
  | TipData;

export interface Callbacks {
  /**
   * Called when the customer exit the flow.
   */
  onExit?: OnExit;
  /**
   * Called when an error occurs.
   */
  onError?: OnError;
  /**
   * Called when an event is fired.
   */
  onEvent?: OnEvent;
  /**
   * Called when the flow is ready and showed to the customer.
   */
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
    onSuccess: TipOnSuccess;
  };

export interface MessageEventData {
  event: EVENT;
  payload: {
    err: StrongholdPayError | null;
    // tslint:disable-next-line: no-any
    data: any;
  };
}

export interface StrongholdMessageEvent extends MessageEvent {
  data: MessageEventData;
}

export interface ChargeDropin {
  /**
   * The amount to charge, specified in the smallest divisible currency unit. For example, number of cents of United States dollar.
   */
  amount: number;
  /**
   * The ID of the payment source to charge.
   */
  paymentSourceId: string;
  /**
   * A merchant-specific external ID (e.g. a merchant order ID).
   */
  externalId?: string;
}

export interface TipDataDropin {
  /**
   * The amount to charge, specified in the smallest divisible currency unit. For example, number of cents of United States dollar.
   */
  amount: number;
  /**
   * The name of the budtender getting the tip.
   */
  beneficiaryName: string;
  details?: {
    /**
     * The message to display during the tipping flow.
     */
    displayMessage?: string;
    /**
     * The id of the terminal used for the payment.
     */
    terminalId?: string;
    /**
     * The id of the drawer.
     */
    drawerId?: string;
  };
}

export interface TipDropin extends TipDataDropin {
  /**
   * The ID of the original charge the tip is for.
   */
  chargeId: string;
  /**
   * The ID of the payment source to charge.
   */
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
