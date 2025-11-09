/**
 * @file Interactive Certifications Showcase
 * @description A responsive and animated component to display professional certifications.
 * Features include a selectable list, a detailed view, and an image lightbox
 * with a smooth zoom-in animation for image changes.
 * Built with React, TypeScript, Framer Motion, and Tailwind CSS.
 *
 * To use this component, ensure you have the necessary fonts imported in your main layout or HTML file:
 * <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
 */
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, Variants } from 'framer-motion';

// --- Reusable Animation Component ---
const AnimateOnScroll = ({ children, delay = 0, yOffset = 40 }: { children: React.ReactNode, delay?: number, yOffset?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const variants: Variants = {
        hidden: { opacity: 0, y: yOffset },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};


// --- Icon Components ---
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

// --- Data and Types ---
interface Card {
  id: number;
  image: string; // Gambar "depan" (cth: sertikom1D.jpg)
  lightboxImage?: string; // Gambar "belakang" (cth: sertikom1B.jpg)
  title: string;
  provider: string;
  description: string;
}

// --- PERUBAHAN DI SINI ---
// Array 'initialCards' dikembalikan ke path gambar aslinya
const initialCards: Card[] = [
  {
    id: 1,
    image: '/images/sertikom1D.jpg', // Depan
    lightboxImage: '/images/sertikom1B.jpg', // Belakang (nilai)
    title: 'Membuat Landing Page (HTML & CSS)', 
    provider: 'WANTeknologi / BNSP', 
    description: 'Sertifikasi kompetensi resmi yang menyatakan kelulusan dalam membuat landing page responsif dan fungsional menggunakan HTML dan CSS sesuai standar industri.',
  },
  {
    id: 2,
    image: '/images/sertikom2D.jpg', // Depan
    lightboxImage: '/images/sertikom2B.jpg', // Belakang (nilai)
    title: 'Aplikasi Pemesanan Hotel (Web)',
    provider: 'Dimensi Kreasi Nusantara / SMK Pesat Pro',
    description: 'Sertifikasi SANGAT KOMPETEN dalam pengembangan web PHP, penerapan Bootstrap, dan manajemen database MySQL untuk aplikasi pemesanan.',
  },
  {
    id: 3,
    image: '/images/sertikom3D.jpg', // Depan
    lightboxImage: '/images/sertikom3B.jpg', // Belakang (nilai)
    title: 'Website Library Management (Laravel)', 
    provider: 'Kreatif Media / SMK Pesat Pro', 
    description: 'Sertifikasi KOMPETEN dalam membangun aplikasi web Laravel, mencakup autentikasi (Breeze), perancangan database MySQL, dan UI dengan Tailwind CSS.',
  },
  {
    id: 4,
    image: '/images/sertikom4D.jpg', // Depan
    lightboxImage: '/images/sertikom4B.jpg', // Belakang (nilai)
    title: 'Fullstack Mobile App (React Native & Laravel)', 
    provider: 'GINVO Studio', 
    description: 'Sertifikasi KOMPETEN dalam membangun aplikasi fullstack, meliputi Frontend (React Native, Fetching API) dan Backend (API Laravel, Postman).',
  }
];

// --- Main App Component ---
export default function App() {
  const cards = initialCards;
  // Set kartu pertama yang aktif sebagai kartu terakhir/terbaru (id: 4)
  const [selectedCard, setSelectedCard] = useState<Card>(cards[cards.length - 1]); 
  const [showImage, setShowImage] = useState(false); 

  const handleCardSelect = (card: Card) => {
    setSelectedCard(card);
    setShowImage(false); 
  };
  
  const handleOpenImage = () => {
    setShowImage(true);
  }

  const handleCloseImage = () => {
    setShowImage(false);
  }

  // Efek untuk mengunci scroll body saat lightbox terbuka
  useEffect(() => {
    if (showImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showImage]);

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-slate-50 p-4 font-sans overflow-hidden">
      {/* Background shapes for aesthetic */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-100 rounded-full opacity-50 -translate-x-1/4 -translate-y-1/4 filter blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full opacity-50 translate-x-1/4 translate-y-1/4 filter blur-3xl" aria-hidden="true"></div>

      <main className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-8 px-4 sm:px-6 md:px-8 py-12">
        <AnimateOnScroll>
            <header className="text-center pb-4">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-800 tracking-tight leading-tight">
                    Professional Certifications
                </h1>
                <p className="text-slate-500 mt-3 text-sm sm:text-base">An interactive overview of my key learning achievements.</p>
            </header>
        </AnimateOnScroll>

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6 lg:gap-8 w-full">
            <div className="lg:col-span-2" aria-live="polite" aria-atomic="true">
                <AnimateOnScroll>
                    <AnimatePresence mode="wait">
                        {selectedCard && (
                            <CardDetailView 
                                key={selectedCard.id}
                                card={selectedCard}
                                onOpenImage={handleOpenImage}
                            />
                        )}
                    </AnimatePresence>
                </AnimateOnScroll>
            </div>
            <div className="lg:col-span-1 flex flex-col gap-3">
                {cards.map((card, index) => (
                    <AnimateOnScroll key={card.id} delay={index * 0.1}>
                        <CardListItem
                            card={card}
                            onSelect={handleCardSelect}
                            isActive={selectedCard?.id === card.id}
                        />
                    </AnimateOnScroll>
                ))}
            </div>
        </div>
      </main>

      <AnimatePresence>
        {showImage && selectedCard && (
            <ImageLightbox
                key="lightbox"
                card={selectedCard}
                onClose={handleCloseImage}
            />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Detail View Component ---
const CardDetailView = ({ card, onOpenImage }: { card: Card; onOpenImage: () => void }) => {
    const { title, provider, description } = card;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 20, delay: 0.1 } }}
            exit={{ opacity: 0, y: -10, scale: 0.99, transition: { duration: 0.3 } }}
            
            className="group relative w-full rounded-2xl overflow-hidden cursor-pointer 
                       bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]
                       transition-all duration-500 ease-out 
                       min-h-[420px] lg:aspect-auto lg:min-h-[450px] border-2 border-slate-300"
            
            whileHover={{ scale: 1.01, y: -4 }}
            whileTap={{ scale: 0.99 }}
            
            role="button"
            aria-label={`View certificate for ${title} from ${provider}`}
            onClick={onOpenImage}
        >
            <div 
                className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10 group-hover:opacity-15 transition-opacity duration-300"
                style={{ 
                    backgroundImage: `url(${card.image})`,
                    backgroundPosition: 'center 10%' // Posisikan gambar sedikit ke atas
                }}
                onError={(e) => {
                    const target = e.target as HTMLDivElement;
                    target.style.backgroundImage = `url(https://placehold.co/1080x675/F8FAFC/CBD5E1?text=Image+Not+Found)`;
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/60"></div>

            <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:px-10 lg:pt-10 h-full">
                <div className="flex flex-col space-y-4 text-center sm:text-left">
                    <p className="uppercase text-sm tracking-wider text-slate-500 font-medium">
                        {provider}
                    </p>
                    <h2 className="font-serif text-[2rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-semibold text-slate-800 leading-tight">
                        {title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed max-w-lg mx-auto sm:mx-0 pt-2 text-sm sm:text-base">
                        {description}
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-2 text-sm text-slate-700 font-medium pt-4 opacity-80 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        <span>Klik untuk melihat sertifikat</span>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

// --- Lightbox Component ---
const ImageLightbox = ({ card, onClose }: { card: Card; onClose: () => void }) => {
    
    const [isShowingBack, setIsShowingBack] = useState(false);

    const handleImageFlip = () => {
        if (card.lightboxImage) {
            setIsShowingBack(prev => !prev);
        }
    };

    const currentImageKey = `${card.id}-${isShowingBack ? 'back' : 'front'}`;
    const currentImageSrc = isShowingBack ? (card.lightboxImage || card.image) : card.image;
    const cursorStyle = card.lightboxImage ? 'cursor-pointer' : 'cursor-default';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={onClose} // Menutup lightbox saat mengklik backdrop
        >
            <motion.div
                key={card.id}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="relative max-w-7xl w-full h-fit bg-white rounded-2xl shadow-2xl overflow-hidden" 
                onClick={(e) => e.stopPropagation()} // Mencegah penutupan saat mengklik gambar
            >
                <div className="relative w-full h-full max-h-[90vh] max-w-[90vw] flex items-center justify-center mx-auto p-2 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImageKey} 
                            src={currentImageSrc}
                            alt={`Certificate for ${card.title} - ${isShowingBack ? 'Back View' : 'Front View'}`}
                            className={`w-full h-full object-contain ${cursorStyle}`}
                            onClick={handleImageFlip}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://placehold.co/1080x675/F8FAFC/CBD5E1?text=Image+Not+Found`;
                                target.onerror = null;
                            }}
                            
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                    </AnimatePresence>
                </div>
                
                <motion.button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full text-slate-600 flex items-center justify-center border border-slate-200 shadow-lg z-10"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 1)' }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close full image view"
                >
                    <CloseIcon />
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

// --- List Item Component ---
const CardListItem = ({ card, onSelect, isActive }: { card: Card; onSelect: (card: Card) => void; isActive: boolean; }) => {
    return (
        <motion.button
            onClick={() => onSelect(card)}
            className={`
                w-full p-4 rounded-xl text-left transition-all duration-300
                ${isActive 
                    ? 'bg-white font-medium text-slate-800 ring-2 ring-slate-800  shadow-lg' 
                    : 'bg-white text-slate-700 border border-slate-200/80 hover:border-slate-300 hover:shadow-md'
                }
            `}
            whileHover={{ scale: isActive ? 1 : 1.03 }} // Sedikit mengurangi hover scale
            whileTap={{ scale: 0.98 }}
            aria-current={isActive}
        >
            <h3 className="font-medium text-sm">{card.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{card.provider}</p>
        </motion.button>
    );
};  