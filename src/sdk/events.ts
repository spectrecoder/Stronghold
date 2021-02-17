import { ERROR_CODE, ERROR_TYPE, EVENT } from './constants';
import { StrongholdPayError } from './Error';
import type { MessageEventData, OnSuccessMethod } from './types';

export function handleEvent(
  options: {
    onEvent: (event: MessageEventData) => void;
    onReady: () => void;
    onExit: () => void;
    onError: (error: StrongholdPayError) => void;
    onSuccess: OnSuccessMethod;
  },
  event: MessageEventData
) {
  const { onError, onReady, onEvent, onExit, onSuccess } = options;

  onEvent(event);

  if (event.event === EVENT.READY) {
    onReady();
  } else if (event.event === EVENT.EXIT) {
    onExit();
  } else if (event.event === EVENT.ERROR) {
    const error = event.payload.err || undefined;
    const type = error?.type || ERROR_TYPE.API_ERROR;
    const code = error?.code || ERROR_CODE.SERVER_ERROR;
    const message = error?.message || 'Server error occured.';
    const property = error?.property;
    const reference = error?.reference;
    onError(new StrongholdPayError(type, code, message, property, reference));
  } else if (event.event === EVENT.SUCCESS && onSuccess) {
    onSuccess(event.payload.data);
  }
}
