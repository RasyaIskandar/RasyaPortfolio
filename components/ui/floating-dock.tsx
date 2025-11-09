"use client";
import { cn } from "@/lib/utils";
import { MotionValue } from "framer-motion";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import React, { useRef, useState } from "react";

// --- Tipe Data ---
interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
}

// --- Komponen Utama ---
export const FloatingDock = ({
  items,
  className,
}: FloatingDockProps) => {
  return (
    <FloatingDockVisible items={items} className={className} />
  );
};


// --- Komponen Dock yang Dimodifikasi ---
const FloatingDockVisible = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        // --- PERUBAHAN UTAMA DI SINI ---
        // Mengganti `left-1/2 -translate-x-1/2` dengan metode yang lebih stabil
        "fixed bottom-4 inset-x-0 mx-auto z-50",
        
        // --- Style Asli yang Dipertahankan ---
        "flex h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 lg:hidden dark:bg-neutral-900 w-fit",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};


// --- Komponen Icon Individual (Tidak ada perubahan) ---
interface IconContainerProps extends DockItem {
  mouseX: MotionValue;
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: IconContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  const springConfig = { mass: 0.1, stiffness: 150, damping: 12 };

  const width = useSpring(widthTransform, springConfig);
  const height = useSpring(heightTransform, springConfig);

  const widthIcon = useSpring(widthTransformIcon, springConfig);
  const heightIcon = useSpring(heightTransformIcon, springConfig);

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}