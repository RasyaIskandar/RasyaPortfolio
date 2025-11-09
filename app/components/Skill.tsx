"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform, MotionValue, useInView, Variants } from 'framer-motion';

// --- Tipe Data untuk Konfigurasi & Props ---
type CardConfig = {
    cardWidth: number;
    cardHeight: number;
    cardGap: number;
    curveHeight: number;
};

// Menggunakan tipe event yang benar (native MouseEvent, dll.) bukan React.MouseEvent
type CardProps = {
    onTap: (event: MouseEvent | TouchEvent | PointerEvent) => void;
    title: string;
    config: CardConfig;
    index: number;
    x: MotionValue<number>;
    viewportWidth: number;
};

// --- Konfigurasi Desain & Animasi ---

const getCardConfig = (width: number): CardConfig => {
    if (width < 640) { // Mobile
        return { cardWidth: 160, cardHeight: 220, cardGap: 14, curveHeight: 40 };
    }
    if (width < 1024) { // Tablet
        return { cardWidth: 180, cardHeight: 250, cardGap: 16, curveHeight: 60 };
    }
    // Desktop
    return { cardWidth: 220, cardHeight: 320, cardGap: 20, curveHeight: 80 };
};

const PIXELS_PER_SECOND = 50;

/**
 * Komponen Card Individual
 * Didesain ulang dengan gaya elegan dan modern.
 */
