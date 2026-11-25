import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { resilientLazy } from "@/lib/resilient-lazy";

/**
 * DEC-434, DEC-451 — the staff second-factor gate (staff-factor-gate.tsx), on demand: the admin
 * layout (src/routes/admin.tsx) draws its body through it, and no member page's first download
 * carries it. If it cannot download, the screen says so in its own place with a Refresh — and draws
 * NO staff screen: the fallback never renders the children the gate would have guarded.
 */
function GateLoadFailed() {
  return (
    <div className="flex min-h-40 items-center justify-center px-4">
      <LoadFailedHere testid="admin-factor-load-failed" refreshTestid="admin-factor-refresh" />
    </div>
  );
}

export const LazyStaffFactorGate = resilientLazy(
  () => import("./staff-factor-gate").then((module) => module.StaffFactorGate),
  "the staff second-factor gate",
  GateLoadFailed,
  { inPlace: true },
);
