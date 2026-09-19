import React, { useEffect, useRef, useState } from "react"

const RenderTarget = {
    current: () => "preview",
    canvas: "canvas",
    export: "export",
    thumbnail: "thumbnail",
    preview: "preview",
}

const EASE_PRESETS = {
    linear: "linear",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
}

export const DEFAULT_IMAGES = [
    {
        src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/612d1402-0ad9-4135-3bbc-a30a6a252b00/w=800",
    },
    {
        src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/6d2ad64a-102d-4eab-0efe-31479e34b500/w=800",
    },
    {
        src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/51984031-9176-484b-f5e0-4af9a8e9ed00/w=800",
    },
    {
        src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/34ce1842-4b7a-4d52-0302-38582c341700/w=800",
    },
    {
        src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/88369c6d-00cc-4ac9-74ca-0f0965e06300/w=800",
    }
]

function parseTransition(t) {
    const dur = Math.max(0.05, (t && t.duration) || 0.5)
    let ease = "cubic-bezier(0.44, 0, 0.56, 1)"
    if (t && Array.isArray(t.ease) && t.ease.length === 4) {
        ease = `cubic-bezier(${t.ease.join(", ")})`
    } else if (t && typeof t.ease === "string" && EASE_PRESETS[t.ease]) {
        ease = EASE_PRESETS[t.ease]
    } else if (t && t.type === "spring") {
        ease = "cubic-bezier(0.34, 1.56, 0.64, 1)"
    }
    return { dur, ease }
}

const COMPONENT_DEFAULTS = {
    images: DEFAULT_IMAGES,
    collapsedWidth: 100,
    hoverWidth: 200,
    collapsedHeight: 340,
    hoverHeight: 400,
    openSize: 600,
    gap: 16,
    influence: 200,
    blur: 2,
    transition: {
        type: "tween",
        duration: 0.3,
        delay: 0,
        ease: "easeInOut",
    },
}

