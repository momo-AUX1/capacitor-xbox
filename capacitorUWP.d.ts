import type UwpBridge from "./uwp.js";

export type CapacitorUwpRuntime = {
  init: (bridge?: UwpBridge) => Promise<unknown>;
  autoInit: () => Promise<unknown> | null;
};

export declare const CapacitorUWP: CapacitorUwpRuntime;
export default CapacitorUWP;
