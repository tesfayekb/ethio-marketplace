import { useEffect, useRef, useState } from "react";

import { listingSaved, type SaveAnswer } from "./save";

/** INC-1203: saved belongs to one viewer/ad; a write supersedes earlier reads. */
export function useSavedState(viewerId: string | null, publicId: string, initialCount: number) {
  const [state, setState] = useState<{
    viewerId: string | null;
    publicId: string;
    saved: boolean | null;
    count: number;
  } | null>(null);
  const sequence = useRef(0);

  useEffect(() => {
    let active = true;
    const asked = ++sequence.current;
    setState({ viewerId, publicId, saved: viewerId === null ? false : null, count: initialCount });
    if (viewerId !== null) {
      void listingSaved(publicId).then((saved) => {
        if (active && sequence.current === asked) {
          setState({ viewerId, publicId, saved, count: initialCount });
        }
      });
    }
    return () => {
      active = false;
      sequence.current += 1;
    };
  }, [viewerId, publicId, initialCount]);

  const current = state?.viewerId === viewerId && state.publicId === publicId ? state : null;
  const beginWrite = () => {
    const written = ++sequence.current;
    return (answer: SaveAnswer) => {
      if (answer.ok && sequence.current === written) {
        setState({ viewerId, publicId, saved: answer.saved, count: answer.count });
      }
    };
  };

  return { saved: current?.saved ?? null, count: current?.count ?? initialCount, beginWrite };
}
