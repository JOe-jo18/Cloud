'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../lib/api-helpers';
import { LoginResponse } from '../lib/types';

export default function LoginPage() {
   const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

   if (!username.trim() || !password.trim()) {
    setError('Please enter both username and password.');
    return;
   }
   
   setLoading(true);

   try {
    const response = (await loginUser(username, password)) as LoginResponse;
    if (response.success) {
    router.push('/dashboard');
    }
   } catch (err) {
    setError('Invalid username or password.');
   } finally {
    setLoading(false);
   }
   }

  return (
    <main className='min-h-screen bg-white px-4 py-10 text-black sm:px-6 lg:px-8'>
      <section className='flex min-h-screen items-center justify-center'>
        <div className='w-full max-w-5xl rounded-none border border-black bg-white p-6 shadow-md sm:p-8'>
          <div className='flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between'>
            <div className='sm:max-w-sm'>
              <p className='text-3xl font-semibold tracking-tight'>Login to your Cloud Account</p>
              <p className='mt-3 text-sm leading-6 text-black/70'>
                Organize your files, share securely, and access everything from one place.
              </p>
              <div className='mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-black/60'>
                <span className='h-px w-8 bg-black'></span>
                Secure • Fast • Simple
              </div>
            </div>

            <form className='w-full sm:max-w-sm' onSubmit={handleSubmit}>
              <div className='space-y-3'>
                <input
                  type='text'
                  name='userName'
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='w-full border border-black rounded-sm bg-white px-3 py-3 text-sm outline-none transition focus:-translate-y-0.5'
                />
               
                <label htmlFor="password" className="font-bold">Password</label>
                <input
                  type='password'
                  name='password'
                  placeholder='........'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full border border-black rounded-sm bg-white px-3 py-3 text-sm outline-none transition focus:-translate-y-0.5'
                />

                 {error && <p style={{ color: 'red' }}>{error}</p>}

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full border border-black rounded-md bg-black px-3 py-3 text-sm text-white transition-colors hover:bg-white hover:text-black'
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <p>Don't have an account? <span><Link href="/signup" className='font-semibold hover:underline'>Signup</Link></span></p>
                <Link href="/resetpassword" className='font-semibold hover:underline'>Forgot Password?</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}