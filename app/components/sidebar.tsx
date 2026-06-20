import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IoHomeSharp } from "react-icons/io5";
import { FaFile } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { IoSettingsSharp } from "react-icons/io5";

export default function dashboardPage() {
    return (
        <div>
        <Sidebar />
        </div>
    )
}

function Sidebar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            if (
                menuRef.current &&
                !menuRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <aside className='w-full gap-3 bg-white p-3 sm:w-56 md:w-64 space-y-4'>
            <button
                ref={buttonRef}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="border border-gray-200 p-1 pr-5 pl-5 rounded-xl bg-gray-300 shadow-sm hover:bg-gray-100"
            >
                + New
            </button>
            <div
                ref={menuRef}
                className={`rounded-xl border border-gray-200 bg-gray-700 shadow-sm ${isMenuOpen ? '' : 'hidden'}`}
            >
                <button className='flex w-full items-center px-4 py-2 text-sm text-gray-100 transition hover:bg-gray-400 gap-2 hover:text-gray-700'>
                   <span className='text-base text-gray-100'><FaFile /></span> File
                </button>
                <div className='h-px bg-gray-200' />
                <button className='flex w-full items-center px-4 py-2 text-sm text-gray-100 transition hover:bg-gray-400 gap-2 hover:text-gray-700'>
                   <span className='text-base text-gray-100'><FaFolder /></span> Folder
                </button>
            </div>

            <div className='space-y-1'>
                <Link href="/dashboard" className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100'>
                    <span className='text-base text-gray-600'><IoHomeSharp /></span>
                    <span className='hidden sm:inline'>Home</span>
                </Link>
                <Link href="/dashboard/files" className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100'>
                    <span className='text-base text-gray-600'><FaFile /></span>
                    <span className='hidden sm:inline'>Files</span>
                </Link>
                <Link href="/dashboard/folders" className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100'>
                    <span className='text-base text-gray-600'><FaFolder /></span>
                    <span className='hidden sm:inline'>Folders</span>
                </Link>
            </div>

            <div className='space-y-1'>
                <Link href="/dashboard/favorites" className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100'>
                    <span className='text-base text-gray-600'><FaStar /></span>
                    <span className='hidden sm:inline'>Favorites</span>
                </Link>
                <Link href="/dashboard/recycle-bin" className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100'>
                    <span className='text-base text-gray-600'><ImBin /></span>
                    <span className='hidden sm:inline'>Recycle bin</span>
                </Link>
            </div>

            <Link href="/dashboard/settings" className='mt-auto flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100'>
                <span className='text-base text-gray-600'><IoSettingsSharp /></span>
                <span className='hidden sm:inline'>Settings</span>
            </Link>
        </aside>
    )
}