/**
 * Syzygy Hearts - Chinese Astrology Dating App
 *
 * Main entry point - clean and minimal.
 * All logic has been extracted to:
 * - src/core/ - Types and constants
 * - src/domain/ - Business logic (BaZi calculations)
 * - src/state/ - State management (Context + useReducer)
 * - src/presentation/ - Components, screens, navigation
 */

import React from 'react';
import { AuthProvider } from './src/state';
import { RootNavigator } from './src/presentation/navigation';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
