'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar";

export default function Page() {
    return (
         <div className='min-h-screen bg-white'>
                    <Navbar />
                    <div className='flex'>
                        <Sidebar />
                        <main className='flex-1 p-6'>
                            <MainContent />
                        </main>
                    </div>
                </div>
    )
}

 function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => setIsOpen(!isOpen);
  return (
    <div className='w-full bg-white'>
      <nav className='flex items-center justify-between px-5 py-3'>
        <div className='flex items-center gap-3'>
          <Image src='/logo.svg' width={85} height={64} alt='Cloud logo' />

          <div className='relative flex items-center'>
            <input
              type='search'
              placeholder='Search in Cloud'
              className={`
                rounded-full border border-gray-300 bg-gray-50 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none
                transition-all duration-300 ease-in-out 
                ${isOpen ? 'w-[230px] opacity-100 pl-4 pr-10' : 'w-0 border-transparent opacity-0 p-0'}
              `}
            />

            <button
              onClick={toggleSearch}
              type='button'
              className={`
                absolute top-1/2 -translate-y-1/2 text-black transition-colors hover:text-gray-800 text-2xl font-semibold 
                ${isOpen ? 'right-3' : 'left-0'}
              `}
              aria-label='Toggle search'
            >
              ⌕
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}


function MainContent() {
    return (
        <div>
            <p>Hi</p>
        </div>
    )
}