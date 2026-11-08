import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { recordRouterDiagnostic } from '../utils/routerDiagnostics';

export default function DiagnosticLayout() {
  useEffect(() => {
    recordRouterDiagnostic('layout raíz montado');
  }, []);

  return <Slot />;
}