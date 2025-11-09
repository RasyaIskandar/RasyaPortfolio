'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useSpring,
  useInView,
} from 'framer-motion';

// ====================================================================
// NEW: AnimatedOnScroll Wrapper Component
// ====================================================================
/**
 * A reusable wrapper component that animates its children when they enter the viewport.
 * Animation: fade-in and slide-up effect.
 */
const AnimatedOnScroll = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef(null);
  // The 'once: true' option ensures the animation only runs once.
  const isInView = useInView(ref, { once: true });

  const animationVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={animationVariants}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay, // Apply the delay
      }}
    >
      {children}
    </motion.div>
  );
};


// ====================================================================
// InteractiveBox Component (UPDATED to support images)
// ====================================================================

// Define the types for the component's props
interface InteractiveBoxProps {
  /** The size of the box (width and height) in pixels. */
  size?: number;
  /** An array of two strings representing the gradient colors (fallback). */
  gradientColors?: [string, string];
  /** The URL for the background image. */
  imageUrl?: string;
  /** The intensity of the interactive effects (e.g., tilt, light). */
  effectIntensity?: number;
  /** The speed of the animations, affects the spring dynamics. */
  animationSpeed?: number;
}

/**
 * An interactive box with a magnetic tilt and a soft light effect that follows the cursor.
 * It also features a subtle breathing animation when idle.
 */
const InteractiveBox: React.FC<InteractiveBoxProps> = ({
  size = 150,
  gradientColors = ['#0d9488', '#2563eb'],
  imageUrl,
  effectIntensity = 1.0,
  animationSpeed = 0.4,
}) => {
  // A reference to the main div element to get its dimensions
  const boxRef = useRef<HTMLDivElement>(null);

  // Motion values to track the mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smoother, more natural motion
  const springConfig = {
    stiffness: 150 / animationSpeed,
    damping: 15,
    mass: 1,
  };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transformations to create the magnetic tilt effect
  const rotateX = useTransform(
    smoothMouseY,
    [-size / 2, size / 2],
    [`${12 * effectIntensity}deg`, `-${12 * effectIntensity}deg`]
  );
  const rotateY = useTransform(
    smoothMouseX,
    [-size / 2, size / 2],
    [`-${12 * effectIntensity}deg`, `${12 * effectIntensity}deg`]
  );

  // Generates the radial gradient for the soft light effect
  const lightBackground = useMotionTemplate`
    radial-gradient(
      circle at ${smoothMouseX}px ${smoothMouseY}px,
      rgba(255, 255, 255, ${0.3 * effectIntensity}),
      transparent 80%
    )
  `;

  // Function to handle mouse movement over the box
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    const { left, top, width, height } = boxRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Function to reset the mouse position when the cursor leaves the box
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={boxRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      animate={{ scale: [1, 1.02, 1] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }}
      style={{
        width: size,
        height: size,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        rotateX,
        rotateY,
      }}
      className="relative rounded-2xl overflow-hidden" // Added overflow-hidden
    >
      {/* The main box with image or gradient background */}
      {imageUrl ? (
        <motion.img
          src={imageUrl}
          alt="Interactive background"
          style={{ transform: 'translateZ(0) scale(1.15)' }} // Slightly zoom in to prevent edges on tilt
          className="absolute inset-0 w-full h-full object-cover shadow-lg"
        />
      ) : (
        <div
          style={{
            background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
            transform: 'translateZ(0)',
          }}
          className="absolute inset-0 rounded-2xl shadow-lg"
        />
      )}

      {/* The soft light effect that follows the cursor */}
      <motion.div
        style={{
          background: lightBackground,
          transform: 'translateZ(10px)',
        }}
        className="pointer-events-none absolute inset-0 rounded-2xl"
      />
    </motion.div>
  );
};


