import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = forwardRef(
  (
    {
      width = 500,
      height = 400,
      cardDistance = 60,
      verticalDistance = 60,
      delay = 5000,
      autoPlay = true,
      pauseOnHover = false,
      onCardClick,
      skewAmount = 6,
      easing = 'elastic',
      children
    },
    ref
  ) => {
    const config =
      easing === 'elastic'
        ? {
            ease: 'elastic.out(0.6,0.9)',
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05
          }
        : {
            ease: 'power1.inOut',
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2
          };

    const childArr = useMemo(() => Children.toArray(children), [children]);
    const refs = useMemo(
      () => childArr.map(() => React.createRef()),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [childArr.length]
    );

    const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

    const tlRef = useRef(null);
    const intervalRef = useRef();
    const container = useRef(null);

    const settle = () => {
      const total = refs.length;
      order.current.forEach((childIdx, pos) => {
        const slot = makeSlot(pos, cardDistance, verticalDistance, total);
        gsap.set(refs[childIdx].current, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          zIndex: slot.zIndex
        });
      });
    };

    const goTo = (direction) => {
      const total = refs.length;
      if (total < 2) return;

      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
        settle();
      }

      if (direction > 0) {
        const [front, ...rest] = order.current;
        const elFront = refs[front].current;
        order.current = [...rest, front];
        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.to(elFront, {
          y: '+=500',
          duration: config.durDrop,
          ease: config.ease
        });

        tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
        rest.forEach((idx, i) => {
          const el = refs[idx].current;
          const slot = makeSlot(i, cardDistance, verticalDistance, total);
          tl.set(el, { zIndex: slot.zIndex }, 'promote');
          tl.to(
            el,
            {
              x: slot.x,
              y: slot.y,
              z: slot.z,
              duration: config.durMove,
              ease: config.ease
            },
            `promote+=${i * 0.15}`
          );
        });

        const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
        tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
        tl.call(
          () => {
            gsap.set(elFront, { zIndex: backSlot.zIndex });
          },
          undefined,
          'return'
        );
        tl.to(
          elFront,
          {
            x: backSlot.x,
            y: backSlot.y,
            z: backSlot.z,
            duration: config.durReturn,
            ease: config.ease
          },
          'return'
        );
      } else {
        const back = order.current[total - 1];
        const rest = order.current.slice(0, total - 1);
        const elBack = refs[back].current;
        order.current = [back, ...rest];
        const frontSlot = makeSlot(0, cardDistance, verticalDistance, total);
        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
        tl.set(elBack, { zIndex: frontSlot.zIndex }, 'promote');
        tl.to(
          elBack,
          {
            x: frontSlot.x,
            y: frontSlot.y,
            z: frontSlot.z,
            duration: config.durMove,
            ease: config.ease
          },
          'promote'
        );

        rest.forEach((idx, i) => {
          const el = refs[idx].current;
          const slot = makeSlot(i + 1, cardDistance, verticalDistance, total);
          tl.set(el, { zIndex: slot.zIndex }, 'promote');
          tl.to(
            el,
            {
              x: slot.x,
              y: slot.y,
              z: slot.z,
              duration: config.durMove,
              ease: config.ease
            },
            `promote+=${i * 0.15}`
          );
        });
      }
    };

    useImperativeHandle(ref, () => ({
      next: () => goTo(1),
      prev: () => goTo(-1)
    }));

    useEffect(() => {
      const total = refs.length;

      tlRef.current?.kill();
      tlRef.current = null;

      order.current.forEach((childIdx, pos) =>
        placeNow(
          refs[childIdx].current,
          makeSlot(pos, cardDistance, verticalDistance, total),
          skewAmount
        )
      );

      if (!autoPlay) return;

      const swap = () => goTo(1);
      intervalRef.current = window.setInterval(swap, delay);

      if (pauseOnHover) {
        const node = container.current;
        if (!node) return;
        const pause = () => {
          tlRef.current?.pause();
          clearInterval(intervalRef.current);
        };
        const resume = () => {
          tlRef.current?.play();
          intervalRef.current = window.setInterval(swap, delay);
        };
        node.addEventListener('mouseenter', pause);
        node.addEventListener('mouseleave', resume);
        return () => {
          node.removeEventListener('mouseenter', pause);
          node.removeEventListener('mouseleave', resume);
          clearInterval(intervalRef.current);
        };
      }
      return () => clearInterval(intervalRef.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardDistance, verticalDistance, delay, autoPlay, pauseOnHover, skewAmount, easing]);

    const rendered = childArr.map((child, i) =>
      isValidElement(child)
        ? cloneElement(child, {
            key: i,
            ref: refs[i],
            style: { width, height, ...(child.props.style ?? {}) },
            onClick: e => {
              child.props.onClick?.(e);
              onCardClick?.(i);
            }
          })
        : child
    );

    return (
      <div ref={container} className="card-swap-container" style={{ width, height }}>
        {rendered}
      </div>
    );
  }
);

export default CardSwap;