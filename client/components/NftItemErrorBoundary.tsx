import { Component, ReactNode } from "react";

import NftPreviewUnavailable from "./NftPreviewUnavailable";

type NftItemErrorBoundaryProps = {
  children: ReactNode;
};
type NftItemErrorBoundaryState = {
  hasError: boolean;
};

export default class NftItemErrorBoundary extends Component<
  NftItemErrorBoundaryProps,
  NftItemErrorBoundaryState
> {
  constructor(props: NftItemErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="backdrop-blur-xl bg-slate-900/50 border border-slate-400/20 rounded-lg text-slate-300 h-80 flex flex-col shadow-xl shadow-slate-900/40">
          <div className="flex-grow relative overflow-hidden rounded-t-lg">
            <NftPreviewUnavailable />
          </div>
          <div className="py-2 px-4 border-t border-slate-400/20 min-h-[41px] flex items-center justify-center">
            <h2 className="text-md text-slate-300/50">
              <pre className="truncate text-ellipsis overflow-hidden whitespace-nowrap text-xs">
                Malformed data
              </pre>
            </h2>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
