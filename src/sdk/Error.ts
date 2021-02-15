import type { ERROR_TYPE, ERROR_CODE } from './constants';

export class StrongholdPayError extends Error {
  type: ERROR_TYPE;
  code: ERROR_CODE;
  property: string | null;
  reference: string | null;

  constructor(
    type: ERROR_TYPE,
    code: ERROR_CODE,
    message: string,
    property: string | null = null,
    reference: string | null = null
  ) {
    super(message);
    this.name = type;

    this.type = type;
    this.code = code;
    this.property = property;
    this.reference = reference;
  }
}
