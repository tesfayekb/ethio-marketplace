/** Each reader owns one bounded, version-checked in-process cache instance. */
export function versionCache<K, T>(opts: {
  ttlMs: number;
  max: number;
}): {
  get(
    key: K,
    version: () => Promise<string | null>,
    build: (version: string) => Promise<T | null>,
  ): Promise<{ version: string; value: T } | null>;
} {
  if (
    !Number.isFinite(opts.ttlMs) ||
    opts.ttlMs < 0 ||
    !Number.isInteger(opts.max) ||
    opts.max < 1
  ) {
    throw new Error("invalid version cache bounds");
  }
  const entries = new Map<K, { version: string; value: T; checkedAt: number }>();
  const touch = (key: K, entry: { version: string; value: T; checkedAt: number }) => {
    entries.delete(key);
    entries.set(key, entry);
    if (entries.size > opts.max) {
      const oldest = entries.keys().next();
      if (!oldest.done) entries.delete(oldest.value);
    }
    return { version: entry.version, value: entry.value };
  };
  return {
    async get(key, version, build) {
      const entry = entries.get(key);
      if (entry !== undefined && Date.now() - entry.checkedAt < opts.ttlMs)
        return touch(key, entry);
      try {
        const current = await version();
        if (current === null) {
          entries.delete(key);
          return null;
        }
        if (entry !== undefined && entry.version === current) {
          return touch(key, { ...entry, checkedAt: Date.now() });
        }
        const value = await build(current);
        if (value === null) {
          entries.delete(key);
          return null;
        }
        return touch(key, { version: current, value, checkedAt: Date.now() });
      } catch (error) {
        entries.delete(key);
        throw error;
      }
    },
  };
}
