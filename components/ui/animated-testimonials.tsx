"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { useCallback, useEffect, useState } from "react";
import Image, { type ImageLoaderProps } from "next/image";
import { cn } from "@/lib/utils";

const passthroughLoader = ({ src }: ImageLoaderProps) => src;

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const reduceMotion = useReducedMotion();
  const count = testimonials.length;
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (count === 0 ? 0 : (prev + 1) % count));
  }, [count]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (count === 0 ? 0 : (prev - 1 + count) % count));
  }, [count]);

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (!reduceMotion && autoplay && count > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [reduceMotion, autoplay, count, handleNext]);

  const rotateForIndex = (index: number) => ((index * 7) % 21) - 10;

  if (count === 0) return null;
  return (
    <div className={cn("mx-auto w-full max-w-5xl", className)}>
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotateForIndex(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotateForIndex(index),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotateForIndex(index),
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.35,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    loader={passthroughLoader}
                    unoptimized
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={reduceMotion ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: -12, opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-base font-semibold tracking-tight">{testimonials[active].name}</h3>
            <p className="text-muted-foreground text-xs">{testimonials[active].designation}</p>

            {reduceMotion ? (
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                {testimonials[active].quote}
              </p>
            ) : (
              <motion.p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    initial={{ opacity: 0, y: 4, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.18,
                      ease: "easeInOut",
                      delay: 0.01 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            )}
          </motion.div>
          <div className="flex gap-2 pt-6 md:pt-0">
            <button
              onClick={handlePrev}
              className="bg-muted/60 text-muted-foreground flex h-9 w-9 items-center justify-center rounded-full border"
              aria-label="Previous testimonial"
            >
              <IconArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="bg-muted/60 text-muted-foreground flex h-9 w-9 items-center justify-center rounded-full border"
              aria-label="Next testimonial"
            >
              <IconArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
