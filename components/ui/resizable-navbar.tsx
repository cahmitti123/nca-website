"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

import React, { useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Link from "next/link";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("sticky inset-x-0 top-20 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, {
              visible: reduceMotion ? true : visible,
            })
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: "100%",
        y: visible ? 12 : 0,
      }}
      transition={{
        ...(reduceMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 200,
              damping: 50,
            }),
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-6xl flex-row items-center justify-between self-start rounded-full border border-transparent bg-transparent px-3 py-2 lg:flex",
        visible &&
          "border-border/60 bg-background/70 supports-[backdrop-filter]:bg-background/50",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-muted/60"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 12 : 0,
      }}
      transition={{
        ...(reduceMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 200,
              damping: 50,
            }),
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between border border-transparent bg-transparent px-0 py-2 lg:hidden",
        visible &&
          "border-border/60 bg-background/70 supports-[backdrop-filter]:bg-background/50",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    onClose();
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg border bg-background/95 px-4 py-6 shadow-sm supports-[backdrop-filter]:bg-background/80",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-md p-1.5 text-foreground hover:bg-muted/50"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? (
        <IconX className="text-black dark:text-white" />
      ) : (
        <IconMenu2 className="text-black dark:text-white" />
      )}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center gap-2 px-2 py-1 text-sm font-medium tracking-tight text-foreground"
    >
      <span className="inline-flex size-7 items-center justify-center rounded-md border bg-background/70 text-xs">
        NCA
      </span>
      <span className="hidden sm:inline">Net Courtage Assurances</span>
    </Link>
  );
};

type NavbarButtonProps =
  | ({
      as?: "a";
      href: string;
      children: React.ReactNode;
      className?: string;
      variant?: "primary" | "secondary" | "dark" | "gradient";
    } & React.ComponentPropsWithoutRef<"a">)
  | ({
      as: "button";
      href?: never;
      children: React.ReactNode;
      className?: string;
      variant?: "primary" | "secondary" | "dark" | "gradient";
    } & React.ComponentPropsWithoutRef<"button">);

export const NavbarButton = (props: NavbarButtonProps) => {
  const { as = "a", children, className, variant = "primary", ...rest } = props;
  const baseStyles =
    "px-3 py-2 rounded-md text-sm font-medium relative cursor-pointer transition-colors duration-200 inline-flex items-center justify-center border bg-background hover:bg-muted/50";

  const variantStyles = {
    primary: "text-foreground",
    secondary: "border-transparent bg-transparent hover:bg-muted/50",
    dark: "bg-foreground text-background hover:bg-foreground/90",
    gradient: "bg-foreground text-background hover:bg-foreground/90",
  };

  const mergedClassName = cn(baseStyles, variantStyles[variant], className);

  if (as === "button") {
    return (
      <button
        type="button"
        className={mergedClassName}
        {...(rest as React.ComponentPropsWithoutRef<"button">)}
      >
        {children}
      </button>
    );
  }

  const { href, ...anchorRest } = rest as React.ComponentPropsWithoutRef<"a"> & {
    href: string;
  };
  return (
    <a href={href} className={mergedClassName} {...anchorRest}>
      {children}
    </a>
  );
};
