'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar";
import { getCurrentUser } from '../lib/api-helpers';
import { createFolder, createFile, uploadFile } from '../lib/api-helpers';


export default function dashboardPage() {
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
    );
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
    const [greeting, setGreeting] = useState<string>("Hello");
    const [username, setUsername] = useState<string>("User");
    const [isDragging, setIsDragging] = useState<boolean>(false);
   
    useEffect(() => {
      // Greeting logic
        const hour = new Date().getHours();

        if (hour < 12) {
            setGreeting("Good morning");
        } else if (hour < 18) {
            setGreeting("Good afternoon");
        } else {
            setGreeting("Good evening");
        }

        // Logic to fetch user name from the backend
        const token = localStorage.getItem("token");
        if (!token) return;

        getCurrentUser(token)
        .then((res) => {
          const name = 
          res.data?.username ||
          res.data?.user?.username ||
          "User";

          setUsername(name);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
        });
    }, []);

    // Drag and Drop logic
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedItems = Array.from(e.dataTransfer.items);

      for (const item of droppedItems) {
        const entry = item.webkitGetAsEntry?.();

        if (entry?.isDirectory) {
          // Folder metadata
          await createFolder(entry.name);
        } else {
          const file = item.getAsFile();
          if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", file.name);

            await uploadFile(formData);
          }
        }
      }
    };

    return(
        <div className='w-full'>
         <h1 className="text-md md:text-2xl lg:text-2xl font-bold tracking-tight text-black dark:text-white">
            {greeting} {username}
         </h1>

           <div
           onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed p-10 pb-16 pt-16 text-center transition mt-5 ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
           >
            <p className="text-md text-gray-600">
          {isDragging
            ? "Drop your files here"
            : "Drag and drop files here"}
        </p>
           </div>

        </div>
    );
}