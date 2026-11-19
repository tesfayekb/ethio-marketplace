import { useEffect, useRef, useState } from "react";

import { listingViewerState, type SaveAnswer } from "./save";

/**
 * INC-1203: saved belongs to one viewer/ad; a write supersedes earlier reads.
 * INC-1191 (F1-7a): the one signed-in read also says whether the viewer is the ad's
 * seller (`owner`). It is false until the read answers and for a signed-out visitor,
 * and a read that failed stays unknown (`saved: null`, `owner: false`) — the page then
 * offers what it always did, and the door still refuses a seller's own Save.
 */
export function useSavedState(viewerId: string | null, publicId: string, initialCount: number) {
  const [state, setState] = useState<{
    viewerId: string | null;
    publicId: string;
    saved: boolean | null;
    owner: boolean;
    count: number;
  } | null>(null);
  const sequence = useRef(0);

  useEffect(() => {
    let active = true;
    const asked = ++sequence.current;
    setState({
      viewerId,
      publicId,
      saved: viewerId === null ? false : null,
      owner: false,
      count: initialCount,
    });
    if (viewerId !== null) {
      void listingViewerState(publicId).then((answer) => {
        if (active && sequence.current === asked) {
          setState({
            viewerId,
            publicId,
            saved: answer === null ? null : answer.saved,
            owner: answer === null ? false : answer.owner,
            count: initialCount,
          });
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
        // A saved write is the answer of a viewer who is not the seller (the door refuses the seller).
        setState({ viewerId, publicId, saved: answer.saved, owner: false, count: answer.count });
      }
    };
  };

  return {
    saved: current?.saved ?? null,
    owner: current?.owner ?? false,
    count: current?.count ?? initialCount,
    beginWrite,
  };
}
