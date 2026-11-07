import { useLayoutEffect, useRef, useState } from "react";

/** The size of the box before it has been measured. */
const GUESS = { width: 700, height: 470 };

/** Space kept between the box and the pointer, and between the box and the window's edge. */
const GAP = 16;
const EDGE = 8;

/**
 * Where to put a floating box so it is fully on screen: beside the pointer, flipped to its left or lifted up when it would
 * overflow. The box's real size is measured after each render.
 */
export function useOnScreenPosition(pointerX: number, pointerY: number) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState(GUESS);

  useLayoutEffect(() => {
    const element = boxRef.current;

    if (element && (element.offsetWidth !== box.width || element.offsetHeight !== box.height))
      setBox({ width: element.offsetWidth, height: element.offsetHeight });
  });

  const flipped = pointerX + GAP + box.width > window.innerWidth - EDGE;
  const left = flipped ? pointerX - GAP - box.width : pointerX + GAP;
  const top = Math.min(pointerY + GAP, window.innerHeight - EDGE - box.height);

  return { boxRef, left: Math.max(EDGE, left), top: Math.max(EDGE, top) };
}
