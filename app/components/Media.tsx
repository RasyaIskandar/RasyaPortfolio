'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Instagram, Github, Linkedin, ArrowUpRight } from 'lucide-react';

// --- CATATAN PENTING ---
// 1. Dependensi: Pastikan Anda telah menginstal semua dependensi yang diperlukan.
//    npm install framer-motion lucide-react
//
// 2. Konfigurasi Font (Next.js): Untuk hasil terbaik, konfigurasikan font Anda di file
//    root layout (misalnya, `app/layout.tsx`).
// -------------------------


// --- Tipe Data ---
interface SocialLink {
  platform: string;
  username: string;
  url: string;
  Icon: React.ElementType;
  gradient: string;
}

// --- Data Link Sosial ---
// Tautan X (Twitter) telah dihapus, dan data yang tersisa dirapikan.
const socialLinks: SocialLink[] = [
  {
    platform: 'Instagram',
    username: '@rasyaiskandar__',
    url: 'https://www.instagram.com/rasyaiskandar__',
    Icon: Instagram,
    gradient: 'from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
  },
  {
    platform: 'GitHub',
    username: 'RasyaIskandar',
    url: 'https://github.com/RasyaIskandar',
    Icon: Github,
    gradient: 'from-[#333] via-[#666] to-[#999]',
  },
  {
    platform: 'LinkedIn',
    username: 'Rasya Iskandar',
    url: 'https://www.linkedin.com/in/rasyaiskandar',
    Icon: Linkedin,
    gradient: 'from-[#0A66C2] via-[#3794FF] to-[#62B2FF]',
  },
];

/**
 * Komponen pembungkus generik untuk menerapkan animasi on-scroll.
 * Menggunakan hook useInView untuk mendeteksi kapan elemen masuk ke viewport.
 */
const AnimatedOnScroll = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  // `once: true` memastikan animasi hanya berjalan sekali.
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants = {
    // Kondisi awal: elemen tidak terlihat dan sedikit bergeser ke bawah.
    hidden: { opacity: 0, y: 40 },
    // Kondisi akhir: elemen terlihat sepenuhnya di posisi aslinya.
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      // Menganimasikan ke 'visible' jika `isInView` bernilai true.
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};


/**
 * Komponen SocialCard yang menampilkan tautan ke satu platform media sosial.
 * Animasi on-scroll kini ditangani oleh komponen ini sendiri.
 */
const SocialCard = ({ platform, username, url, Icon, gradient }: SocialLink) => {
  const ref = useRef(null);
  // Menggunakan useInView dengan `once: true` agar animasi hanya terjadi sekali.
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.a
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Kunjungi profil ${platform} saya (terbuka di tab baru)`}
      className="relative block w-full rounded-2xl bg-white/50 backdrop-blur-lg border border-zinc-200/60 overflow-hidden group shadow-sm"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      // Menambahkan `delay` yang bergantung pada indeks agar animasi muncul berurutan
      // Namun, karena ini adalah komponen individual, kita akan membiarkan transisinya sederhana.
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Efek hover tetap dipertahankan seperti sebelumnya */}
      <motion.div
        className="p-6 h-full"
        whileHover={{
          y: -8,
          scale: 1.02,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        }}
        transition={{ type: 'spring', damping: 12, stiffness: 150 }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <div className="relative">
                <Icon className="w-8 h-8 text-zinc-700 transition-colors duration-300 group-hover:text-zinc-900" />
                <motion.div
                  className={`absolute -inset-2.5 -z-10 rounded-full blur-xl opacity-0 transition-opacity duration-300 bg-gradient-to-tr ${gradient} group-hover:opacity-60`}
                />
              </div>
              <ArrowUpRight className="w-6 h-6 text-zinc-400 transform transition-transform duration-300 ease-in-out -translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
            </div>
            <p className="font-bold text-xl text-zinc-900 mt-4">{platform}</p>
            <p className="text-sm text-zinc-600 break-words">{username}</p>
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
};

/**
 * Halaman utama "Wanna know about me?" yang menampilkan profil dan tautan sosial.
 * Grid untuk tautan sosial diubah menjadi `md:grid-cols-3` untuk tata letak 3 kolom yang rapi.
 */
const WannaKnowAboutMePage = () => {
  return (
    <div id="contact" className="min-h-screen w-full bg-zinc-50 text-zinc-900 font-sans antialiased relative overflow-hidden flex items-start sm:items-center justify-center p-4 py-16 sm:py-4">
      {/* Latar Belakang Dekoratif */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:16px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <motion.div
          className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            {/* Setiap elemen teks kini dibungkus dengan AnimatedOnScroll */}
            <AnimatedOnScroll>
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight text-zinc-900">
                Wanna know about me?
              </h1>
            </AnimatedOnScroll>
            <AnimatedOnScroll className="mt-4">
               <p className="max-w-xl mx-auto text-zinc-600 text-base sm:text-lg leading-relaxed">
                 Let’s connect through my digital world.
               </p>
            </AnimatedOnScroll>
            <AnimatedOnScroll className="mt-6">
              <p className="max-w-2xl mx-auto text-zinc-500 text-sm sm:text-base">
                Im a digital creator who loves building beautiful interfaces and exploring new technologies. My work is a blend of clean design, fluid motion, and a user-first mindset.
              </p>
            </AnimatedOnScroll>
          </div>

          <AnimatedOnScroll>
            <h2 className="mt-8 sm:mt-10 text-center text-sm font-semibold tracking-widest text-zinc-400 uppercase">
              Find me on
            </h2>
          </AnimatedOnScroll>

          {/* Grid diubah: 1 kolom di seluler, 2 kolom di sm/tablet, 3 kolom di md/desktop untuk 3 item */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {socialLinks.map((social) => (
                <SocialCard key={social.platform} {...social} />
              ))}
            </AnimatePresence>
          </div>

          <AnimatedOnScroll className="mt-8 sm:mt-10">
             <p className="text-center text-zinc-500">
               Let’s create something awesome together.
             </p>
          </AnimatedOnScroll>
        </div>
      </main>
    </div>
  );
};

export default WannaKnowAboutMePage;