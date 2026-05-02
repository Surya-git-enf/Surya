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
      // Silently fail — show nothing instead of crashing the whole page
      return null;
    }
    return this.props.children;
  }
}
