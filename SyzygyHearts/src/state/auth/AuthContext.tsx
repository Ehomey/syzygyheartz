/**
 * Auth Context Provider
 * Provides authentication state and actions throughout the app
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, BaZiChart } from '../../core/types';
import { AuthState, AuthAction } from './types';
import { authReducer, initialAuthState } from './reducer';

interface AuthContextValue {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (user: UserProfile, baziChart?: BaZiChart) => void;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateBaZi: (chart: BaZiChart) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Load saved auth state on mount
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        const savedBaZi = await AsyncStorage.getItem('baziChart');

        if (savedUser) {
          const user = JSON.parse(savedUser);
          const baziChart = savedBaZi ? JSON.parse(savedBaZi) : undefined;
          dispatch({ type: 'AUTH_SUCCESS', payload: { user, baziChart } });
        } else {
          dispatch({ type: 'AUTH_FAILURE', payload: '' });
        }
      } catch (error) {
        dispatch({ type: 'AUTH_FAILURE', payload: 'Failed to load auth state' });
      }
    };

    loadAuthState();
  }, []);

  // Memoized action creators
  const actions = useMemo(
    () => ({
      login: async (user: UserProfile, baziChart?: BaZiChart) => {
        try {
          await AsyncStorage.setItem('user', JSON.stringify(user));
          if (baziChart) {
            await AsyncStorage.setItem('baziChart', JSON.stringify(baziChart));
          }
          dispatch({ type: 'AUTH_SUCCESS', payload: { user, baziChart } });
        } catch (error) {
          dispatch({ type: 'AUTH_FAILURE', payload: 'Failed to save auth state' });
        }
      },

      logout: async () => {
        try {
          await AsyncStorage.multiRemove(['user', 'baziChart']);
          dispatch({ type: 'LOGOUT' });
        } catch (error) {
          console.error('Logout error:', error);
        }
      },

      updateProfile: (updates: Partial<UserProfile>) => {
        dispatch({ type: 'UPDATE_PROFILE', payload: updates });
      },

      updateBaZi: (chart: BaZiChart) => {
        dispatch({ type: 'UPDATE_BAZI', payload: chart });
      },

      clearError: () => {
        dispatch({ type: 'CLEAR_ERROR' });
      },
    }),
    []
  );

  const value = useMemo(
    () => ({
      state,
      dispatch,
      ...actions,
    }),
    [state, actions]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
