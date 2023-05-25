import * as components from './index';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    IButton: typeof components.Button;
    IScreenAdapter: typeof components.ScreenAdapter;
    ElDatepickers: typeof components.ElDatepickers;
    EchartsMap: typeof components.EchartsMap;
  }
}
export {};
