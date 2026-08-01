import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import {
  FiMail, FiEdit2, FiZap, FiCode, FiSend, FiGitMerge, FiPlus,
  FiCornerUpLeft, FiCornerUpRight, FiMic, FiTool, FiDatabase, FiCpu,
  FiCloud, FiGitBranch, FiBox,
} from 'react-icons/fi';
import { hatchGlyph } from '../Approach/icons';
import './WorkflowShowcase.css';

/*
 * The product section, rebuilt as a mock builder canvas.
 *
 * It replaced a row of four labelled dots joined by lines. The pipeline that
 * described was right; what it did not do was look like software. This shows the
 * same four stages as nodes on a real canvas — sidebar, toolbar, dotted grid,
 * connected nodes, edge rails — so "we build workflow systems" is demonstrated
 * rather than asserted.
 *
 * Two states, switched from the sidebar:
 *   AI AGENT   the node graph
 *   AI CHAT    a chat surface over the same chrome
 *
 * Everything is DOM and SVG. The connectors are hand-authored paths on a fixed
 * 1200x420 viewBox with preserveAspectRatio="none", so they stretch with the
 * canvas while staying locked to the nodes, which are positioned as percentages
 * of that same box. NODES x/y and the PATHS coordinates are the one pair here
 * that must be kept in step — move a node and its wire has to move with it.
 */

const NODE_SPRING = { type: 'spring', stiffness: 400, damping: 40, mass: 1 };

/* x/y are percentages of the canvas; 1200x420 is the wire viewBox they map to. */
const NODES = [
  { id: 'ingest', icon: FiMail, label: 'Data Ingestion', sub: 'Scrape · Sync', x: 6, y: 26 },
  { id: 'clean', icon: FiEdit2, label: 'Normalise', sub: 'Manual', x: 21, y: 26 },
  { id: 'ai', icon: FiZap, label: 'AI Processing', sub: 'Tools Agent', x: 36, y: 26, wide: true },
  { id: 'rules', icon: FiCode, label: 'Automation', sub: 'Rules', x: 58, y: 26 },
  { id: 'deliver', icon: FiSend, label: 'Delivery', sub: 'API · Dashboard', x: 73, y: 26 },
  /* Dashed sub-branch, mirroring the reference's lower loop. */
  { id: 'notify', icon: FiSend, label: 'Notify', sub: 'sendAndWait', x: 36, y: 72 },
  { id: 'if', icon: FiGitMerge, label: 'If', sub: '', x: 51, y: 72 },
  { id: 'email', icon: FiMail, label: 'Send Email', sub: 'Send', x: 66, y: 72 },
];

const PATHS = {
  spine: 'M110 128 H240 M290 128 H420 M545 128 H690 M740 128 H865',
  branch:
    'M455 175 V270 H455 M455 302 H420 M470 302 H600 M650 302 H780 M830 302 H880 M880 302 V175',
};

const STACK = [FiCpu, FiZap, FiBox, FiDatabase, FiCloud, FiPlus];

/*
 * The pointer drives the demo. It parks on the canvas, travels to a toggle,
 * clicks it, and returns — so the panel demonstrates itself rather than sitting
 * still. Four steps at 3s each: rest, click AI CHAT, rest, click AI AGENT.
 *
 * `mode` is what the step sets on arrival; null leaves the panel as it is.
 * Coordinates are percentages of .wf-shell, which is why the cursor lives on the
 * shell rather than inside the canvas — it has to reach the sidebar.
 */
const CURSOR_STEPS = [
  { left: 62, top: 64, mode: null, click: false },
  { left: 9.5, top: 15.5, mode: 'chat', click: true },
  { left: 62, top: 64, mode: null, click: false },
  { left: 9.5, top: 8, mode: 'agent', click: true },
];
const STEP_MS = 3000;
/* Roughly the travel time, so the click lands when the pointer arrives rather
   than the instant the step changes. */
const TRAVEL_MS = 900;

