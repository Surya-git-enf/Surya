'use client';
import React from 'react';

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      const err = this.state.error as Error;
      return (
        <div style={{ padding: 40, background: '#000', color: '#f00', fontFamily: 'monospace', fontSize: 14 }}>
          <h2>CRASH — exact error:</h2>
          <pre>{err.message}</pre>
          <pre>{err.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
