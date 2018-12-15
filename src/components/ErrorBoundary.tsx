/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Component } from "react";

jsx;

// TODO: Migrate to function component once the React team introduces a way to handle componentDidCatch with them.
export class ErrorBoundary extends Component {
  public componentDidCatch(e: any) {
    alert(
      "Uhm. Something went wrong. Sorry about that. Maybe try to do start over or something. I dunno."
    );
  }

  public static getDerivedStateFromError() {}

  public render() {
    return this.props.children;
  }
}
