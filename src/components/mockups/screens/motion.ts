/* The vocabulary the floating pieces draw from.
 *
 * Each screen still choreographs its own — how many lift, from which edge, in
 * what order. What is shared is the material: depth, drift, the three float
 * speeds and the entrance stagger. Before this there were twelve distinct
 * durations for twelve pieces, three of which silently had no tilt at all.
 *
 * Depth and amplitude are design units, not pixels. They used to be literal
 * px, which meant they did not scale with the frame — the float read a third
 * stronger on a narrow viewport, where the pieces are smallest.
 */

/** Perspective depth while a piece floats, in design units. */
const DEPTH = 26;

/** Milliseconds between one piece entering and the next. */
const STAGGER = 90;

/** Three speeds. Bigger pieces move slower and further, as mass suggests. */
export const drift = {
  heavy: { amp: 12, dur: 6.8 },
  mid: { amp: 10, dur: 5.8 },
  light: { amp: 8, dur: 5.0 },
} as const;

export interface Piece {
  /** Centre as a percentage of the frame box; outside 0–100 hangs off an edge. */
  x: number;
  y: number;
  /** How far it slides as the screen scrolls. Negative leans left. */
  parallax: number;
  speed?: keyof typeof drift;
  /** Degrees of rock. 0 for circles and wide flat pieces, which cannot show it. */
  tilt?: number;
}

/** Everything a `.wz-out` needs, so a frame declares placement and nothing else. */
export function float(p: Piece, index = 0) {
  const { amp, dur } = drift[p.speed ?? 'mid'];
  return {
    style: `--x:${p.x}%;--y:${p.y}%;--z:calc(${DEPTH} * var(--spacing));`,
    data: {
      'data-x': String(p.x),
      'data-y': String(p.y),
      'data-parallax': String(p.parallax),
    },
    enter: `--in-delay:${index * STAGGER}ms`,
    // Offsetting the delay by index keeps two pieces of the same speed from
    // breathing in lockstep, which reads as a single rigid object.
    rock: `--amp:calc(${amp} * var(--spacing));--dur:${dur}s;--delay:${(index * 0.3).toFixed(1)}s;--tilt:${p.tilt ?? 0}deg`,
  };
}