function __OriginkitBase_MagneticCarousel(props) {
    props = { ...COMPONENT_DEFAULTS, ...props }
    const {
        images = DEFAULT_IMAGES,
        collapsedWidth = 100,
        hoverWidth = 200,
        collapsedHeight = 340,
        hoverHeight = 400,
        openSize = 600,
        gap = 16,
        influence = 200,
        blur = 2,
        transition = { type: "tween", duration: 0.3, ease: "easeInOut" },
        style = {},
    } = props

    const items =
        Array.isArray(images) && images.length > 0 ? images : DEFAULT_IMAGES
    const count = items.length

    const containerRef = useRef(null)
    const [factors, setFactors] = useState(() => items.map(() => 0))
    const [open, setOpen] = useState(null)
    const [closing, setClosing] = useState(false)

    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    const targetRef = useRef(items.map(() => 0))
    const curRef = useRef(items.map(() => 0))
    const loopRef = useRef(0)
    const closeTimer = useRef(0)

    useEffect(() => {
        targetRef.current = items.map(() => 0)
        curRef.current = items.map(() => 0)
        setFactors(items.map(() => 0))
    }, [count])

    useEffect(
        () => () => {
            cancelAnimationFrame(loopRef.current)
            clearTimeout(closeTimer.current)
        },
        []
    )

    const startLoop = () => {
        if (loopRef.current) return
        const step = () => {
            const tgt = targetRef.current
            const cur = curRef.current
            let moving = false
            for (let i = 0; i < cur.length; i++) {
                const d = (tgt[i] ?? 0) - cur[i]
                if (Math.abs(d) > 0.001) {
                    cur[i] += d * 0.2
                    moving = true
                } else {
                    cur[i] = tgt[i] ?? 0
                }
            }
            setFactors([...cur])
            loopRef.current = moving ? requestAnimationFrame(step) : 0
        }
        loopRef.current = requestAnimationFrame(step)
    }

    const setTargetFromCursor = (clientX) => {
        const el = containerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = clientX - rect.left
        const n = items.length

        const totalBase = n * collapsedWidth + (n - 1) * gap
        const startX = (rect.width - totalBase) / 2
        targetRef.current = items.map((_, i) => {
            const center =
                startX + i * (collapsedWidth + gap) + collapsedWidth / 2
            const dist = Math.abs(cx - center)
            const f = Math.max(0, 1 - dist / influence)
            return f * f * (3 - 2 * f)
        })
        startLoop()
    }

    const onMove = (e) => {
        if (isCanvas || open !== null) return
        setTargetFromCursor(e.clientX)
    }

    const onLeave = () => {
        if (open !== null) return
        targetRef.current = items.map(() => 0)
        startLoop()
    }

    const close = () => {
        targetRef.current = items.map(() => 0)
        curRef.current = items.map(() => 0)
        setFactors(items.map(() => 0))
        setClosing(true)
        clearTimeout(closeTimer.current)
        closeTimer.current = setTimeout(() => setClosing(false), dur * 1000)
        setOpen(null)
    }

    const sizeFor = (i) => {
        if (open !== null) {
            return i === open
                ? { width: openSize, height: openSize }
                : { width: collapsedWidth, height: collapsedHeight }
        }
        const f = factors[i] ?? 0
        return {
            width: collapsedWidth + (hoverWidth - collapsedWidth) * f,
            height: collapsedHeight + (hoverHeight - collapsedHeight) * f,
        }
    }

    const { dur, ease } = parseTransition(transition)

    const openEase = `width ${dur}s ${ease}, height ${dur}s ${ease}, filter ${dur}s ${ease}, opacity ${dur}s ${ease}`
    const barTransition = open !== null || closing ? openEase : "none"

    return (
        <div
            ref={containerRef}
            style={{
                style: {
                ...style,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap,
                position: "relative",
                overflow: "hidden",
                borderRadius: typeof rounded === 'number' ? `${rounded}px` : rounded,
            },
            }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
        >
            {}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: open !== null ? "auto" : "none",
                }}
                onClick={close}
            />
            {items.map((img, i) => {
                const { width, height } = sizeFor(i)
                const blurred = open !== null && i !== open
                const isVideo = img && img.src && (img.src.endsWith('.mp4') || img.src.endsWith('.webm') || img.type === 'video')
                
                return (
                    <div
                        key={i}
                        onClick={(e) => {
                            if (isCanvas) return
                            e.stopPropagation()
                            if (open === i) close()
                            else setOpen(i)
                        }}
                        style={{
                            flex: "none",
                            width,
                            height: "100%",
                            overflow: "hidden",
                            cursor: isCanvas ? "default" : "pointer",
                            transition: barTransition,
                            willChange: "width, height",
                            position: "relative",
                            zIndex: open === i ? 3 : 2,
                            filter: blurred ? `blur(${blur}px)` : "none",
                            opacity: blurred ? 0.6 : 1,
                            backgroundColor: img
                                ? "transparent"
                                : `hsl(${(i * 360) / count}, 70%, 58%)`,
                            backgroundImage: !isVideo && img
                                ? `url(${img.src})`
                                : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        {isVideo && (
                            <video
                                src={img.src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    pointerEvents: "none"
                                }}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

__OriginkitBase_MagneticCarousel.displayName = "Magnetic Carousel"

const __originkitPresetProps = {
  "images": [
    {
      "src": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop"
    },
    {
      "src": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop"
    },
    {
      "src": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2000&auto=format&fit=crop"
    },
    {
      "src": "https://images.unsplash.com/photo-1512496015851-a1cbfc38d011?q=80&w=2000&auto=format&fit=crop"
    },
    {
      "src": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2000&auto=format&fit=crop"
    }
  ],
  "openSize": 800,
  "collapsedWidth": 150,
  "hoverWidth": 300,
  "gap": 0,
  "blur": 4,
};

export default function MagneticCarousel(props) {
  return <__OriginkitBase_MagneticCarousel {...__originkitPresetProps} {...props} />;
}
