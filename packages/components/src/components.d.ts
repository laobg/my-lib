import { ElDatepickers } from './el-datepickers/index';
import * as components from './index';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    IButton: typeof components.Button;
    IIcon: typeof components.Icon;
    IScreenAdapter: typeof components.ScreenAdapter;
    ElDatepickers: typeof components.ElDatepickers;
  }
}
export {};
