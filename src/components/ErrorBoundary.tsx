export enum RuntimeError {
  CHAR_LIMIT_EXCEEDED = 'NOT_ENOUGH_CHARS_LEFT'
}

import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  public componentDidCatch(e: any) {
    switch (e) {
      case RuntimeError.CHAR_LIMIT_EXCEEDED:
        alert(
          "Sorry, I'm out of letters. No one can possibly handle that many decisions."
        );
        break;

      default:
        throw e;
    }
  }

  public static getDerivedStateFromError() {}

  public render(): JSX.Element {
    return <>{this.props.children}</>;
  }
}
