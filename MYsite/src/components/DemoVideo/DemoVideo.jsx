import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FiClock, FiMaximize, FiMinimize, FiPause, FiPlay } from 'react-icons/fi';
import './DemoVideo.css';

/*
  Full-bleed watch band.

  At rest it is an ambient loop with the mark centred over it — the poster state.
  Clicking anywhere swaps in the real commercial, which is the only thing that
  ever pulls the 1.9MB down: the ambient loop is 291KB and the film is preload
  ="none" until the first play.
*/
const DemoVideo = () => {
  const videoRef = useRef(null);
  const stageRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const start = useCallback(() => {
    if (started) return;
    setStarted(true);
    setIsPlaying(true);
  }, [started]);

  // Autoplay has to wait for the element to exist, so it runs off `started`
  // rather than inside the click handler.
  useEffect(() => {
    if (!started) return;
    videoRef.current?.play().catch(() => setIsPlaying(false));
  }, [started]);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  // Fullscreen goes on the stage, not the <video>, so the pause and exit
  // controls come with it — a fullscreened <video> hides its overlay children.
  const toggleFull = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else el.requestFullscreen?.().catch(() => {});
  }, []);

  // Mirrors Escape and the browser's own exit affordance back into state.
  useEffect(() => {
    const sync = () => setIsFull(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);

  /* The "Play video" chip rides the cursor. Motion values rather than state so
     pointermove doesn't re-render the section on every frame, under the same
     spring the case-study rows use. It parks on the 25% gridline when the
     pointer is away, so it still reads as a label before you ever hover. */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  /* Tighter than the site's usual 400/40/1: this chip stands in for the cursor
     itself, and at that spring it trailed far enough behind the pointer to feel
     broken rather than smooth. */
  const SPRING = { stiffness: 620, damping: 46, mass: 0.55 };
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);

  const [hovering, setHovering] = useState(false);

  // Materialise under the cursor. Without the jump the spring animates in from
  // wherever it was left, so it flies across the band on every re-entry.
  const enter = useCallback((e) => {
    if (e.pointerType !== 'mouse') return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    [mx, my, sx, sy].forEach((v, i) => v.jump?.(i % 2 === 0 ? x : y));
    mx.set(x);
    my.set(y);
    setHovering(true);
  }, [mx, my, sx, sy]);

  const leave = useCallback(() => setHovering(false), []);

  const trackPointer = useCallback((e) => {
    // Coarse pointers have no cursor to follow, and firing this on touch would
    // strand the chip wherever the last tap landed.
    if (e.pointerType !== 'mouse') return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }, [mx, my]);

  return (
    <section className="dv-section" aria-label="See Cogxioms in action">
      <div className="dv-gridlines" aria-hidden="true">
        <span className="dv-gridline" />
        <span className="dv-gridline" />
        <span className="dv-gridline" />
      </div>

      <div
        ref={stageRef}
        className={`dv-stage${started ? ' is-playing' : ''}`}
        onPointerEnter={started ? undefined : enter}
        onPointerMove={started ? undefined : trackPointer}
        onPointerLeave={started ? undefined : leave}
      >
        {!started && (
          <>
            <video
              className="dv-ambient"
              poster="/videos/demo-bg.jpg"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
            >
              <source src="/videos/demo-bg.webm" type="video/webm" />
              <source src="/videos/demo-bg.mp4" type="video/mp4" />
            </video>
            <span className="dv-scrim" aria-hidden="true" />

            <button className="dv-hit" onClick={start} aria-label="Play the Cogxioms film">
              <motion.img
                src="/logo.png"
                alt=""
                className="dv-mark"
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.12, 0.23, 0.5, 1] }}
                viewport={{ once: true }}
              />
            </button>

            {/* Inner span exists to carry the lower two corner brackets — two
                pseudo-elements per box, four corners across the pair. */}
            <motion.span
              className="dv-tag dv-tag-play"
              style={{ x: sx, y: sy }}
              initial={false}
              animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.84 }}
              transition={{ duration: 0.22, ease: [0.12, 0.23, 0.5, 1] }}
              aria-hidden="true"
            >
              <span className="dv-tag-txt">Play video</span>
            </motion.span>
            <span className="dv-tag dv-tag-len" aria-hidden="true">
              <FiClock aria-hidden="true" />
              1 Minute Watch
            </span>
          </>
        )}

        {started && (
          <>
            {/* Not muted: the film carries narration, and playback only ever
                starts from a click, so autoplay policy allows sound. The
                ambient loop behind it stays muted — that one does autoplay. */}
            <video
              ref={videoRef}
              className="dv-film"
              poster="/videos/cogxioms.jpg"
              preload="none"
              playsInline
              onClick={toggle}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setStarted(false)}
            >
              <source src="/videos/cogxioms.webm" type="video/webm" />
              <source src="/videos/cogxioms.mp4" type="video/mp4" />
            </video>
            <div className="dv-controls">
              <button
                className="dv-toggle"
                onClick={toggle}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <FiPause /> : <FiPlay />}
              </button>
              <button
                className="dv-toggle"
                onClick={toggleFull}
                aria-label={isFull ? 'Exit full screen' : 'Play full screen'}
              >
                {isFull ? <FiMinimize /> : <FiMaximize />}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DemoVideo;
