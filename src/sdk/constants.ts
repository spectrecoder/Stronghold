// TODO: See if its actually useful

/**
 * Different Stronghold Pay environments
 */
export enum ENVIRONMENT {
  sandbox = 'sandbox',
  live = 'live',
}

export const HOST = 'https://api.strongholdpay.com';

export enum EVENT {
  EXIT = 'exit',
  SUCCESS = 'success',
  ERROR = 'error',
  READY = 'ready',
}

export enum ERROR_TYPE {
  API_ERROR = 'api_error',
  AUTH_ERROR = 'auth_error',
  INVALID_REQUEST_ERROR = 'invalid_request_error',
  OBJECT_ERROR = 'object_error',
  VALIDATION_ERROR = 'validation_error',
}

export enum ERROR_CODE {
  // Api error
  /**
   * Stronghold was unable to process the request.
   */
  SERVER_ERROR = 'server_error',
  /**
   * A problem occurred while accessing the software of the merchant.
   */
  MERCHANT_SOFTWARE_ERROR = 'merchant_software_error',
  /**
   * Error returned when a request has been aborted by the client.
   */
  REQUEST_ABORTED = 'request_aborted',

  // Authentication error
  /**
   * The API Key provided is not valid. Either because the value or the scope (publishable or not) is wrong.
   */
  INVALID_API_KEY = 'invalid_api_key',
  /**
   * The request requires the client to have the `live` environment approved. The secret key provided is valid but not approved yet.
   */
  LIVE_NOT_APPROVED = 'live_not_approved',
  /**
   * The customer token provided is wrong or outdated.
   */
  INVALID_CUSTOMER_TOKEN = 'invalid_customer_token',

  // Invalid request
  /**
   * The referenced object is not found.
   */
  NOT_FOUND = 'not_found',
  /**
   * The object ID passed is not valid.
   */
  INVALID_ID = 'invalid_id',
  /**
   * The request is meant for the `sandbox` environment only.
   */
  SANDBOX_ONLY = 'sandbox_only',
  /**
   * The Ticket is not found.
   */
  TICKET_NOT_FOUND = 'ticket_not_found',
  /**
   * The Dispensary attached to the request is not found.
   */
  DISPENSARY_NOT_FOUND = 'dispensary_not_found',

  // Object error
  /**
   * The operation on the object is invalid.
   */
  INVALID_OPERATION = 'invalid_operation',
  /**
   * The payment source already exists. The new one can not be add.
   */
  PAYMENT_SOURCE_ALREADY_EXISTS = 'payment_source_already_exists',
  /**
   * The customer needs to update his payment source in order to perform this request.
   */
  PAYMENT_SOURCE_LOGIN_REQUIRED = 'payment_source_login_required',
  /**
   * The payment source is unavailable and can't be used temporary.
   */
  PAYMENT_SOURCE_UNAVAILABLE = 'payment_source_unavailable',
  /**
   * The authentication to the payment source is currently unavailable.
   */
  PAYMENT_SOURCE_LOGIN_UNAVAILABLE = 'payment_source_login_unavailable',
  /**
   * The payment source has been deactivated.
   */
  PAYMENT_SOURCE_INACTIVE = 'payment_source_inactive',
  /**
   * The customer needs to take some action before Stronghold can access the payment source.
   */
  PAYMENT_SOURCE_ACTION_REQUIRED = 'payment_source_action_required',
  /**
   * The balance associated to the payment source is insufficient.
   */
  INSUFFICIENT_BALANCE = 'insufficient_balance',
  /**
   * The customer is blocked and cannot make a payment.
   */
  CUSTOMER_BLOCKED = 'customer_blocked',
  /**
   * The payment source is blocked and cannot be used for payment.
   */
  PAYMENT_SOURCE_BLOCKED = 'payment_source_blocked',
  /**
   * The charge cannot be processed as the customer has an outstanding failed payment.
   */
  CHARGE_BLOCKED_OUTSTANDING_PAYMENT = 'charge_blocked_outstanding_payment',
  /**
   * The charge cannot be processed due to Stronghold-enforced spending limits.
   */
  CHARGE_BLOCKED_EXCEEDS_LIMIT = 'charge_blocked_exceeds_limit',
  /**
   * The action cannot be performed on a canceled pay link.
   */
  PAY_LINK_CANCELED = 'pay_link_canceled',
  /**
   * The action cannot be performed on a expired pay link.
   */
  PAY_LINK_EXPIRED = 'pay_link_expired',
  /**
   * The action cannot be performed on a used pay link.
   */
  PAY_LINK_ALREADY_USED = 'pay_link_already_used',
  /**
   * The charge associated to the pay link has been modified.
   */
  PAY_LINK_CHARGE_AMOUNT_MODIFIED = 'pay_link_charge_amount_modified',
  /**
   * The amount of the charge is invalid. It must be between 100 (1$) and 100000 (1000$).
   */
  INVALID_CHARGE_AMOUNT = 'invalid_charge_amount',
  /**
   * A tip has already be created for a charge.
   */
  CHARGE_TIP_ALREADY_CREATED = 'charge_tip_already_created',

  // Validation error
  /**
   * The field is missing for that object.
   */
  MISSING_FIELD = 'missing_field',
  /**
   * The field value is invalid.
   */
  INVALID_FIELD = 'invalid_field',
  /**
   * The value has already be taken.
   */
  VALUE_TAKEN = 'value_taken',
}

export enum ERROR_MESSAGE {
  AMOUNT_BAD_FORMAT = "The 'amount' option was unable to be parsed as number.",
  BAD_ENVIRONMENT = 'Invalid environment provided. Expect "live" or "sandbox".',
  ATTRIBUTE_REQUIRED = 'Attribute is required.',
}
