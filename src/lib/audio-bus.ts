/**
 * Audio bus.
 *
 * One rule for the whole site: while anything else is making sound, the
 * background music steps aside. Two kinds of source feed the bus.
 *
 *  1. Real <audio> / <video> elements — picked up automatically. Media events
 *     do not bubble, but they do run through the capture phase, so a single
 *     listener on `document` sees every player on the page without any of
 *     those components needing to know this module exists.
 *
 *  2. Cross-origin players such as the YouTube iframe, which fire no events we
 *     can read. Those claim and release the bus by hand.
 */

type Listener = (busy: boolean) => void;

const playingMedia = new Set<HTMLMediaElement>();
const claims = new Set<string>();
const listeners = new Set<Listener>();

/** The background music itself, which must never count as "something else". */
let background: HTMLMediaElement | null = null;
let busy = false;
let watching = false;
let sweepTimer: ReturnType<typeof setInterval> | null = null;

/** Drop anything that has stopped, been emptied, or left the document. */
function prune() {
  playingMedia.forEach((el) => {
    if (!el.isConnected || el.paused || el.ended) playingMedia.delete(el);
  });
}

function stopSweep() {
  if (sweepTimer === null) return;
  clearInterval(sweepTimer);
  sweepTimer = null;
}

/**
 * A player can disappear without ever firing `pause` — React unmounting a
 * video card, for instance. While the bus is busy, re-check once a second so
 * the music can never be left ducked forever.
 */
function startSweep() {
  if (sweepTimer !== null || typeof window === "undefined") return;
  sweepTimer = setInterval(notify, 1000);
}

function notify() {
  prune();

  const next = playingMedia.size > 0 || claims.size > 0;

  if (next) startSweep();
  else stopSweep();

  if (next === busy) return;

  busy = next;
  listeners.forEach((listener) => listener(busy));
}

/** Start listening for media on the page. Safe to call repeatedly. */
export function watchMedia() {
  if (watching || typeof document === "undefined") return;
  watching = true;

  const onStart = (event: Event) => {
    const el = event.target;
    if (!(el instanceof HTMLMediaElement) || el === background) return;
    playingMedia.add(el);
    notify();
  };

  const onStop = (event: Event) => {
    const el = event.target;
    if (!(el instanceof HTMLMediaElement)) return;
    playingMedia.delete(el);
    notify();
  };

  // `true` = capture phase, which is the only way to hear these on document.
  document.addEventListener("play", onStart, true);
  document.addEventListener("playing", onStart, true);
  document.addEventListener("pause", onStop, true);
  document.addEventListener("ended", onStop, true);
  document.addEventListener("emptied", onStop, true);
}

/** Mark the background music so it is exempt from ducking itself. */
export function setBackgroundMedia(el: HTMLMediaElement | null) {
  background = el;
  if (el) playingMedia.delete(el);
  notify();
}

/** For players we cannot observe, such as the YouTube iframe. */
export function claimAudio(id: string) {
  claims.add(id);
  notify();
}

export function releaseAudio(id: string) {
  claims.delete(id);
  notify();
}

/** Subscribe to "is something else playing?". Fires immediately with the current value. */
export function subscribeAudioBus(listener: Listener) {
  listeners.add(listener);
  listener(busy);
  return () => {
    listeners.delete(listener);
  };
}
