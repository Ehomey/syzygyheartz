/**
 * Auth State Types
 */

import { UserProfile, BaZiChart } from '../../core/types';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  baziChart: BaZiChart | null;
  error: string | null;
}

export type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: UserProfile; baziChart?: BaZiChart } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'UPDATE_BAZI'; payload: BaZiChart }
  | { type: 'CLEAR_ERROR' };
