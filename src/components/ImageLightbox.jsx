import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/* ═══════════════════════════════════════════
   LIGHTBOX CONTEXT
   ═══════════════════════════════════════════ */

const LightboxContext = createContext(null);

export function useImageLightbox() {
  return useContext(LightboxContext);
}

/* ═══════════════════════════════════════════
   LIGHTBOX PROVIDER + MODAL
   ═══════════════════════════════════════════ */

export function ImageLightboxProvider({ children }) {
  const [image, setImage] = useState(null); // { src, alt }
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const openLightbox = useCallback((src, alt) => {
    setImage({ src, alt: alt || '' });
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const closeLightbox = useCallback(() => {
    setImage(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(s + 0.5, 5));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => {
      const next = Math.max(s - 0.5, 0.5);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  /* Escape key */
  useEffect(() => {
    if (!image) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [image, closeLightbox]);

  /* Mouse wheel zoom */
  useEffect(() => {
    if (!image) return;
    const handler = (e) => {
      e.preventDefault();
      setScale((s) => {
        const delta = e.deltaY > 0 ? -0.2 : 0.2;
        const next = Math.min(Math.max(s + delta, 0.5), 5);
        if (next <= 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    };
    window.addEventListener('wheel', handler, { passive: false });
    return () => window.removeEventListener('wheel', handler);
  }, [image]);

  /* Lock body scroll when open */
  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [image]);

  /* Drag / pan handlers */
  const handlePointerDown = useCallback((e) => {
    if (scale <= 1) return;
    e.preventDefault();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...position };
  }, [scale, position]);

  const handlePointerMove = useCallback((e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPosition({
      x: posStart.current.x + dx,
      y: posStart.current.y + dy,
    });
  }, [dragging]);

  const handlePointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  /* Attach pointer move/up to window so drag works outside the image */
  useEffect(() => {
    if (!dragging) return;
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragging, handlePointerMove, handlePointerUp]);

  return (
    <LightboxContext.Provider value={openLightbox}>
      {children}

      <AnimatePresence>
        {image && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isDark ? 'rgba(3,3,3,0.92)' : 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className={`absolute top-4 right-4 z-[10000] flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white/80'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Zoom controls */}
            <div
              className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-md ${
                isDark
                  ? 'bg-dark-800/80 border border-white/10'
                  : 'bg-white/20 border border-white/20'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={zoomOut}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-white/20 text-white'
                }`}
                aria-label="Zoom out"
              >
                <ZoomOut size={16} />
              </button>
              <span className={`text-xs font-medium min-w-[3rem] text-center select-none ${
                isDark ? 'text-white/50' : 'text-white/80'
              }`}>
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-white/20 text-white'
                }`}
                aria-label="Zoom in"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            {/* Image — wrapper handles enter/exit animation, img handles zoom/pan */}
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="lightbox-image"
                draggable={false}
                onPointerDown={handlePointerDown}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                  transition: dragging ? 'none' : 'transform 0.2s ease',
                  cursor: scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
                  userSelect: 'none',
                  touchAction: 'none',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}

/* ═══════════════════════════════════════════
   CLICKABLE IMAGE WRAPPER
   ═══════════════════════════════════════════ */

export function ZoomableImage({ src, alt, className, style, loading, ...rest }) {
  const openLightbox = useImageLightbox();

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (openLightbox) openLightbox(src, alt);
    },
    [openLightbox, src, alt]
  );

  return (
    <img
      src={src}
      alt={alt}
      className={`${className || ''} cursor-pointer`}
      style={style}
      loading={loading}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      }}
      {...rest}
    />
  );
}
