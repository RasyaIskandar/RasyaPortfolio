"use client"; // Add this directive to mark the component as a Client Component

import React from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants type

/**
 * ArrowIcon Component
 * This component is for the arrow icon inside the button.
 * No changes were made here, as per the requirements.
 */
const ArrowIcon = () => (
  <div className="bg-white/20 rounded-full p-1">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.125 9.375L7.875 5.625L4.125 1.875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

// --- Animation Variants ---

/**
 * Container Variant
 * This variant orchestrates the animation of its children.
 * 'staggerChildren' creates a sequential delay for each child's animation,
 * making them appear one after another for an elegant effect.
 */
const containerVariants: Variants = { // FIX: Explicitly type as Variants
  hidden: { opacity: 0 }, // The container starts as invisible
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // Time delay (in seconds) between each child animation
    },
  },
};

/**
 * Item Variant
 * This variant defines the animation for each individual content element.
 * It creates a subtle "fade in and slide up" effect from a defined starting point.
 */
const itemVariants: Variants = { // FIX: Explicitly type as Variants
  hidden: { opacity: 0, y: 40 }, // Start invisible and shifted 40px down
  show: { 
    opacity: 1, 
    y: 0, // Animate to fully visible and its original position
    transition: {
      duration: 1, // The animation will last 1 second
      ease: [0.25, 1, 0.5, 1], // A custom cubic-bezier for a smooth, premium easing
    }
  },
};

/**
 * Heading Group Variant
 * This variant is specifically for the container of the h1 and h2 tags.
 * It animates as a single item but also staggers its own children (the headings)
 * to fulfill the optional requirement of revealing each line one by one.
 */
const headingGroupVariant: Variants = { // FIX: Explicitly type as Variants
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.2, // Stagger the h1 and h2 elements inside
    }
  }
};


export default function HomePage() {
  return (
    // The main container's layout, padding, and background remain unchanged.
    <main   id="home"  className="flex w-full flex-col items-center justify-center bg-[#F4F4F4] px-4 pt-20 pb-8 sm:p-8 lg:pt-32 overflow-hidden">
      
      {/* The 3D transform container's styles are fully preserved to maintain the design. */}
      <div 
        className="transform-gpu scale-90 lg:scale-100 lg:[transform:rotateX(15deg)_rotateY(-10deg)_rotateZ(-2deg)]" 
      >
        {/*
          ANIMATION CONTAINER: This 'motion.div' wraps all hero content.
          - It uses 'containerVariants' to orchestrate the animations.
          - 'initial="hidden"' and 'animate="show"' trigger the animation on page load.
          - All direct `motion` children will be animated sequentially based on `staggerChildren`.
        */}
        <motion.div 
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >

          {/* ANIMATED ITEM 1 (Nested Container): The heading group.
            - This block animates in as the first item.
            - It also acts as a stagger container for the h1 and h2s within it,
              creating a beautiful cascading text reveal.
          */}
          <motion.div 
            className="relative font-serif text-6xl sm:text-7xl lg:text-8xl lg:text-[120px] leading-[0.9] text-gray-800"
            variants={headingGroupVariant}
          >
            
            <motion.h1 
              className="relative italic flex flex-col items-center lg:flex-row lg:items-baseline"
              variants={itemVariants} // Re-uses the item variant for the fade-in-up effect
            >
              Im Rasya,
              <span className="font-normal not-italic lg:ml-4">Programmer</span>
            </motion.h1>

            <motion.h2 
              className="relative"
              variants={itemVariants}
            >
              FrontEnd
            </motion.h2>
            
            <motion.h2 
              className="relative"
              variants={itemVariants}
            >
              Dev From Indonesia
            </motion.h2>
          </motion.div>

          {/* ANIMATED ITEM 2: The paragraph. This will animate after the heading block. */}
          <motion.p 
            className="mt-8 lg:mt-12 max-w-sm lg:max-w-md text-base font-sans text-gray-500"
            variants={itemVariants}
          >
            I have 3 years of experience Coding
          </motion.p>
          
          {/* ANIMATED ITEM 3: The button. This animates last, completing the sequence. */}
         <motion.a // <-- DIUBAH dari motion.button
  href="#contact" // <-- DITAMBAHKAN
  className="mt-8 flex items-center gap-3 rounded-full bg-black text-white text-base font-medium py-4 px-8 shadow-[0px_8px_24px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 active:scale-95"
  variants={itemVariants}
>
  Contact?!
  <ArrowIcon />
</motion.a>
        </motion.div>
      </div>
    </main>
  );
}