const Node = ({ node, index, still }) => {
  const Icon = node.icon;
  return (
    <motion.div
      className={`wf-node${node.wide ? ' is-wide' : ''}`}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      initial={still ? false : { opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ ...NODE_SPRING, delay: still ? 0 : index * 0.06 }}
    >
      <span className="wf-node-port is-in" aria-hidden="true" />
      <span className="wf-node-box">
        <Icon />
        {node.wide && <span className="wf-node-inline">{node.label}</span>}
      </span>
      <span className="wf-node-port is-out" aria-hidden="true" />
      <span className="wf-node-meta">
        <span className="wf-node-label">{node.label}</span>
        {node.sub && <span className="wf-node-sub">{node.sub}</span>}
      </span>
    </motion.div>
  );
};

const WorkflowShowcase = () => {
  const [mode, setMode] = useState('agent');
  const [step, setStep] = useState(0);
  const [clicking, setClicking] = useState(false);
  const [manual, setManual] = useState(false);
  const shellRef = useRef(null);
  const inView = useInView(shellRef, { amount: 'some' });
  const reduceMotion = useReducedMotion();

  /* The demo runs only while on screen, and stops for good once someone takes
     over with a real click — a pointer that keeps moving the panel out from
     under you is worse than no demo. */
  const auto = !reduceMotion && !manual && inView;

  useEffect(() => {
    if (!auto) return undefined;
    const id = setInterval(() => setStep((s) => (s + 1) % CURSOR_STEPS.length), STEP_MS);
    return () => clearInterval(id);
  }, [auto]);

  /* Fire the click on arrival, not on departure. */
  useEffect(() => {
    if (!auto) return undefined;
    const current = CURSOR_STEPS[step];
    if (!current.click) return undefined;
    const id = setTimeout(() => {
      setClicking(true);
      if (current.mode) setMode(current.mode);
      setTimeout(() => setClicking(false), 260);
    }, TRAVEL_MS);
    return () => clearTimeout(id);
  }, [auto, step]);

  const pick = (key) => {
    setMode(key);
    setManual(true);
  };

  const target = CURSOR_STEPS[step];
  /* True while the pointer is over the sidebar — the orb shifts away from it. */
  const nearSidebar = auto && target.left < 25;

  return (
    <section className="wf-section">
      <div className="wf-gridlines" aria-hidden="true">
        <span className="wf-gridline" />
        <span className="wf-gridline" />
        <span className="wf-gridline" />
      </div>

      <div className="wf-head">
        <motion.div
          className="wf-head-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="wf-eyebrow">
            <span className="wf-hatch" dangerouslySetInnerHTML={{ __html: hatchGlyph }} />
            Our Product
          </span>
          <h2 className="wf-heading">How a Cogxioms build flows</h2>
          <p className="wf-lede">
            Every engagement moves through the same pipeline, from raw data to a result your
            team can act on.
          </p>
        </motion.div>
      </div>

      <div className="wf-shell" ref={shellRef}>
        {/* Inset rail, as in the reference — hatch block top, hairline down. */}
        <span className="wf-rail wf-rail-left" aria-hidden="true">
          <i className="wf-rail-hatch" />
          <i className="wf-rail-line" />
          <i className="wf-rail-corner" />
        </span>

        <aside className="wf-side">
          <div className="wf-toggle" role="tablist" aria-label="Builder mode">
            {[
              ['agent', 'AI Agent'],
              ['chat', 'AI Chat'],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                className={`wf-toggle-btn${mode === key ? ' is-active' : ''}`}
                onClick={() => pick(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <span className="wf-side-label">Stack</span>
          <div className="wf-stack">
            {STACK.map((Icon, i) => (
              <span className="wf-stack-cell" key={i} aria-hidden="true">
                <Icon />
              </span>
            ))}
          </div>

          <span className="wf-side-auto">Auto</span>
        </aside>

        <div className="wf-main">
          <div className="wf-toolbar">
            <span className="wf-tool-group">
              <button type="button" className="wf-tool" aria-label="Undo">
                <FiCornerUpLeft />
              </button>
              <button type="button" className="wf-tool" aria-label="Redo">
                <FiCornerUpRight />
              </button>
            </span>
            <span className="wf-chip">
              Agent Mode <FiZap />
            </span>
            <span className="wf-chip">
              Untitled <FiGitBranch />
            </span>
          </div>

          {/* The state is on the canvas as well as the stage: the graph is a diagram and
              gets scaled to fit on small screens, while the chat is type and a
              dial that must stay legible. They need different heights, so the
              canvas has to know which is showing. */}
          <div className={`wf-canvas ${mode === 'chat' ? 'is-chat' : 'is-agent'}`}>
            <span className="wf-canvas-dots" aria-hidden="true" />
            <span className="wf-canvas-grain" aria-hidden="true" />

            <AnimatePresence mode="wait" initial={false}>
              {mode === 'agent' ? (
                <motion.div
                  key="agent"
                  className="wf-stage"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <svg
                    className="wf-wires"
                    viewBox="0 0 1200 420"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path className="wf-wire" d={PATHS.spine} />
                    <path className="wf-wire is-dashed" d={PATHS.branch} />
                    {/* Packets running the pipeline. Duplicates of the wires
                        with a short dash and a marching offset, which is what
                        gives the graph its only motion. */}
                    {!reduceMotion && (
                      <>
                        <path className="wf-flow" d={PATHS.spine} />
                        <path className="wf-flow is-slow" d={PATHS.branch} />
                      </>
                    )}
                  </svg>

                  {NODES.map((node, i) => (
                    <Node key={node.id} node={node} index={i} still={reduceMotion} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  className="wf-stage wf-chat"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  {/* Concentric dotted rings standing in for the reference's
                      particle sphere — same read, no WebGL context. It leans
                      away from the pointer while the pointer is over the
                      sidebar, so the two read as reacting to each other. */}
                  <motion.span
                    className={`wf-orb${reduceMotion ? ' is-still' : ''}`}
                    aria-hidden="true"
                    animate={
                      reduceMotion
                        ? {}
                        : nearSidebar
                          ? { x: 34, scale: 0.9, opacity: 0.7 }
                          : { x: 0, scale: 1, opacity: 1 }
                    }
                    transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.8 }}
                  >
                    <i />
                    <i />
                    <i />
                  </motion.span>

                  <div className="wf-prompt">
                    <span className="wf-prompt-text">Ask Cogxioms AI anything…</span>
                    <div className="wf-prompt-row">
                      <span className="wf-prompt-btn" aria-hidden="true">
                        <FiPlus />
                      </span>
                      <span className="wf-prompt-btn" aria-hidden="true">
                        <FiTool /> Tools
                      </span>
                      <span className="wf-prompt-spacer" />
                      <span className="wf-prompt-btn" aria-hidden="true">
                        <FiMic />
                      </span>
                      <span className="wf-prompt-btn is-solid" aria-hidden="true">
                        <FiSend />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        <span className="wf-rail wf-rail-right" aria-hidden="true">
          <i className="wf-rail-line" />
          <span className="wf-host">Host</span>
          <i className="wf-rail-line" />
        </span>

        {/* Positioned against .wf-shell so it can travel from the canvas to the
            sidebar toggles. A spring, so it arrives with a little settle rather
            than snapping to a stop. */}
        <motion.span
          className={`wf-cursor${clicking ? ' is-clicking' : ''}`}
          aria-hidden="true"
          initial={false}
          animate={{ left: `${target.left}%`, top: `${target.top}%` }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 55, damping: 16, mass: 1 }
          }
        >
          <svg viewBox="0 0 12 16">
            <path d="M1 1 L11 8 L6 9 L4.5 14 Z" />
          </svg>
          <em>You</em>
        </motion.span>
      </div>
    </section>
  );
};

export default WorkflowShowcase;
