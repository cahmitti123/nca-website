"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Tooltip = ({
  content,
  children,
  containerClassName,
}: {
  content: string | React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
}) => {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const lastPointerRef = useRef<{ clientX: number; clientY: number } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  const calculatePosition = React.useCallback((clientX: number, clientY: number) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get tooltip dimensions
    const tooltipWidth = 240; // min-w-[15rem] = 240px
    const tooltipHeight = contentRef.current?.scrollHeight ?? 0;

    let finalX = clientX + 12;
    let finalY = clientY + 12;

    // Check if tooltip goes beyond right edge
    if (finalX + tooltipWidth > viewportWidth) {
      finalX = clientX - tooltipWidth - 12;
    }

    // Check if tooltip goes beyond left edge
    if (finalX < 0) {
      finalX = 12;
    }

    // Check if tooltip goes beyond bottom edge
    if (tooltipHeight && finalY + tooltipHeight > viewportHeight) {
      finalY = clientY - tooltipHeight - 12;
    }

    // Check if tooltip goes beyond top edge
    if (finalY < 0) {
      finalY = 12;
    }

    return { x: finalX, y: finalY };
  }, []);

  const updatePointerPosition = React.useCallback((clientX: number, clientY: number) => {
    lastPointerRef.current = { clientX, clientY };
    setPosition(calculatePosition(clientX, clientY));
  }, [calculatePosition]);

  useEffect(() => {
    if (isVisible && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
      if (lastPointerRef.current) {
        const { clientX, clientY } = lastPointerRef.current;
        setPosition(calculatePosition(clientX, clientY));
      }
    }
  }, [calculatePosition, content, isVisible]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    setIsVisible(true);
    updatePointerPosition(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsVisible(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!isVisible) return;
    updatePointerPosition(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLSpanElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    updatePointerPosition(touch.clientX, touch.clientY);
    setIsVisible(true);
  };

  const handleTouchEnd = () => {
    // Delay hiding to allow for tap interaction
    setTimeout(() => {
      setIsVisible(false);
      setPosition({ x: 0, y: 0 });
    }, 2000);
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    // Toggle visibility on click for mobile devices
    if (window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      if (isVisible) {
        setIsVisible(false);
        setPosition({ x: 0, y: 0 });
      } else {
        updatePointerPosition(e.clientX, e.clientY);
        setIsVisible(true);
      }
    }
  };

  const portalRoot = typeof document !== "undefined" ? document.body : null;

  return (
    <span
      ref={containerRef}
      className={cn("relative inline-block", containerClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {children}
      {portalRoot
        ? createPortal(
            <AnimatePresence>
              {isVisible && (
                <motion.div
                  key="tooltip"
                  initial={{ height: 0, opacity: 1 }}
                  animate={{ height, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }
                  }
                  className="pointer-events-none fixed z-50 min-w-60 overflow-hidden rounded-md border border-transparent bg-white shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-900 dark:shadow-white/10 dark:ring-white/5"
                  style={{
                    top: position.y,
                    left: position.x,
                  }}
                >
                  <div
                    ref={contentRef}
                    className="p-2 text-sm text-neutral-600 md:p-4 dark:text-neutral-400"
                  >
                    {content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
            portalRoot,
          )
        : null}
    </span>
  );
};
