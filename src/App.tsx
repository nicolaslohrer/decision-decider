import { injectGlobal } from 'emotion';
import { normalize } from 'polished';
import React, { Component } from 'react';

export class App extends Component {
  public componentDidMount() {
    injectGlobal`
      ${normalize()}

      * {
        box-sizing: border-box;
        position: relative;

        user-select: none;

        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;

        -webkit-tap-highlight-color: transparent;

        &::before,
        &::after {
          box-sizing: inherit;
        }
      }
    `;
  }

  public render() {
    return <div>test</div>;
  }
}
