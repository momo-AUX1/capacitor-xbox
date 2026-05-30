export type UwpEventHandle = {
  remove: () => void;
};

export type UwpPlugin = {
  init?: (bridge: UwpBridge) => void | Promise<void>;
};

export declare class UwpBridge {
  constructor(webview?: unknown);
  static isAvailable(): boolean;
  callNative<T = unknown>(methodName: string, ...args: unknown[]): Promise<T>;
  registerPlugin(plugin: UwpPlugin): void;
  on(event: string, callback: (data: unknown) => void): UwpEventHandle;
  off(event: string, callback: (data: unknown) => void): void;
  emit(event: string, data?: unknown): void;
  readFile(fileName: string, codec?: string | null): Promise<unknown>;
  writeFile(fileName: string, data: string): Promise<unknown>;
  hideCursor(): Promise<unknown>;
  showCursor(): Promise<unknown>;
  [methodName: string]: unknown;
}

export default UwpBridge;