// ====================================================================
// Komponen Navigasi
// ====================================================================
const NavLink = ({ children, href = "#" }: { children: React.ReactNode, href?: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="block py-1 text-gray-600 hover:text-black transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
    {children}
  </a>
);

// ====================================================================
// Komponen Utama Aplikasi (Halaman)
// ====================================================================
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Efek fade-in saat komponen dimuat pertama kali.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`bg-white text-black transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} flex flex-col min-h-screen`} style={{ fontFamily: "'Syne', sans-serif" }}>
      <div className="container mx-auto px-6 md:px-10 py-8">
        <header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            
            {/* Kolom 1: Judul dan Placeholder Animasi */}
            <AnimatedOnScroll delay={0.1}>
              <div className="space-y-4">
                <h2 className="font-bold text-black tracking-wider">Hire Different™</h2>
                <div className="w-full h-48 md:h-56 flex items-center justify-center">
                   <InteractiveBox
                      size={130}
                      imageUrl="/images/pp.jpg" 
                      effectIntensity={1.2}
                      animationSpeed={0.5}
                   />
                </div>
              </div>
            </AnimatedOnScroll>

            {/* Kolom 2: Navigasi "Reach me" */}
            <AnimatedOnScroll delay={0.2}>
              <div className="space-y-4">
                <h2 className="font-bold text-black tracking-wider">Reach me</h2>
                <nav className="flex flex-col space-y-2">
                  <NavLink href="mailto:rasyaiskandar79@gmail.com">rasyaiskandar79@gmail.com</NavLink>
                  <NavLink href="https://www.google.com/maps/search/?api=1&query=Indonesia,Bogor">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="inline-block mr-2 align-middle" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    Indonesia, Bogor
                  </NavLink>
                </nav>
              </div>
            </AnimatedOnScroll>

            {/* Kolom 3: Navigasi "Recruit Me" - Sudah diperbarui dengan nama file CV Anda */}
            <AnimatedOnScroll delay={0.3}>
              <div className="space-y-4">
                <h2 className="font-bold text-black tracking-wider">Recruit Me</h2>
                
                {/* 📌 PENTING: Pastikan file "CV Rasya Iskandar.pdf" ada di folder `public` Anda. */}
                <a
                  href="/CV Rasya Iskandar.pdf" // Path ke file di folder public
                  download="CV Rasya Iskandar.pdf" // Atribut download memastikan nama file saat diunduh
                  className="inline-block bg-black text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors duration-300 transform hover:-translate-y-0.5 shadow-md"
                >
                  Download CV
                </a>
              </div>
            </AnimatedOnScroll>
              
            {/* Kolom 4: Navigasi "Visionary" */}
            <AnimatedOnScroll delay={0.4}>
              <div className="space-y-4">
                <h2 className="font-bold text-black tracking-wider">Visionary</h2>
                <p className="py-1 text-gray-600">Building the future, one line of code at a time.</p>
              </div>
            </AnimatedOnScroll>

          </div>
        </header>

        {/* Bagian Hero dengan Tipografi Besar */}
        <AnimatedOnScroll delay={0.2}>
          <main className="flex-grow flex items-center justify-center py-8 md:py-16">
            <h1 
              className="text-black font-extrabold tracking-tighter break-words w-full text-center"
              style={{ 
                fontSize: 'clamp(3rem, 16vw, 12rem)',
                lineHeight: '0.8',
              }}
            >
              <span className="lg:hidden">Rasya Iskandar</span>
              <span className="hidden lg:inline">RasyaIskandar</span>
            </h1>
          </main>
        </AnimatedOnScroll>
        
        {/* Footer */}
        <AnimatedOnScroll delay={0.3}>
          <footer className="text-center pt-8 pb-6 mt-auto border-t border-gray-200/50">
            <p className="text-gray-500 text-sm">© 2025 RasyaIskandar. All Rights Reserved.</p>
          </footer>
        </AnimatedOnScroll>

      </div>
    </div>
  );
}