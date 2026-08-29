import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { gsap } from 'gsap'

import './BubbleMenu.css'

const DEFAULT_ITEMS = [
  {
    label: 'home',
    href: '#home',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' },
  },
  {
    label: 'work',
    href: '#work',
    ariaLabel: 'Work',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' },
  },
  {
    label: 'services',
    href: '#services',
    ariaLabel: 'Services',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' },
  },
  {
    label: 'why us',
    href: '#why',
    ariaLabel: 'Why us',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' },
  },
  {
    label: 'stories',
    href: '#stories',
    ariaLabel: 'Stories',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' },
  },
  {
    label: 'contact',
    href: '#contact',
    ariaLabel: 'Contact',
    rotation: -8,
    hoverStyles: { bgColor: '#14b8a6', textColor: '#ffffff' },
  },
]

export default function BubbleMenu({
  open,
  onClose,
  className,
  style,
  menuBg = '#fff',
  menuContentColor = '#111',
  useFixedPosition = true,
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12,
}) {
  const [showOverlay, setShowOverlay] = useState(false)

  const overlayRef = useRef(null)
  const bubblesRef = useRef([])
  const labelRefs = useRef([])

  const menuItems = items?.length ? items : DEFAULT_ITEMS

  useEffect(() => {
    if (open) setShowOverlay(true)
  }, [open])

  useLayoutEffect(() => {
    const overlay = overlayRef.current
    const bubbles = bubblesRef.current.filter(Boolean)
    const labels = labelRefs.current.filter(Boolean)

    if (!overlay || !bubbles.length) return

    if (open) {
      gsap.set(overlay, { display: 'flex' })
      gsap.killTweensOf([...bubbles, ...labels])

      bubbles.forEach((bubble, i) => {
        const item = menuItems[i]
        gsap.set(bubble, {
          scale: 0,
          rotation: item?.rotation ?? 0,
          transformOrigin: '50% 50%',
        })
      })
      gsap.set(labels, { y: 24, autoAlpha: 0 })

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05)
        const tl = gsap.timeline({ delay })

        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
          force3D: true,
        })
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out',
              force3D: true,
            },
            `-=${animationDuration * 0.9}`,
          )
        }
      })
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels])
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in',
        force3D: true,
      })
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        force3D: true,
        onComplete: () => {
          gsap.set(overlay, { display: 'none' })
          setShowOverlay(false)
        },
      })
    }
  }, [open, showOverlay, menuItems, animationEase, animationDuration, staggerDelay])

  useEffect(() => {
    const handleResize = () => {
      if (!open) return
      const bubbles = bubblesRef.current.filter(Boolean)

      bubbles.forEach((bubble, i) => {
        const item = menuItems[i]
        if (bubble && item) {
          gsap.set(bubble, { rotation: item.rotation ?? 0 })
        }
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [open, menuItems])

  useEffect(() => {
    const bubbles = bubblesRef.current.filter(Boolean)
    const labels = labelRefs.current.filter(Boolean)

    return () => {
      gsap.killTweensOf([...bubbles, ...labels])
    }
  }, [])

  if (!showOverlay) return null

  const containerClassName = [
    'bubble-menu-items',
    useFixedPosition ? 'fixed' : 'absolute',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      id="bubble-menu"
      ref={overlayRef}
      className={containerClassName}
      style={style}
      aria-hidden={!open}
    >
      <div className="bubble-backdrop" aria-hidden="true" onClick={onClose} />
      <ul className="pill-list" role="menu" aria-label="Menu links">
        {menuItems.map((item, idx) => (
          <li key={idx} role="none" className="pill-col">
            <a
              role="menuitem"
              href={item.href}
              aria-label={item.ariaLabel || item.label}
              className="pill-link"
              onClick={() => onClose?.()}
              style={{
                '--item-rot': `${item.rotation ?? 0}deg`,
                '--pill-bg': menuBg,
                '--pill-color': menuContentColor,
                '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                '--hover-color': item.hoverStyles?.textColor || menuContentColor,
              }}
              ref={(el) => {
                if (el) bubblesRef.current[idx] = el
              }}
            >
              <span
                className="pill-label"
                ref={(el) => {
                  if (el) labelRefs.current[idx] = el
                }}
              >
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
