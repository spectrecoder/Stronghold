import type { StrongholdPayError } from '../sdk/Error';

export interface CommonProps {
  host?: string;
  publishableKey: string;
  customerToken: string;
  onExit?: () => void;
  onError?: (error: StrongholdPayError) => void;
}
