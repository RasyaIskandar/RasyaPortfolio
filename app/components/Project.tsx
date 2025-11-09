"use client";

import React, { useState, useRef, useEffect } from 'react';
import type { NextPage } from 'next';
import { motion, useInView } from 'framer-motion';

// --- Tipe Data (Menambahkan 'tech' kembali) ---
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  // --- Penambahan GitHub yang Elegan dan Simple ---
  githubUrl?: string; // Tautan ke GitHub (bersifat opsional)
}

// --- Data Dummy (Dengan Penambahan 'githubUrl') ---
const initialProjects: Project[] = [
  {
    id: 1,
    title: "Library Management",
    description: "Aplikasi sistem perpustakaan yang mendukung CRUD buku, manajemen anggota, peminjaman, pengembalian, dan notifikasi status stok.",
    tech: ["Laravel", "MySQL", "TailwindCSS", "Blade"],
    category: "Sistem Informasi",
    githubUrl: "https://github.com/RasyaIskandar/LibraryManagement",
  },
  {
    id: 2,
    title: "Vidio Clone Mobile",
    description: "Aplikasi streaming mobile yang menampilkan carousel, kategori hiburan, dan daftar konten populer dengan UI responsif.",
    tech: ["React Native", "Expo", "Tailwind (twrnc)", "JavaScript"],
    category: "Aplikasi Streaming Mobile",
    githubUrl: "https://github.com/RasyaIskandar/VidioCloneMobile",
  },
  {
    id: 3,
    title: "GoBus",
    description: "Platform pemesanan tiket bus dengan fitur pemilihan kelas, formulir pemesanan, struk digital, dan ekspor WhatsApp.",
    tech: ["Laravel", "TailwindCSS", "MySQL", "Blade"],
    category: "Aplikasi Pemesanan Tiket",
    githubUrl: "https://github.com/RasyaIskandar/GoBus",
  },
  {
    id: 4,
    title: "TropicalStay",
    description: "Aplikasi manajemen reservasi hotel dengan daftar kamar, pemesanan, detail tamu, dan pengelolaan data backend.",
    tech: ["Laravel", "TailwindCSS", "MySQL"],
    category: "Manajemen Reservasi",
    githubUrl: "https://github.com/RasyaIskandar/TropicalStay",
  },
  {
    id: 5,
    title: "E-Perpus Pesat",
    description: "Sistem perpustakaan digital dengan login multi-role, riwayat peminjaman, perpanjang waktu, dan dashboard admin.",
    tech: ["Laravel", "TailwindCSS", "MySQL"],
    category: "Sistem Perpustakaan Digital",
    githubUrl: "https://github.com/RasyaIskandar/e-perpus-pesat",
  },
  {
    id: 6,
    title: "JakSiaga",
    description: "Aplikasi mobile daftar layanan darurat: polisi, PMI, SAR, posko bencana, dan informasi publik.",
    tech: ["React Native", "Expo", "Tailwind (twrnc)"],
    category: "Aplikasi Layanan Publik",
    githubUrl: "https://github.com/RasyaIskandar/JakSiaga",
  },
  {
    id: 7,
    title: "The PaperMag News",
    description: "Website berita ringan dengan tampilan magazine grid modern, kategori, headline, dan halaman detail berita.",
    tech: ["Laravel", "TailwindCSS", "MySQL"],
    category: "Portal Berita",
    githubUrl: "https://github.com/RasyaIskandar/the-papermag-news",
  },
  {
  id: 8,
  title: "TechXperience",
  description: "Aplikasi mobile berfokus pada hiburan dan eksplorasi konten teknologi, dilengkapi dengan carousel interaktif, kategori tema, serta tampilan daftar konten modern dan bersih.",
  tech: ["React Native", "Expo", "Tailwind (twrnc)", "JavaScript"],
  category: "Aplikasi Hiburan & Media",
  githubUrl: "https://github.com/RasyaIskandar/TechXperience",
},
{
    id: 9,
    title: 'SiswaCare',
    description: 'Sistem pengaduan siswa berbasis web untuk menyampaikan laporan terkait perilaku, sarana, dan situasi sekolah. Dilengkapi dashboard admin untuk tindak lanjut.',
    tech: ['Laravel', 'MySQL', 'Blade', 'Tailwind'],
    category: 'Web App Sekolah',
    githubUrl: 'https://github.com/RasyaIskandar/pengaduan-siswaww',
  },
  {
  id: 10,
  title: 'HabitFlow',
  description: 'Aplikasi pelacak kebiasaan harian dengan sistem progress dan penyimpanan berbasis API. Dibangun untuk membantu pengguna membentuk rutinitas positif dengan visualisasi perkembangan dan reminder harian.',
  tech: ['Android Studio', 'Kotlin', 'Laravel API', 'MySQL'],
  category: 'Mobile Productivity App',
  githubUrl: 'https://github.com/RasyaIskandar/Habit-Tracker-Front-End-',
},
{
  id: 11,
  title: 'FacilityGuard',
  description: 'Sistem manajemen sarana dan prasarana sekolah yang memungkinkan pengguna untuk melaporkan kerusakan, memonitor status perbaikan, dan mengelola inventaris fasilitas. Dilengkapi role admin untuk validasi dan tindak lanjut laporan.',
  tech: ['Laravel', 'Blade', 'MySQL', 'Bootstrap'],
  category: 'School Infrastructure System',
  githubUrl: 'https://github.com/RasyaIskandar/Sarpras-Fix',
}




];


