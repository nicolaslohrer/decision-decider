import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export class ErrorBoundary extends Component<Props> {
  public componentDidCatch(e: any) {
    alert(
      "Uhm. Something went wrong. Sorry about that. Maybe try to do start over or something. I dunno.",
    );
  }

  public static getDerivedStateFromError() {}

  public render() {
    return this.props.children;
  }
}
