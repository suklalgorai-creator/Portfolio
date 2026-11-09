import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="container" role="alert" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
        <p className="section-eyebrow">SYSTEM RECOVERY</p>
        <h1 className="section-title">This page needs a refresh.</h1>
        <p className="section-subtitle">The portfolio hit an unexpected UI error. Your browser can safely reload it.</p>
        <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
          Reload portfolio
        </button>
      </main>
    );
  }
}