// --- Tipe Properti untuk Card (Menambahkan 'isFlipped' kembali) ---
interface ProjectCardProps {
  project: Project;
  shadowClass: string;
  isFlipped: boolean; // Menambahkan prop 'isFlipped' kembali
  isActive: boolean; // Prop baru untuk menandakan kartu di tengah
}

// --- [REFINED] Komponen Card Proyek (Minimalis DENGAN Fitur Flip) ---
const ProjectCard3D = ({ project, shadowClass, isFlipped, isActive }: ProjectCardProps) => {
  return (
<div className="group w-full h-full perspective-1000">
      <div 
        className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" 
        style={{ 
          transformStyle: 'preserve-3d', 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
        }}
      >
        {/* Sisi Depan Kartu (Tidak Ada Perubahan) */}
        <div 
          className={`absolute w-full h-full rounded-2xl ${shadowClass} overflow-hidden transition-all duration-300 ease-in-out border border-zinc-200/30 group-hover:scale-[1.03] group-hover:shadow-2xl bg-white`} 
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* ... Konten Sisi Depan ... */}
          <div className="w-full h-full p-6 md:p-8 flex flex-col justify-center relative pb-16">
            <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase mb-3">
              {project.category}
            </span>
            <h3 className="font-serif text-3xl font-medium italic text-zinc-900 mb-4 tracking-tight">
              {project.title}
            </h3>
            <p className="font-sans font-light text-zinc-600 text-base leading-relaxed tracking-wide">
              {project.description}
            </p>
            {isActive && !isFlipped && (
              <span className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-xs font-medium text-zinc-400 tracking-wider animate-pulse">
                Klik untuk detail...
              </span>
            )}
          </div>
        </div>
        
        {/* Sisi Belakang Kartu (Detail Teknologi) */}
        <div 
          className={`absolute w-full h-full bg-white rounded-2xl ${shadowClass} overflow-hidden p-6 md:p-8 flex flex-col justify-between border border-zinc-200/30`} 
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Konten Atas (Judul, Teknologi) */}
          <div>
            <h3 className="font-serif text-3xl font-medium italic text-zinc-900 mb-6">{project.title}</h3>
            
            {/* Teknologi yang digunakan */}
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 mb-3 tracking-widest uppercase">Dibangun Dengan</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="bg-zinc-100 text-zinc-800 text-xs font-medium px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tombol Aksi (GitHub & Kembali) */}
          <div className="flex justify-between items-end mt-6">
            
            {/* Tautan GitHub (Ganti Warna Biru menjadi Zinc/Abu-abu Gelap) */}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-sm font-semibold text-zinc-700 hover:text-zinc-900 transition duration-150 hover:underline"
                onClick={(e) => e.stopPropagation()} 
              >
                {/* Ikon GitHub menggunakan warna 'currentColor' agar mengikuti warna teks */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2.0-.21.15-.46.55-.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                </svg>
                Lihat Kode
              </a>
            )}

            {/* Teks Instruksi Kembali */}
            <span className="text-zinc-500 font-medium text-sm ml-auto">
              (Klik untuk kembali)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Komponen Utama dengan Desain, UX, dan Animasi Scroll yang Ditingkatkan ---
