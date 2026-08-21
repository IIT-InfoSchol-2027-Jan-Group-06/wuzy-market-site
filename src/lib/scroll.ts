// Pinned sections budget their scroll in viewports. Phones need less of it:
// a budget that reads as deliberate on a desktop takes three or four swipes to
// get through on a phone, because the content is simpler and there is less of
// it on screen to look at while you scroll.
//
// Every pinned section multiplies its budget by this, so they stay in step and
// there is one number to tune. It is called from inside ScrollTrigger `end`
// functions, which re-evaluate on refresh, so rotating a device re-scales.
export const pinScale = () => (window.innerWidth < 768 ? 0.6 : 1);
