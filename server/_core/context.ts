export function createContext(_opts: { req: unknown; res: unknown }) {
  return {};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
