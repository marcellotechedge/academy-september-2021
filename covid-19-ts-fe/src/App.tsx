import React from 'react';
import { LoadingOverlay } from './components/LoadingOverlay/LoadingOverlay';
import AppRouting from './routing/AppRouting';
import { useAppSelector } from './store/storeConfiguration';

import './App.scss';

export const App: React.FC = () => {
  const { loadingCounter } = useAppSelector(state => state.layout);

  return (
    <LoadingOverlay active={loadingCounter > 0}>
      <AppRouting />
    </LoadingOverlay>
  );
}

export default App;