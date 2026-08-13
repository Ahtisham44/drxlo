import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
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
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
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

  const getElementOffset = useCallback(
    element => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        // Strip the current translateY from the rect so we always return the
        // card's LAYOUT (un-transformed) document offset. Using the transformed
        // rect here feeds the translate back into its own pin math and makes
        // the cards oscillate instead of holding their stacked position.
        const transform = element.style.transform || '';
        const match = transform.match(/translate3d\(0px, ([-\d.]+)px/);
        const ty = match ? parseFloat(match[1]) : 0;
        return rect.top + window.scrollY - ty;
      } else {
        // offsetTop is layout-based and ignores transforms.
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = endElementRef.current;

    const endElementTop = endElement ? getElementOffset(endElement) : 0;
    const pinEnd = endElementTop - containerHeight / 2;

    // First pass: determine which cards are pinned (using static stackPosition for trigger calc)
    const staticStackPositionPx = parsePercentage(stackPosition, containerHeight);
    const isPinnedArr = cardsRef.current.map((card, i) => {
      if (!card) return false;
      const cardTop = getElementOffset(card);
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

      const cardTop = getElementOffset(card);
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
          const jCardTop = getElementOffset(cardsRef.current[j]);
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
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupScroll = useCallback(() => {
    if (useWindowScroll) {
      // The app already drives window scroll with a global Lenis. Instead of
      // relying on scroll events (which can lag or coalesce mid-animation), we
      // recompute transforms on every animation frame so pinned cards always
      // hold their exact position in the viewport. Only tick while the stack is
      // near the viewport, and skip frames where scroll hasn't moved, so the
      // loop never burns CPU while the user is elsewhere on the page.
      let lastScrollY = window.scrollY;
      let started = false;
      const tick = () => {
        const y = window.scrollY;
        if (y !== lastScrollY) {
          lastScrollY = y;
          updateCardTransforms();
        }
        animationFrameRef.current = requestAnimationFrame(tick);
      };
      const start = () => {
        if (started) return;
        started = true;
        animationFrameRef.current = requestAnimationFrame(tick);
      };
      const stop = () => {
        started = false;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
      const scroller = scrollerRef.current;
      const observer = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { rootMargin: '150% 0px' }
      );
      observer.observe(scroller);
      return () => {
        observer.disconnect();
        stop();
      };
    }

    const scroller = scrollerRef.current;
    if (!scroller) return () => {};

    const lenis = new Lenis({
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

    lenis.on('scroll', handleScroll);

    const raf = time => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      lenis.destroy();
    };
  }, [handleScroll, useWindowScroll]);

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

    const cleanupScroll = setupScroll();

    updateCardTransforms();

    return () => {
      cleanupScroll?.();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      endElementRef.current = null;
      transformsCache.clear();
      isUpdatingRef.current = false;
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
    setupScroll,
    updateCardTransforms
  ]);

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