import type { StrongholdPayError } from './sdk/Error';
import type { MessageEventData } from './sdk/types';

export interface CommonProps {
  host?: string;
  publishableKey: string;
  customerToken: string;
  onEvent?: (event: MessageEventData) => void;
  onReady?: () => void;
  onExit?: () => void;
  onError?: (error: StrongholdPayError) => void;
}
