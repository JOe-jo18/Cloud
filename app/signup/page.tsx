'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from  'next/navigation';
import { signupUser } from '../lib/api-helpers';

export default function SignupPage() {

  // App router
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Email validation
  const  validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // Password validation
  const validatePassword = (value: string) => {
    return (
      value.length >= 8 &&
      /[A-Z]/.test(value) &&       // at least one uppercase
      /[a-z]/.test(value) &&       // at least one lowercase
      /\d/.test(value) &&          // at least one number
      /[^A-Za-z0-9]/.test(value)   // at least one special character
    );
  };

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.'
      );
      return;
    }

    setLoading(true);

    try {
      await signupUser(username, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Signup failed. Please try again.');
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
              <p className='text-3xl font-semibold tracking-tight'>Create Cloud Account</p>
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
                  value={username}
                  name='username'
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Username'
                  className='w-full border border-black rounded-sm bg-white px-3 py-3 text-sm outline-none transition focus:-translate-y-0.5'
                />
                <input
                  type='email'
                  value={email}
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='example@gmail.com'
                  className='w-full border border-black rounded-sm bg-white px-3 py-3 text-sm outline-none transition focus:-translate-y-0.5'
                />
                <label htmlFor="password" className="font-bold">Password</label>
                <input
                  type='password'
                  value={password}
                  name='password'
                   onChange={(e) => setPassword(e.target.value)}
                  placeholder='........'
                  className='w-full border border-black rounded-sm bg-white px-3 py-3 text-sm outline-none transition focus:-translate-y-0.5'
                />

                  {error && <p style={{ color: 'red' }}>{error}</p>}

                <button
                  type='submit'
                  className='w-full border border-black rounded-md bg-black px-3 py-3 text-sm text-white transition-colors hover:bg-white hover:text-black'
                  disabled={loading}
                >
                   {loading ? 'Signing up...' : 'Sign Up'}
                </button>
               <p>Already have an account? <span><Link href="/login" className='font-semibold hover:underline'>Login</Link></span></p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}