
"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";

const TOP_WORD = "PEDDISHETTI";
const BOTTOM_WORD = ["S", "U", "R", "Y", "A"];

function makeCubicBezier(mX1: number, mY1: number, mX2: number, mY2: number) {
  const NEWTON_ITERATIONS = 4;
  const NEWTON_MIN_SLOPE = 0.001;
  const SUBDIVISION_PRECISION = 1e-7;
  const SUBDIVISION_MAX_ITERATIONS = 10;
  const kSplineTableSize = 11;
  const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  const float32ArraySupported = typeof Float32Array === "function";
  const sampleValues = float32ArraySupported
    ? new Float32Array(kSplineTableSize)
    : new Array<number>(kSplineTableSize);

  if (mX1 === mY1 && mX2 === mY2) {
    return (x: number) => x;
  }

  function A(aA1: number, aA2: number) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
  }

  function B(aA1: number, aA2: number) {
    return 3.0 * aA2 - 6.0 * aA1;
  }

  function C(aA1: number) {
    return 3.0 * aA1;
  }

  function calcBezier(aT: number, aA1: number, aA2: number) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }

  function getSlope(aT: number, aA1: number, aA2: number) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  for (let i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function binarySubdivide(aX: number, aA: number, aB: number) {
    let currentX: number;
    let currentT: number;
    let i = 0;

    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

    return currentT;
  }

  function newtonRaphsonIterate(aX: number, aGuessT: number) {
    for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
      const currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) return aGuessT;
      const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  function getTForX(aX: number) {
    let intervalStart = 0.0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    const dist = (aX - sampleValues[currentSample]) /
      (sampleValues[currentSample + 1] - sampleValues[currentSample]);

    const guessForT = intervalStart + dist * kSampleStepSize;
    const initialSlope = getSlope(guessForT, mX1, mX2);

    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT);
    }
    if (initialSlope === 0.0) {
      return guessForT;
    }
    return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
  }

  return function bezierEasing(x: number) {
    if (x === 0 || x === 1) return x;
    return calcBezier(getTForX(x), mY1, mY2);
  };
}

const premiumEase = makeCubicBezier(0.16, 1, 0.3, 1);