const ProjectShowcase3DLayout: NextPage = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false); // Menambahkan state 'isFlipped' kembali
  const [isAnimating, setIsAnimating] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(animationRef, { once: true, amount: 0.2 });
  const ANIMATION_LOCK_DURATION_MS = 800; // Durasi animasi transisi

  // Konfigurasi 3D Carousel (Tidak berubah)
  const cardConfig = [
    { transform: 'translateX(-160%) translateZ(-300px) rotateY(45deg) scale(0.85)', zIndex: 1, filter: 'brightness(0.7) blur(4px)', shadowClass: 'shadow-lg' },
    { transform: 'translateX(-80%) translateZ(-150px) rotateY(30deg) scale(0.9)', zIndex: 2, filter: 'brightness(0.85) blur(2px)', shadowClass: 'shadow-xl' },
    { transform: 'translateX(0%) translateZ(100px) rotateY(0deg) scale(1)', zIndex: 3, filter: 'brightness(1) blur(0px)', shadowClass: 'shadow-2xl' },
    { transform: 'translateX(80%) translateZ(-150px) rotateY(-30deg) scale(0.9)', zIndex: 2, filter: 'brightness(0.85) blur(2px)', shadowClass: 'shadow-xl' },
    { transform: 'translateX(160%) translateZ(-300px) rotateY(-45deg) scale(0.85)', zIndex: 1, filter: 'brightness(0.7) blur(4px)', shadowClass: 'shadow-lg' },
  ];
  
  const getCardStyle = (offset: number) => {
    const configIndex = offset + 2;
    if (configIndex >= 0 && configIndex < cardConfig.length) {
      return { ...cardConfig[configIndex], opacity: 1 };
    }
    return {
      transform: offset > 0 ? 'translateX(200%) scale(0.7)' : 'translateX(-200%) scale(0.7)',
      zIndex: 0,
      filter: 'brightness(0) blur(5px)',
      opacity: 0,
      shadowClass: 'shadow-none',
    };
  };

  const changeProject = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    if(isFlipped) setIsFlipped(false); // Reset kartu ke depan saat berganti
    setActiveProjectIndex(newIndex);
    setTimeout(() => setIsAnimating(false), ANIMATION_LOCK_DURATION_MS);
  }

  const handleRotation = (rotation: number) => {
      const newIndex = (activeProjectIndex + rotation + initialProjects.length) % initialProjects.length;
      changeProject(newIndex);
  };
  
  const handleAutoRotate = () => handleRotation(1);

  const resetAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(handleAutoRotate, 3500); // Sedikit lebih lambat
  };

  // Efek untuk mengelola autoplay (tergantung pada isFlipped)
  useEffect(() => {
    if (!isFlipped) {
      resetAutoPlay(); // Memulai/melanjutkan autoplay jika kartu tidak dibalik
    } else {
      // Jika kartu dibalik, hentikan autoplay
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isFlipped]); // Bergantung pada status 'isFlipped'

  const handleCardClick = (cardOffset: number) => {
    if (isAnimating) return;
    
    if (intervalRef.current) clearInterval(intervalRef.current); // Selalu hentikan autoplay saat ada interaksi

    if (cardOffset === 0) {
      // Jika mengklik kartu di tengah, balik kartu
      setIsFlipped(!isFlipped);
      // useEffect di atas akan menangani autoplay
    } else {
      // Jika mengklik kartu di samping, putar carousel
      handleRotation(cardOffset);
      // Autoplay akan dilanjutkan oleh useEffect setelah 'isFlipped' (jika false)
      // atau dimulai manual setelah 8 detik jika kartu tidak terbalik
      if (!isFlipped) {
         setTimeout(resetAutoPlay, 8000);
      }
    }
  };

  // Efek untuk menangani navigasi keyboard (Tidak berubah)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (isAnimating) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            if (intervalRef.current) clearInterval(intervalRef.current); // Hentikan saat tombol ditekan
            handleRotation(e.key === 'ArrowRight' ? 1 : -1);
            setTimeout(resetAutoPlay, 8000); // Lanjutkan setelah 8 detik
        }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProjectIndex, isAnimating]); // Bergantung pada state saat ini
  
  return (
    <>
      <style>{`
        /* Impor font yang diminta: Serif (Cormorant) dan Sans-serif (Inter) */
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500;1,600&family=Inter:wght@300;400;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .perspective-1000 { perspective: 1000px; }
        /* Pola grid tipis seperti yang diminta */
        .bg-grid {
          background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
      <main
        id='project' ref={animationRef} className="bg-white min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 py-16 relative">
        {/* Latar belakang grid tipis */}
        <div className="absolute inset-0 bg-grid opacity-50"></div>
        
        {/* Konten Judul (Tidak berubah) */}
        <div className="relative z-10 text-center mb-16 md:mb-20 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl md:text-7xl font-medium italic text-zinc-900 tracking-tight leading-tight"
        >
          Portofolio Proyek 
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-zinc-600 font-light tracking-wide"
        >
           Jelajahi pilihan proyek terbaru saya dalam showcase 3D interaktif ini.
        </motion.p>
        </div>

        {/* Kontainer Carousel 3D */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
            transition={{ duration: 1 }}
            className="relative z-10 w-full h-[550px] md:h-[600px] flex items-center justify-center" style={{ perspective: '2500px' }}
        >
          <div className="relative w-[280px] h-[440px] sm:w-[320px] sm:h-[480px] md:w-[360px] md:h-[520px]" style={{ transformStyle: 'preserve-3d' }}>
              {initialProjects.map((project, index) => {
                  const projectCount = initialProjects.length;
                  let offset = index - activeProjectIndex;
                  if (offset < -Math.floor(projectCount / 2)) offset += projectCount;
                  if (offset > Math.floor(projectCount / 2)) offset -= projectCount;

                  const { shadowClass, ...animasiStyle } = getCardStyle(offset);

                  return (
                      <motion.div
                          key={project.id}
                          className="absolute top-0 w-full h-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 rounded-2xl"
                          animate={animasiStyle}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          onClick={() => handleCardClick(offset)}
                          tabIndex={offset === 0 ? 0 : -1}
                          aria-label={`View details for ${project.title}`}
                      >
                          {/* Memanggil komponen kartu yang sudah disederhanakan */}
                          <ProjectCard3D
                            project={project}
                            shadowClass={shadowClass || ''}
                            isFlipped={offset === 0 && isFlipped} // Memberikan state 'isFlipped'
                            isActive={offset === 0} // Prop baru untuk teks instruksi
                          />
                      </motion.div>
                  );
              })}
          </div>
        </motion.div>
        
        {/* Navigasi Titik (Tidak berubah) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative z-10 flex gap-2.5 mt-12 items-center justify-center"
        >
            {initialProjects.map((_, index) => (
                <button
                    key={index}
                    onClick={() => changeProject(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${activeProjectIndex === index ? 'w-8 bg-zinc-900' : 'w-3 bg-zinc-300 hover:bg-zinc-400'}`}
                    aria-label={`Go to project ${index + 1}`}
                />
            ))}
        </motion.div>
      </main>
    </>
  );
};

export default ProjectShowcase3DLayout;