# Wuzy phone frame

Four scrollable phone mockups built from the Figma SVG exports. At rest, some
interface elements break out of the frame and float over the page, leaving their
slots empty. Scroll a screen and they fly home, filling the gaps — the
composition becomes an ordinary phone.

## Files

| File | Purpose |
|---|---|
| `index.html` | The four-section demo page. Open this. |
| `wuzy-frame.css` | The component. All geometry derives from the bezel's own viewBox. |
| `wuzy-frame.js` | Reveal, homing, parallax, pointer tilt. No dependencies. |
| `assets/` | Split screen content, breakout pieces, bezel. |
| `source-images/` | All 38 rasters pulled out of the original exports. |
| `wuzy-frame-standalone.html` | Everything inlined, for sending around. |

## What floats where

| Screen | Floating | Pinned in the UI |
|---|---|---|
| Feed | Feed card, recommendation poster | Nav bar |
| Discover | Neon Nights card, two date badges | Nav bar |
| Event | Title, date/time, map | Back, share + more |
| Messages | Search, two message rows, compose | Nav bar |

Anything that floats leaves its slot empty. Everything else stays in the export.

## The one structural rule

`.wz-well` is the only element that clips. Breakouts are siblings of
`.wz-phone`, never children of the well — that is what lets them cross the
bezel. Move one inside the well and it gets sliced at the frame edge.

The bezel is a ring path with no background fill, so it sits on top as an
overlay and the screen shows through the hole. No masking, and the component
stays transparent over any page background. The dynamic island has been removed
from it — floating content sat over it and it read as a mistake.

## Homing

`--t` is the progress: `0` floating free, `1` seated back in the UI. The script
drives it toward `1` whenever the well is scrolled past 6px, easing 14% per
frame, and back to `0` at the top.

Each `.wz-out` carries `data-hx` / `data-hy` — the centre of its original slot
in screen units. Home placement is recomputed every frame, because the slot
moves with the scroll. Geometry comes from `offsetLeft` and `clientWidth` rather
than `getBoundingClientRect`, so the pointer tilt (a 3D rotation on an ancestor)
can't feed back into it.

The flight is a **transform**, not `left`/`top`. Writing percentages every frame
forces layout on every piece and makes it stutter; `--dx` / `--dy` are pixel
offsets that stay on the compositor.

Three things follow `--t`:

- **Surfaces dissolve.** The chip, card and glass plates exist so a white-on-dark
  element survives a light page. Back inside the UI they'd be wrong, so their
  backgrounds, rings and shadows fade out.
- **Scale corrects.** `--hs` undoes both the display scale and the wrapper's
  padding. Wrappers use an inset ring rather than a border — a real 1px border
  sits inside the border box and offsets the artwork enough to show a double.
- **Clipping engages late, and only when needed.** A seated piece obeys the
  screen's edges via `clip-path`, ramped in over the last 18% of the flight —
  ramping from the start slices a piece against the frame the whole way in. And
  a piece sitting safely inside the well is not clipped at all, because
  `inset(0 0 0 0 round R)` still rounds its own corners against the well's
  radius, which deformed the date badges once they settled.

## Pinned chrome

`.wz-pin` seats an element at its original slot, fixed to the frame so it
doesn't scroll away. Anchoring matters. A top-anchored control (back,
share + more) sits at the same coordinate as the screen at rest, so mapping its
Figma y through the bezel geometry is correct. The nav bar is not — its y is
wherever the bottom of the *design* viewport happened to fall in a long
screenshot, which is nowhere near the bottom of this frame. Bottom-anchored
chrome is placed against the well's own lower edge instead.

## Glassmorphism

Figma bakes backdrop blur as a flat plate. An SVG loaded through `<img>` is
sandboxed and cannot sample anything behind it, so that blur is dead on arrival.
Back, share/more, search and nav are real DOM plates (`.wz-glass`) with the
vector icon positioned inside at the offset it had on screen. Two treatments:
dark by default, for plates that float over a light page; `.wz-glass--light`
frosted, for controls over the app's own photography.

## Authored content

The third recommendation card is cut off by the screen edge, so Figma never drew
its profile name. It is added back as a `.wz-label` — positioned to match the two
cards beside it, same baseline and same gap from the avatar, and sized from
`--w` so it tracks at any frame size. Edit the text in `gen.py`.

## Image optimisation

`optimize.py` resamples each embedded raster to 3x the box it is actually
painted into, roughly halving page weight. It changes the pixel payload only —
the `<image>` keeps its declared width/height, so the raster scales back into the
same box and every pattern transform stays valid. Do not try to rewrite those
transforms to match the new pixel size: Figma emits `scale(...)`, `matrix(...)`
*and* a compound `translate(...) scale(...)`, and missing the third form maps the
image at a fraction of its box, which silently blanks it.

## Using it

Drop `wuzy-frame.css`, `wuzy-frame.js` and `assets/` in, then copy any `.wz`
block out of `index.html`. Size a phone with one variable:

```html
<div class="wz" style="--fw:360px" data-screen-w="402"> ... </div>
```

`wuzy-frame.js` initialises every `.wz` on the page. For one injected later,
call `WuzyFrame.init(el)`.

`--x` / `--y` are a piece's centre as a percentage of the frame box; outside
`0–100` hangs it off the edge. `--z` is depth for the tilt, `--w` its width,
`data-parallax` how far it drifts while floating. Widths are computed, never
typed:

```
frame_width x 0.9536 x (piece_width / screen_width) x scale
```

so a piece floating outside the frame is at the same scale as the same pixels
inside it. Regenerate with `gen.py` rather than editing the HTML by hand.

## Notes

- `event_feed/hero` is the whole Neon Nights card — badge, heart, title, venue,
  price and visit button. Its resting offset is small enough that the card
  mostly covers the slot it left; push `--x` much further and the gap shows.
- Scroll travel: Feed 1022px, Discover 465px, Event 256px, Messages 39px.
  Messages is short because its source screen is 852 units against a 618px
  viewport; homing still fires, there is just little runway.
- The frame is proportionally wider than a real iPhone (0.491 vs 0.461), so
  fitting to width shows about 733 of an 852-unit design viewport.
