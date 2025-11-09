'use client';

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import {
  motion,
  useInView,
  Variants,
  PanInfo,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- Type Definition for Content ---
interface PortfolioItem {
  id: number;
  category: string;
  subtitle: string;
  heading: string;
  paragraph: string;
}

// --- Data for Dynamic Content ---
const portfolioContent: PortfolioItem[] = [
  {
    id: 1,
    category: 'AboutMe?',
    subtitle: 'A Glimpse Into My World',
    heading: 'Perkenalkan, Saya...',
    paragraph: 'Seorang pengembang muda yang senang mengubah ide menjadi pengalaman digital yang hidup. Saya membangun aplikasi web yang cepat, elegan, dan berfokus pada pengguna karena teknologi seharusnya terasa alami, bukan rumit.'
  },
  {
    id: 2,
   category: 'Journey',
subtitle: 'How I Started & Where I’m Going',
heading: 'Perjalanan Saya di Dunia Teknologi',
paragraph: 'Saya memulai dari rasa penasaran terhadap dunia pemrograman hingga kini fokus membangun solusi digital yang bermanfaat dan berkarakter.'

  },
  {
    id: 3,
   category: 'Innovation',
subtitle: 'Where Technology Meets Creativity',
heading: 'Inovasi yang Saya Bangun',
paragraph: 'Saya senang bereksperimen dengan teknologi baru dan menciptakan solusi yang segar, efisien, dan bermakna bagi pengguna.'

  },
  {
    id: 4,
    category: 'Off the Screen',
subtitle: 'Life Outside the Code',
heading: 'Keseharian di Luar Dunia Digital',
paragraph: 'Saya suka berolahraga seperti main bola dan renang, bermain game untuk hiburan, dan tentu saja, tidur untuk mengisi ulang energi.'

  },
];

// --- Animation Variants ---

// Variants for container elements that stagger their children's animations on scroll-reveal.
const scrollStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// Variants for individual elements that fade and slide in on scroll.
const scrollStaggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 1, 0.5, 1] },
  },
};

// Variants for the text container to handle both scroll-in and cross-fade animations.
const textContainerVariants: Variants = {
  enter: { transition: { staggerChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.1, staggerDirection: -1 } },
};

// Variants for individual text elements, now including a 'hidden' state for the initial scroll-reveal.
const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.5, ease: 'easeIn' },
  },
};

// --- Reusable Portfolio Card Component (No changes needed here) ---
const PortfolioCard = ({ item, index, currentIndex, onClick, }: { item: PortfolioItem; index: number; currentIndex: number; onClick: () => void; }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const offset = index - currentIndex;
  const isVisible = Math.abs(offset) <= 1;
  const isActive = offset === 0;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [6, -6]);
  const rotateY = useTransform(mouseX, [0, 1], [-6, 6]);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isActive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const newMouseX = (e.clientX - rect.left) / rect.width;
    const newMouseY = (e.clientY - rect.top) / rect.height;
    mouseX.set(newMouseX);
    mouseY.set(newMouseY);
  };

  const handleMouseLeave = () => {
    animate(mouseX, 0.5, { type: 'spring', stiffness: 200, damping: 20 });
    animate(mouseY, 0.5, { type: 'spring', stiffness: 200, damping: 20 });
  };

  return (
    <motion.div
      ref={cardRef}
      key={item.id}
      className="absolute w-[75%] sm:w-[65%] md:w-[55%] lg:w-[280px] h-[85%] lg:h-[420px] top-[7.5%] left-0 right-0 mx-auto rounded-2xl overflow-hidden shadow-2xl cursor-grab p-1 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300"
      style={{
        transformStyle: 'preserve-3d',
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        zIndex: portfolioContent.length - Math.abs(offset),
        x: `${offset * 30}%`,
        y: `${Math.abs(offset) * 15}px`,
        scale: isActive ? 1 : 0.85,
        rotateZ: offset * -5,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 30, mass: 0.8 }}
      whileHover={{ scale: isActive ? 1.05 : 0.88 }}
    >
      <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-white">
        <h2 className="relative font-serif text-3xl text-center sm:text-4xl italic text-gray-800 p-4">
          {item.category}
        </h2>
      </div>
       {isActive && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{boxShadow: '0 0 0 0 rgba(109, 40, 217, 0)'}}
            animate={{
              boxShadow: [ "0 0 0 0px rgba(99, 102, 241, 0)", "0 0 0 10px rgba(99, 102, 241, 0.2)", "0 0 0 0px rgba(99, 102, 241, 0)" ],
            }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, }}
          />
        )}
    </motion.div>
  );
};


const AboutPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Scroll-Reveal Logic ---
  const textRef = useRef(null);
  const textIsInView = useInView(textRef, { once: true, amount: 0.2 });
  
  const sliderRef = useRef(null);
  const sliderIsInView = useInView(sliderRef, { once: true, amount: 0.2 });

  // State to differentiate initial scroll animation from subsequent cross-fade animations
  const [hasTextAnimated, setHasTextAnimated] = useState(false);
  useEffect(() => {
    if (textIsInView) {
      setHasTextAnimated(true);
    }
  }, [textIsInView]);

  const paginate = (newDirection: number) => {
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + portfolioContent.length) % portfolioContent.length);
  };

  const currentContent = portfolioContent[currentIndex];

  const swipeConfidenceThreshold = 10000;
  const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -swipeConfidenceThreshold) paginate(1);
    else if (swipe > swipeConfidenceThreshold) paginate(-1);
  };

  return (
    <section id="about" className="relative z-10 w-full bg-gray-50 text-gray-800 py-16 px-4 sm:px-8 md:py-24 overflow-hidden min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-8 items-center">
          
          {/* --- Left Side: Text Content with Scroll-Reveal --- */}
          <div ref={textRef} className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={textContainerVariants}
                // Use 'hidden' for the very first animation, then 'exit' for subsequent cross-fades
                initial={hasTextAnimated ? 'exit' : 'hidden'}
                // Animate to 'enter' once in view
                animate={textIsInView ? 'enter' : 'hidden'}
                exit="exit"
                className="w-full"
              >
                <motion.p variants={textItemVariants} className="font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-gray-500 mb-3 sm:mb-4">
                  {currentContent.subtitle}
                </motion.p>
                <motion.h1 variants={textItemVariants} className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium italic text-gray-900 mb-6 sm:mb-8 leading-tight">
                  {currentContent.heading}
                </motion.h1>
                <motion.p variants={textItemVariants} className="max-w-lg text-gray-600 text-sm sm:text-base leading-relaxed mx-auto lg:mx-0">
                  {currentContent.paragraph}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- Right Side: Card Slider with Scroll-Reveal --- */}
          <motion.div
            ref={sliderRef}
            className="w-full lg:w-1/2"
            variants={scrollStaggerContainer}
            initial="hidden"
            animate={sliderIsInView ? 'visible' : 'hidden'}
          >
            <motion.div variants={scrollStaggerItem}>
                <div
                    className="relative w-full h-[55vh] max-h-[450px] lg:h-[550px] lg:max-h-none flex items-center justify-center"
                    style={{ perspective: '1000px' }}
                >
                    <motion.div
                        className="relative w-full h-full"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.1}
                        onDragEnd={onDragEnd}
                    >
                        {portfolioContent.map((item, index) => (
                        <PortfolioCard
                            key={item.id}
                            item={item}
                            index={index}
                            currentIndex={currentIndex}
                            onClick={() => setCurrentIndex(index)}
                        />
                        ))}
                    </motion.div>
                </div>
            </motion.div>
            <motion.div variants={scrollStaggerItem} className="mt-8 flex justify-center items-center gap-4 text-gray-800">
              <motion.button
                onClick={() => paginate(-1)}
                className="bg-white/60 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
                aria-label="Previous Item"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <ChevronLeft size={20} />
              </motion.button>
              <span className="font-mono text-sm w-12 text-center text-gray-500">
                {String(currentIndex + 1).padStart(2, '0')} / {String(portfolioContent.length).padStart(2, '0')}
              </span>
              <motion.button
                onClick={() => paginate(1)}
                className="bg-white/60 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
                aria-label="Next Item"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;

