"use client";

import { useEffect, useRef, useState, type IframeHTMLAttributes } from "react";

/** Same vertical distance Chrome's own `loading="lazy"` uses on fast networks. */
const VERTICAL_MARGIN = "1250px 0px";
/** Roughly two cards ahead inside a horizontal carousel. */
const HORIZONTAL_MARGIN = "0px 720px";

/*
 * Embeds start one at a time, each in its own idle period, and none before
 * the page itself has finished loading — so several embeds coming into range
 * together never turn into one long burst of parsing that blocks taps.
 */
const queue: Array<() => void> = [];
let pageSettled = false;
let pumping = false;

const onIdle = (cb: () => void) =>
  typeof window.requestIdleCallback === "function"
    ? window.requestIdleCallback(cb, { timeout: 600 })
    : window.setTimeout(cb, 120);

function pump() {
  if (pumping || !pageSettled) return;
  const start = queue.shift();
  if (!start) return;
  pumping = true;
  onIdle(() => {
    start();
    pumping = false;
    pump();
  });
}

function enqueue(start: () => void) {
  queue.push(start);
  if (!pageSettled && queue.length === 1) {
    const settle = () =>
      onIdle(() => {
        pageSettled = true;
        pump();
      });
    if (document.readyState === "complete") settle();
    else window.addEventListener("load", settle, { once: true });
    return;
  }
  pump();
}

function horizontalScroller(el: HTMLElement) {
  for (let node = el.parentElement; node; node = node.parentElement) {
    const overflowX = getComputedStyle(node).overflowX;
    if (overflowX === "auto" || overflowX === "scroll") return node;
  }
  return null;
}

/**
 * An <iframe> that is only created once it is close to being seen.
 *
 * Native `loading="lazy"` also loads iframes that sit far to the side inside a
 * horizontal carousel, so a row of Instagram embeds near the top of a page
 * used to load every post at once (dozens of embeds, thousands of requests).
 * Here a card in a carousel waits until its row is near the viewport *and*
 * the card is within a couple of swipes, and starts are spread out (see the
 * queue above). Until then the card looks the same as an embed that is still
 * loading.
 */
export function LazyIframe({ src, ...props }: IframeHTMLAttributes<HTMLIFrameElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || ready) return;

    if (typeof IntersectionObserver === "undefined") {
      setReady(true);
      return;
    }

    const scroller = horizontalScroller(el);
    let rowNear = false;
    let cardNear = !scroller;
    let queued = false;

    const update = () => {
      if (queued || !rowNear || !cardNear) return;
      queued = true;
      vertical.disconnect();
      horizontal?.disconnect();
      enqueue(() => setReady(true));
    };

    const vertical = new IntersectionObserver(
      ([entry]) => {
        rowNear = entry.isIntersecting;
        update();
      },
      { rootMargin: VERTICAL_MARGIN },
    );
    vertical.observe(scroller ?? el);

    const horizontal = scroller
      ? new IntersectionObserver(
          ([entry]) => {
            cardNear = entry.isIntersecting;
            update();
          },
          { root: scroller, rootMargin: HORIZONTAL_MARGIN },
        )
      : null;
    horizontal?.observe(el);

    return () => {
      vertical.disconnect();
      horizontal?.disconnect();
    };
  }, [ready]);

  // Until then a box with the iframe's own classes holds its exact place. A
  // fresh <iframe src> is inserted afterwards rather than giving an existing
  // blank frame a src: re-navigating a blank frame makes Chrome parse the
  // embed on the page's own thread, which showed up as long blocking tasks.
  if (!ready) {
    return <div ref={ref} aria-hidden="true" className={props.className} style={props.style} />;
  }
  return <iframe src={src} {...props} />;
}
