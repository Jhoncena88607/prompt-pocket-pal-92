export const formatINR = (n: number, opts: { compact?: boolean } = {}) => {
  if (opts.compact) {
    return new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(n);
  }
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
};

export const inr = (n: number) => `₹${formatINR(n)}`;
export const inrCompact = (n: number) => `₹${formatINR(n, { compact: true })}`;
