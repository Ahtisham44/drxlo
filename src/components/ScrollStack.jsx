import { useLayoutEffect, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { useLenis } from '@/context/LenisContext';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '', itemStyle = {} }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} style={itemStyle}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 1,
  rotationAmount = 0,
  blurAmount = 2,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const endElementRef = useRef(null);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  // Cached un-transformed document offsets for every card + the end spacer.
  // Reading them is pure arithmetic — no getBoundingClientRect() per frame.
  const layoutRef = useRef({ offsets: [], endOffset: 0 });
  const lenis = useLenis();

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  // Read each card's UN-TRANSFORMED document offset once and cache it. Cards
  // only move via our own translate3d, so these offsets are constant until the
  // layout changes (resize). Caching removes the per-frame getBoundingClientRect()
  // calls that previously forced a synchronous reflow for every card on every
  // frame while the stack was near the viewport.
  const measureLayout = useCallback(() => {
    const stripTranslateY = (element) => {
      const transform = element?.style.transform || '';
      const match = transform.match(/translate3d\(0px, ([-\d.]+)px/);
      return match ? parseFloat(match[1]) : 0;
    };

    const offsets = cardsRef.current.map((card) => {
      if (!card) return 0;
      const rect = card.getBoundingClientRect();
      return rect.top + window.scrollY - stripTranslateY(card);
    });

    const end = endElementRef.current;
    const endOffset = end
      ? end.getBoundingClientRect().top + window.scrollY - stripTranslateY(end)
      : 0;

    layoutRef.current = { offsets, endOffset };
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const staticStackPositionPx = parsePercentage(stackPosition, containerHeight);
    const { offsets, endOffset: endElementTop } = layoutRef.current;
    const pinEnd = endElementTop - containerHeight / 2;

    // First pass: determine which cards are pinned (using static stackPosition for trigger calc)
    const isPinnedArr = cardsRef.current.map((card, i) => {
      if (!card) return false;
      const cardTop = offsets[i];
      const triggerStart = cardTop - staticStackPositionPx - itemStackDistance * i;
      return scrollTop >= triggerStart && scrollTop <= endElementTop - containerHeight / 2;
    });

    const pinnedCount = isPinnedArr.filter(Boolean).length;

    // Dynamic stackPosition: shift upward so fan bottom stays at ~85vh
    // Estimate fan height: sum of (cardHeight * targetScale) + (pinnedCount-1)*itemStackDistance
    let fanHeight = 0;
    if (pinnedCount > 0) {
      let totalHeight = 0;
      for (let i = 0; i < cardsRef.current.length; i++) {
        if (!isPinnedArr[i]) break;
        const targetScale = baseScale + i * itemScale;
        // Card layout height is 90vh (810px at 900px viewport)
        const cardLayoutHeight = containerHeight * 0.9; // 90vh
        totalHeight += cardLayoutHeight * targetScale;
      }
      fanHeight = totalHeight + (pinnedCount - 1) * itemStackDistance;
    }

    // Target: keep fan bottom at ~85% of viewport
    const targetBottom = containerHeight * 0.85;
    const dynamicStackPositionPx = Math.max(
      containerHeight * 0.06, // floor: 6% from top
      Math.min(
        staticStackPositionPx,
        targetBottom - fanHeight
      )
    );

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = offsets[i];
      const triggerStart = cardTop - dynamicStackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - dynamicStackPositionPx - itemStackDistance * i;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = offsets[j];
          const jTriggerStart = jCardTop - dynamicStackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + dynamicStackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + dynamicStackPositionPx + itemStackDistance * i;
      }

      // Z-index: approaching in front (z=100), then joins stack when pinned
      const newZ = isPinned || scrollTop > pinEnd ? 10 + i : 100;
      if (card.style.zIndex !== String(newZ)) {
        card.style.zIndex = String(newZ);
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );

    cardsRef.current = cards;
    endElementRef.current = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scroller.querySelector('.scroll-stack-end');
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    measureLayout();
    updateCardTransforms();

    let cleanupInternal;
    if (!useWindowScroll) {
      // Internal-scroller mode owns its own Lenis instance.
      const internalLenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      const handleScroll = () => updateCardTransforms();
      internalLenis.on('scroll', handleScroll);

      const raf = time => {
        internalLenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = internalLenis;
      cleanupInternal = () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        internalLenis.destroy();
      };
    }

    return () => {
      cleanupInternal?.();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      endElementRef.current = null;
      transformsCache.clear();
      isUpdatingRef.current = false;
      layoutRef.current = { offsets: [], endOffset: 0 };
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    measureLayout,
    updateCardTransforms
  ]);

  // Window-scroll mode: the global Lenis already owns window scroll. Drive card
  // updates straight off its scroll events (plus a passive native listener as a
  // fallback) instead of a perpetual requestAnimationFrame polling loop. That
  // means zero work while the page is idle, and updates are aligned exactly to
  // the scroll, eliminating the duplicate layout pass that caused jank.
  useEffect(() => {
    if (!useWindowScroll) return;

    const onScroll = () => updateCardTransforms();
    const onResize = () => {
      measureLayout();
      updateCardTransforms();
    };

    lenis?.on('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      lenis?.off('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [useWindowScroll, lenis, updateCardTransforms, measureLayout]);

  return (
    <div
      className={`scroll-stack-scroller ${
        useWindowScroll ? 'scroll-stack-scroller--window' : ''
      } ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