const Card = ({ onTap, title, config, index, x, viewportWidth }: CardProps) => {
    
    const inputRange = React.useMemo(() => {
        const initialX = index * (config.cardWidth + config.cardGap);
        const centerPoint = viewportWidth / 2 - config.cardWidth / 2;
        const xWhenCentered = -initialX + centerPoint;
        const range = viewportWidth * 0.8;
        return [xWhenCentered - range, xWhenCentered, xWhenCentered + range];
    }, [index, config, viewportWidth]);

    const outputRange = [0, -config.curveHeight, 0];
    const y = useTransform(x, inputRange, outputRange);

    return (
        <motion.div
            className="relative flex-shrink-0 cursor-pointer"
            style={{
                y,
                width: config.cardWidth,
                height: config.cardHeight,
                margin: `0 ${config.cardGap / 2}px`,
                transformStyle: 'preserve-3d',
            }}
            onTap={onTap}
            whileHover={{ 
                scale: 1.05, 
                zIndex: 50,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
            <div className="absolute w-full h-full p-1 rounded-2xl bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 shadow-2xl">
                <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-white">
                    <h2 className="relative font-serif text-2xl text-center sm:text-3xl italic text-gray-800 p-4">
                        {title}
                    </h2>
                </div>
            </div>
        </motion.div>
    );
};

/**
 * Komponen Utama Carousel/Skill Page
 */
const SkillPage = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [config, setConfig] = useState<CardConfig>(getCardConfig(typeof window !== 'undefined' ? window.innerWidth : 1200));
    const [viewportWidth, setViewportWidth] = useState(0);
    
    const containerRef = useRef<HTMLDivElement | null>(null);
    const controls = useAnimation();
    const x = useMotionValue(0);
    const animationIsRunning = useRef(true);
    
    // --- Scroll-triggered animation setup ---
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { amount: 0.2 });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setConfig(getCardConfig(width));
            if (containerRef.current) {
                setViewportWidth(containerRef.current.offsetWidth);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const cardData = React.useMemo(() => [
      { title: "HTML", subtitle: "Sudah sangat terbiasa menyusun struktur halaman yang bersih dan teratur." },
  { title: "CSS", subtitle: "Mampu membuat layout responsif dan rapih tanpa bergantung pada template." },
  { title: "JavaScript", subtitle: "Mampu menulis logika interaktif dan integrasi API dengan baik." },
  { title: "PHP", subtitle: "Cukup mahir menulis logika backend dan komunikasi dengan database." },
  { title: "Laravel", subtitle: "Sudah terbiasa membuat CRUD, autentikasi, middleware, dan relasi model." },
  { title: "Tailwind CSS", subtitle: "Sangat lancar membangun UI cepat, rapih, dan konsisten dengan utility class." },
  { title: "TWRNC", subtitle: "Mampu styling React Native dengan efisien, mirip Tailwind di web." },
  { title: "TypeScript", subtitle: "Sedang berkembang, paham penggunaan tipe dan props di Next.js/React." },
  { title: "Next.js", subtitle: "Mampu membuat halaman, routing, API routes, dan optimize SEO/SSR." },

  { title: "Visual Studio Code", subtitle: "Editor utama, sangat nyaman dengan workflow plugin dan shortcut." },
  { title: "Android Studio", subtitle: "Dipakai rutin untuk build dan testing aplikasi mobile." },
  { title: "Laragon", subtitle: "Environment utama untuk development Laravel dengan workflow cepat." },
  { title: "Figma", subtitle: "Cukup mahir membaca desain dan menerjemahkannya jadi UI identik." },

  { title: "MySQL", subtitle: "Terbiasa membuat tabel, relasi, dan query CRUD untuk aplikasi skala kecil–menengah." },
  { title: "SQLite", subtitle: "Sering digunakan untuk aplikasi mobile dan prototyping ringan." },
    ], []);

    const duplicatedData = React.useMemo(() => [...cardData, ...cardData], [cardData]);

    const startAnimation = useCallback(() => {
        if (!animationIsRunning.current) return;
        const totalWidth = (config.cardWidth + config.cardGap) * cardData.length;
        const currentX = x.get();
        const remainingDistance = totalWidth + (currentX % totalWidth);
        const duration = remainingDistance / PIXELS_PER_SECOND;
        controls.start({
            x: -totalWidth,
            transition: { duration, ease: 'linear' },
        }).then(() => {
            if (animationIsRunning.current) {
                x.set(0);
                startAnimation();
            }
        });
    }, [config, cardData.length, controls, x]);
    
    useEffect(() => {
        if (viewportWidth > 0) {
            animationIsRunning.current = true;
            startAnimation();
        }
        return () => {
            animationIsRunning.current = false;
            controls.stop();
        };
    }, [viewportWidth, startAnimation]);
    
    const activeData = activeIndex !== null ? duplicatedData[activeIndex] : null;

    const handleTap = (event: MouseEvent | TouchEvent | PointerEvent, index: number) => {
        event.stopPropagation();
        setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    };
    
    // --- Animation Variants ---
    const placeholderContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const titleVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
        },
    };

    const paragraphVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 },
        },
    };


    return (
        <section 
        id="skill"
            ref={sectionRef}
            className="w-full bg-gray-50 text-gray-800 py-16 px-4 sm:px-8 md:py-24 overflow-hidden min-h-screen flex items-center"
            onClick={() => setActiveIndex(null)}
        >
            <div  className="container mx-auto max-w-6xl">
                <div className="flex flex-col gap-4 items-center">
                    
                    {/* Bagian Atas: Carousel */}
                    <motion.div
                        className="w-full h-[50vh] lg:h-[500px]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div 
                            ref={containerRef}
                            className="relative flex w-full h-full items-center overflow-hidden"
                            style={{ perspective: '1200px' }}
                        >
                            <motion.div
                                className="absolute flex"
                                animate={controls}
                                style={{ x, top: '50%', y: '-50%' }} 
                            >
                                {duplicatedData.map((data, i) => (
                                    <Card
                                        key={i}
                                        index={i}
                                        x={x}
                                        viewportWidth={viewportWidth}
                                        onTap={(e) => handleTap(e, i)}
                                        title={data.title}
                                        config={config}
                                    />
                                ))}
                            </motion.div>
                            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-50 to-transparent" />
                            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-50 to-transparent" />
                        </div>
                    </motion.div>
                    
                    {/* Bagian Bawah: Konten Teks */}
                    <div className="w-full flex flex-col text-center lg:-mt-24">
                        <AnimatePresence mode="wait">
                            {activeData ? (
                                <motion.div
                                    key={activeData.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                >
                                    <p className="font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-gray-500 mb-3 sm:mb-4">
                                        Skill Details
                                    </p>
                                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium italic text-gray-900 mb-6 sm:mb-8 leading-tight">
                                        {activeData.title}
                                    </h1>
                                    <p className="max-w-lg text-gray-600 text-sm sm:text-base leading-relaxed mx-auto">
                                        {activeData.subtitle}
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    variants={placeholderContainerVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <motion.p
                                        variants={titleVariants}
                                        className="font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-gray-500 mb-3 sm:mb-4"
                                    >
                                        My Professional Toolkit
                                    </motion.p>
                                    <motion.h1
                                        variants={titleVariants}
                                        className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium italic text-gray-900 mb-6 sm:mb-8 leading-tight"
                                    >
                                        My Experience
                                    </motion.h1>
                                    <motion.p
                                        variants={paragraphVariants}
                                        className="max-w-lg text-gray-600 text-sm sm:text-base leading-relaxed mx-auto"
                                    >
                                        Klik salah satu kartu keahlian di atas untuk melihat detail pengalaman saya.
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SkillPage;