export default function HeroReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const topRowRef = useRef<HTMLDivElement | null>(null);
  const bottomRowRef = useRef<HTMLDivElement | null>(null);
  const walkerMotionRef = useRef<HTMLDivElement | null>(null);
  const stemRef = useRef<SVGLineElement | null>(null);
  const backLegRef = useRef<SVGLineElement | null>(null);
  const crossbarRef = useRef<SVGLineElement | null>(null);
  const topLetterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bottomLetterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const glowId = useId().replace(/:/g, "");

  useEffect(() => {
    const section = sectionRef.current;
    const walker = walkerMotionRef.current;
    const row = bottomRowRef.current;

    if (!section || !walker || !row) return;

    const topLetters = topLetterRefs.current.filter(Boolean) as HTMLSpanElement[];
    const bottomLetters = bottomLetterRefs.current.filter(Boolean) as HTMLSpanElement[];
    const stem = stemRef.current;
    const backLeg = backLegRef.current;
    const crossbar = crossbarRef.current;

    if (!stem || !backLeg || !crossbar) return;

    const prepareLine = (line: SVGLineElement) => {
      const length = line.getTotalLength();
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
        autoAlpha: 0,
      });
      return length;
    };

    const stemLength = prepareLine(stem);
    const backLegLength = prepareLine(backLeg);
    const crossbarLength = prepareLine(crossbar);

    const measureTargets = () => {
      const rowRect = row.getBoundingClientRect();
      const walkerRect = walker.getBoundingClientRect();
      return bottomLetters.map((letter) => {
        const rect = letter.getBoundingClientRect();
        return rect.left - rowRect.left + rect.width / 2 - walkerRect.width / 2;
      });
    };

    const positions = measureTargets();
    if (positions.length < 5) return;

    const setInitialState = () => {
      gsap.set(topRowRef.current, { autoAlpha: 0, y: 30 });
      gsap.set(topLetters, { autoAlpha: 0, y: 16, x: 12 });
      gsap.set(bottomLetters, { autoAlpha: 0, y: 16, x: 12 });

      gsap.set(walker, {
        x: positions[0],
        y: 0,
        rotateY: 0,
        scaleX: 1,
        transformOrigin: "50% 50%",
        transformStyle: "preserve-3d",
        willChange: "transform",
        backfaceVisibility: "hidden",
      });

      gsap.set(stem, { attr: { x1: 60, y1: 18, x2: 60, y2: 84 }, autoAlpha: 1 });
      gsap.set(backLeg, { attr: { x1: 60, y1: 84, x2: 84, y2: 104 }, autoAlpha: 0 });
      gsap.set(crossbar, {
        attr: { x1: 46, y1: 56, x2: 74, y2: 56 },
        autoAlpha: 0,
        strokeDasharray: crossbarLength,
        strokeDashoffset: crossbarLength,
      });
    };

    setInitialState();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      gsap.set(bottomLetters, { autoAlpha: 1, x: 0, y: 0 });
      gsap.set(topRowRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(walker, { x: positions[4], rotateY: 0, scaleX: 1 });
      gsap.set(stem, { attr: { x1: 38, y1: 84, x2: 60, y2: 18 }, autoAlpha: 1, strokeDasharray: "none", strokeDashoffset: 0 });
      gsap.set(backLeg, { attr: { x1: 60, y1: 18, x2: 82, y2: 84 }, autoAlpha: 1, strokeDasharray: "none", strokeDashoffset: 0 });
      gsap.set(crossbar, { autoAlpha: 1, strokeDasharray: "none", strokeDashoffset: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: premiumEase } });

    const revealLetter = (index: number, at: string | number) => {
      tl.to(
        bottomLetters[index],
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.28,
        },
        at
      );
    };

    const moveWalker = (index: number, at: string | number, duration = 0.38) => {
      tl.to(
        walker,
        {
          x: positions[index],
          duration,
        },
        at
      );
    };

    tl.to(stem, { strokeDashoffset: 0, duration: 0.34 }, 0)
      .to(backLeg, { autoAlpha: 1, strokeDashoffset: 0, duration: 0.28 }, 0.16)
      .to(stem, { strokeDasharray: "none", strokeDashoffset: 0, duration: 0.01 }, 0.38)
      .to(backLeg, { strokeDasharray: "none", strokeDashoffset: 0, duration: 0.01 }, 0.38);

    revealLetter(0, 0.34);
    moveWalker(1, 0.52);
    revealLetter(1, 0.84);
    moveWalker(2, 0.94);
    revealLetter(2, 1.26);
    moveWalker(3, 1.36);
    revealLetter(3, 1.68);
    moveWalker(4, 1.82, 0.42);

    tl.to(
      walker,
      {
        rotateY: 86,
        scaleX: 0.24,
        duration: 0.2,
      },
      2.12
    )
      .to(
        stem,
        {
          attr: { x1: 38, y1: 84, x2: 60, y2: 18 },
          duration: 0.22,
        },
        2.2
      )
      .to(
        backLeg,
        {
          attr: { x1: 60, y1: 18, x2: 82, y2: 84 },
          duration: 0.22,
        },
        2.2
      )
      .to(
        crossbar,
        {
          autoAlpha: 1,
          strokeDashoffset: 0,
          duration: 0.22,
        },
        2.26
      )
      .to(
        walker,
        {
          rotateY: 0,
          scaleX: 1,
          duration: 0.34,
        },
        2.32
      )
      .to(
        bottomLetters[4],
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.3,
        },
        2.35
      )
      .to(
        topRowRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
        },
        2.5
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden bg-white text-gray-900 antialiased"
      aria-label="Hero reveal animation"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[min(92vw,1100px)] flex-col items-start justify-center px-6 py-16 sm:px-10">
        <div
          ref={topRowRef}
          className="mb-[0.08em] flex w-full items-end justify-between leading-none"
          style={{
            fontSize: "clamp(3.35rem, 6.9vw, 4.75rem)",
            letterSpacing: "-0.055em",
            fontWeight: 700,
          }}
        >
          {TOP_WORD.split("").map((char, index) => (
            <span
              key={`top-${char}-${index}`}
              ref={(el) => {
                topLetterRefs.current[index] = el;
              }}
              className="select-none"
              style={{ willChange: "transform, opacity" }}
            >
              {char}
            </span>
          ))}
        </div>

        <div
          ref={bottomRowRef}
          className="relative flex w-full items-end justify-between leading-none"
          style={{
            fontSize: "clamp(2rem, 4.15vw, 2.7rem)",
            letterSpacing: "0.24em",
            fontWeight: 500,
            paddingTop: "0.08em",
            minHeight: "clamp(4.5rem, 7vw, 5.75rem)",
          }}
        >
          <div
            className="pointer-events-none absolute left-0 top-1/2 z-20"
            style={{ transform: "translateY(-50%)" }}
          >
            <div
              ref={walkerMotionRef}
              className="h-[clamp(5rem,8vw,7rem)] w-[clamp(5rem,8vw,7rem)]"
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
            >
              <svg
                viewBox="0 0 120 120"
                className="h-full w-full overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  <filter
                    id={glowId}
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="160%"
                    filterUnits="objectBoundingBox"
                  >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="1 0 0 0 0
                              0 0.45 0 0 0
                              0 0 0.1 0 0
                              0 0 0 0.9 0"
                      result="orangeGlow"
                    />
                    <feMerge>
                      <feMergeNode in="orangeGlow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g filter={`url(#${glowId})`} shapeRendering="geometricPrecision">
                  <line
                    ref={stemRef}
                    x1="60"
                    y1="18"
                    x2="60"
                    y2="84"
                    stroke="#ea580c"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <line
                    ref={backLegRef}
                    x1="60"
                    y1="84"
                    x2="84"
                    y2="104"
                    stroke="#ea580c"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <line
                    ref={crossbarRef}
                    x1="46"
                    y1="56"
                    x2="74"
                    y2="56"
                    stroke="#ea580c"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </svg>
            </div>
          </div>

          {BOTTOM_WORD.map((char, index) => (
            <span
              key={`bottom-${char}-${index}`}
              ref={(el) => {
                bottomLetterRefs.current[index] = el;
              }}
              className="select-none text-gray-900"
              style={{ willChange: "transform, opacity" }}
            >
              {char}
            </span>
          ))}
        </div>

        <p className="sr-only">PEDDISHETTI SURYA</p>
      </div>
    </section>
  );
                         }
