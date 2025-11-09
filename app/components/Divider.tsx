"use client";

import React from "react";

/**
 * Komponen divider visual berbentuk lengkungan horizontal (arc) yang elegan.
 * Didesain untuk menciptakan transisi yang lembut antar section website.
 * @returns {JSX.Element}
 */
export default function PlanetaryHorizonDivider() {
  return (
    // Kontainer utama yang menentukan tinggi divider dan memungkinkan tumpang tindih
    // dengan section di atasnya menggunakan margin negatif.
    // 'pointer-events-none' memastikan elemen ini tidak bisa di-klik atau mengganggu interaksi user.
    <div
      className="relative w-full h-32 md:h-40 -mt-16 md:-mt-20 pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Elemen ini adalah "planet" besar yang bagian atasnya membentuk lengkungan */}
        <div
          className={
            "absolute " +
            // Lebar 200% dari parent membuat lengkungan lebih landai dan halus.
            "w-[200%] sm:w-[150%] h-[30rem] " +
            // Diposisikan di bawah kontainer, sehingga hanya puncak lingkarannya yang terlihat.
            "-bottom-80 " +
            // Centering horizontal yang presisi.
            "left-1/2 -translate-x-1/2 " +
            // Bentuk dasar lingkaran.
            "rounded-full " +
            // Warna untuk mode terang: lengkungan gelap subtil.
            "bg-neutral-900/10 " +
            // Warna untuk mode gelap: lengkungan putih dengan glow lembut.
            "dark:bg-white/5 " +
            // Efek blur menciptakan 'glow' di tepian, menyatukannya dengan background.
            "blur-3xl"
          }
        ></div>
      </div>
    </div>
  );
}

