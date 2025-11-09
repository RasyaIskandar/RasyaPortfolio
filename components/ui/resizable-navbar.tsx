"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
// Pastikan utilitas cn sudah terinstal (misalnya menggunakan shadcn/ui)
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";

// --- SVG Filter untuk Efek Liquid Glass ---
// Filter ini tetap sama, hanya tampilannya yang diubah via CSS
const LiquidGlassFilter = () => (
  <svg className="absolute w-0 h-0">
    <defs>
      <filter id="liquid-glass">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01 0.04"
          numOctaves="1"
          result="turbulence"
        >
          <animate
            attributeName="baseFrequency"
            dur="10s"
            values="0.01 0.04;0.02 0.06;0.01 0.04"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" />
        <feGaussianBlur stdDeviation="2" />
      </filter>
    </defs>
  </svg>
);

// --- INTERFACES ---
interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  isScrolled?: boolean;
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
  isScrolled?: boolean;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
}

// ------------------------------------
// --- EXPORTED COMPONENTS ---
// ------------------------------------

// --- 1. MAIN NAV WRAPPER (Nav) ---
export const Nav = ({ children, className }: NavbarProps) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // 50px scroll untuk transisi
    setIsScrolled(latest > 50);
  });

  return (
    <div
      className={cn(
        // PERUBAHAN: Ditambahkan px-6 untuk padding kiri dan kanan
        "fixed inset-x-0 top-0 z-50 w-full px-15",
        className
      )}
    >
      <LiquidGlassFilter />
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ isScrolled?: boolean }>,
              { isScrolled }
            )
          : child
      )}
    </div>
  );
};

// --- 2. DESKTOP NAVBAR BODY (NavBody) - Liquid Glass Putih ---
export const NavBody = ({ children, className, isScrolled }: NavBodyProps) => {
  const variants = {
    atTop: {
      y: 16,
      width: "100%",
      maxWidth: "48rem",
      paddingTop: "12px",
      paddingBottom: "12px",
    },
    scrolled: {
      y: 8,
      width: "auto",
      maxWidth: "100%",
      paddingTop: "8px",
      paddingBottom: "8px",
    },
  };

  return (
    <motion.div
      initial="atTop"
      animate={isScrolled ? "scrolled" : "atTop"}
      variants={variants}
      transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.7 }}
      style={{
        backdropFilter: "url(#liquid-glass)",
        WebkitBackdropFilter: "url(#liquid-glass)",
      }}
      className={cn(
        // PERUBAHAN: border, bg-color untuk liquid glass putih
        "relative mx-auto hidden items-center justify-between rounded-full border border-black/10 bg-white/30 shadow-2xl lg:flex",
        "px-4",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// --- 3. NAVBAR MENU ITEMS (NavItems) ---
export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-1 text-sm lg:flex",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          key={`link-${idx}`}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          // PERUBAHAN: text-color agar terlihat di latar belakang putih (hitam/abu-abu gelap)
          className="relative px-4 py-2 text-neutral-800 transition-colors duration-300 hover:text-black"
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered-backdrop"
              // PERUBAHAN: hover background agar terlihat di latar belakang putih (abu-abu terang/putih transparan)
              className="absolute inset-0 rounded-full bg-black/10"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

// --- 4. MOBILE NAVBAR WRAPPER (MobileNav) - Liquid Glass Putih ---
export const MobileNav = ({
  children,
  className,
  isScrolled,
}: MobileNavProps) => {
  const variants = {
    atTop: {
      y: 16,
      paddingTop: "8px",
      paddingBottom: "8px",
      borderRadius: "9999px",
    },
    scrolled: {
      y: 8,
      paddingTop: "6px",
      paddingBottom: "6px",
      borderRadius: "9999px",
    },
  };
  return (
    <motion.div
      initial="atTop"
      animate={isScrolled ? "scrolled" : "atTop"}
      variants={variants}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      style={{
        backdropFilter: "url(#liquid-glass)",
        WebkitBackdropFilter: "url(#liquid-glass)",
      }}
      className={cn(
        // PERUBAHAN: border, bg-color untuk liquid glass putih
        "relative z-50 mx-auto flex w-[95%] max-w-lg flex-col items-center justify-between border border-black/10 bg-white/30 shadow-2xl lg:hidden",
        "px-4",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// --- 5. MOBILE NAV HEADER (MobileNavHeader) ---
export const MobileNavHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

// --- 6. MOBILE NAV MENU DROPDOWN (MobileNavMenu) ---
export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          style={{
            backdropFilter: "url(#liquid-glass)",
            WebkitBackdropFilter: "url(#liquid-glass)",
          }}
          className={cn(
            // PERUBAHAN: bg-color untuk liquid glass putih pada menu dropdown
            "absolute inset-x-0 top-[calc(100%+8px)] z-40 flex w-full flex-col items-start justify-start gap-4 rounded-2xl border border-black/10 bg-white/40 p-4 shadow-2xl overflow-hidden",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- 7. MOBILE NAV TOGGLE BUTTON (MobileNavToggle) ---
export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className="relative z-50 p-2">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={isOpen ? "x" : "menu"}
          initial={{ rotate: 45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -45, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* PERUBAHAN: text-color agar terlihat di latar belakang putih (hitam/abu-abu gelap) */}
          {isOpen ? (
            <IconX className="h-6 w-6 text-neutral-800" />
          ) : (
            <IconMenu2 className="h-6 w-6 text-neutral-800" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

// --- 8. NAVBAR LOGO (NavbarLogo) ---
export const NavbarLogo = () => {
  return (
    <a
      href="#"
      // Menggunakan styling dari wrapper logo sebelumnya
      className="relative z-20 flex items-center space-x-2 text-sm font-normal text-black"
    >
      {/* Ini adalah logo inisial "RI" */}
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black">
        <span className="font-serif text-sm font-medium text-white">
          RI
        </span>
      </div>
      
      {/* Nama Anda di samping logo */}
      <span className="font-serif text-lg font-medium text-black">
        RasyaIskandar
      </span>
    </a>
  );
};

// --- 9. TAKE ME BUTTON (Background Hitam) ---
/**
 * Button Aksi "Take Me!" dengan latar belakang hitam, kini menggunakan tag <a>.
 */
export const TakeMeButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <a // <-- DIUBAH DARI <button>
      href="#contact" // <-- DITAMBAHKAN (ganti "#" dengan link Anda)
      onClick={onClick}
      className={cn(
        // Styling ini tetap berfungsi sama pada tag <a>
        "relative flex items-center justify-center px-4 py-2 rounded-full min-w-[7rem] bg-black text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95",
        className
      )}
      aria-label="Take Me Button" // Label ini bisa diubah jika tujuannya spesifik, misal "Go to projects"
    >
      <span className="relative z-10">Take Me!</span>
    </a>
  );
};