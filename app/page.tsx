"use client";
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const hasAccount = localStorage.getItem('hasAccount') === 'true';

    if (!token) {
      router.replace('/login');
      return;
    }

    if (!hasAccount) {
      router.replace('/signup');
      return;
    }

    router.replace('/dashboard');
    setIsChecking(false);
  }, [router]);

  return (
    <main className='min-h-screen bg-white px-4 text-black sm:px-6 lg:px-8'>
      <section className='flex min-h-screen items-center justify-center'>
        <div className='flex w-full max-w-sm flex-col items-center rounded-lg p-8 text-center'>
          <Image
            src='/logo.svg'
            width={180}
            height={64}
            alt='Cloud logo'
          />
          <p className='mt-4 text-sm text-black/70'>
            {isChecking ? 'Checking your account...' : 'Redirecting...'}
          </p>
        </div>
      </section>
    </main>
  );
}