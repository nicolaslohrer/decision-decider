import React, { Component } from 'react';
import { ErrorCode } from '../utils/ErrorCodes';

export class ErrorBoundary extends Component {
  public componentDidCatch(e: any) {
    switch (e) {
      case ErrorCode.CHAR_LIMIT_EXCEEDED:
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
