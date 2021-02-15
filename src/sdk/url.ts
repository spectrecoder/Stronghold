import * as querystring from 'querystring';
import type {
  AddPaymentSourceData,
  UpdatePaymentSourceData,
  ChargeData,
  TipData,
  TipDropin,
} from './types';

export type Route =
  | '/paymentsources/add'
  | '/paymentsources/update'
  | '/charges/add'
  | '/tips/add';

export interface UrlQueryData {
  // Internal use only
  /**
   * @deprecated Use PayLinkId instead
   */
  payLinkCode?: string;
  payLinkId?: string;
  skipPayScreen?: boolean;
  skipSuccessScreen?: boolean;

  paymentSourceId?: string;

  authorizeOnly?: boolean;

  chargeAmount?: number;
  chargePaymentSourceId?: string;
  chargeExternalId?: string;

  tipAmount?: number;
  tipBeneficiaryName?: string;
  tipChargeId?: string;
  tipPaymentSourceId?: string;
  tipDetailsDisplayMessage?: string;
  tipDetailsTerminalId?: string;
  tipDetailsDrawerId?: string;
}

export type MethodsData = AddPaymentSourceData &
  UpdatePaymentSourceData &
  ChargeData &
  TipData;

export function getQueryParamsFromOptions(options: MethodsData): UrlQueryData {
  const payLinkId = options.payLinkId || options.payLinkCode;

  let paymentSourceId: string | undefined = options.paymentSourceId;
  let chargeAmount: number | undefined;
  let chargePaymentSourceId: string | undefined;
  let chargeExternalId: string | undefined;

  let tipAmount: number | undefined;
  let tipBeneficiaryName: string | undefined;
  let tipPaymentSourceId: string | undefined;
  let tipChargeId: string | undefined;
  let tipDetailsDisplayMessage: string | undefined;
  let tipDetailsTerminalId: string | undefined;
  let tipDetailsDrawerId: string | undefined;

  if ((options as ChargeData).charge) {
    const charge = (options as ChargeData).charge;
    chargeAmount = charge.amount;
    chargePaymentSourceId = paymentSourceId = charge.paymentSourceId;
    chargeExternalId = charge.externalId;
  }

  if (options.tip) {
    const tip = options.tip;
    tipAmount = tip.amount;
    tipBeneficiaryName = tip.beneficiaryName;
    tipPaymentSourceId = (tip as TipDropin).paymentSourceId;
    // If payment source already set, we keep the original one
    paymentSourceId = paymentSourceId || (tip as TipDropin).paymentSourceId;
    tipChargeId = (tip as TipDropin).chargeId;

    if (tip.details) {
      tipDetailsDisplayMessage = tip.details.displayMessage;
      tipDetailsTerminalId = tip.details.terminalId;
      tipDetailsDrawerId = tip.details.drawerId;
    }
  }

  return {
    // Internal use only
    payLinkId,
    payLinkCode: payLinkId,
    skipPayScreen: options.skipPayScreen,
    skipSuccessScreen: options.skipSuccessScreen,

    paymentSourceId,

    authorizeOnly: options.authorizeOnly,

    chargeAmount,
    chargePaymentSourceId,
    chargeExternalId,

    tipAmount,
    tipBeneficiaryName,
    tipPaymentSourceId,
    tipChargeId,
    tipDetailsDisplayMessage,
    tipDetailsTerminalId,
    tipDetailsDrawerId,
  };
}

export function formatUrl(options: {
  route: Route;
  host: string;
  publishableKey: string;
  customerToken: string;
  data: UrlQueryData;
}) {
  const { route, host, customerToken, publishableKey, data } = options;

  const query = querystring.stringify({
    ...data,
    publishableKey,
    customerToken,
  });

  const uri = `${host}/dropin${route}?${query}`;

  return uri;
}
