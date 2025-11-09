'use client';
import { FloatingDock } from "@/components/ui/floating-dock";
import { 
    Nav, 
    NavBody, 
    NavItems, 
    NavbarLogo,
    TakeMeButton // <-- 1. Di-import kembali
} from "@/components/ui/resizable-navbar";

// --- IMPORT ICON BARU ---
import { 
    IconHome, 
    IconUser, 
    IconMail, 
    IconCode, // Baru
    IconAppWindow, // Baru
    IconCertificate // Baru
} from "@tabler/icons-react";
import React, { useEffect } from "react";

// --- Data Navigasi Terpadu ---

interface NavItem { 
  title: string;
  icon: React.ReactNode;
  href: string;
}

// Data ini digunakan oleh FloatingDock
const navItems: NavItem[] = [
  { title: "Home", icon: <IconHome className="h-4 w-4" />, href: "#home" },
  { title: "About", icon: <IconUser className="h-4 w-4" />, href: "#about" },
  { title: "Skills", icon: <IconCode className="h-4 w-4" />, href: "#skill" }, 
  { title: "Project", icon: <IconAppWindow className="h-4 w-4" />, href: "#project" }, 
  { title: "Certificate", icon: <IconCertificate className="h-4 w-4" />, href: "#certificate" }, 
];

// Data ini di-map untuk NavItems (desktop) agar sesuai tipe { name, link }
const navItemsData = navItems.map(item => ({
    name: item.title,
    link: item.href,
}));


// --- Komponen Navbar ---

export default function Navbar() {

  // Efek untuk scroll ke atas saat reload
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []); 

  
  const handleItemClick = () => {
    console.log("Nav item clicked");
  };

  return (
    <div>
      {/* 1. FloatingDock - Menggunakan data asli {title, icon, href} */}
      <FloatingDock 
        items={navItems} 
        className="fixed bottom-4 inset-x-0 w-fit mx-auto" 
      />

      {/* 2. Resizable Navbar - HANYA MODE DESKTOP */}
      <Nav> 
        
        <NavBody>
            <NavbarLogo />
            
            {/* Menggunakan data 'navItemsData' yang sudah di-map */}
            <NavItems 
                items={navItemsData} 
                className="mx-auto" 
                onItemClick={handleItemClick}
            />
            
            {/* --- 2. TakeMeButton Ditambahkan kembali --- */}
            <TakeMeButton />
            
        </NavBody>
        
      </Nav>
      
    </div>
  );
}