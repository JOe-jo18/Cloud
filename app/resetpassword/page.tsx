'use client';
import Link from 'next/link';
import { useState } from 'react';
import { resetPassword } from '../lib/api-helpers';

export default function passwordReset() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setMessage("");

        try {
            const result = await resetPassword(email, newPassword);

            if (result?.message) {
                setMessage(result.message);
            } else {
                setMessage("Password updated successfully.");
            }
        } catch (err) {
            setMessage("Something went wrong while resetting the password.");
        }
    }

    return (
        <main className='min-h-screen bg-white px-4 py-10 text-black sm:px-6 lg:px-8'>
      <section className='flex min-h-screen items-center justify-center'>
        <div className='w-full max-w-5xl rounded-none border border-black bg-white p-6 shadow-md sm:p-8'>
          <div className='flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between'>
            <div className='sm:max-w-sm'>
              <p className='text-3xl font-semibold tracking-tight'>Reset Cloud Password</p>
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
                <label htmlFor="password" className="font-bold">Email</label>
                <input
                  type='email'
                  name='email'
                  placeholder='example@gmail.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full border border-black rounded-sm bg-white px-3 py-3 text-sm outline-none transition focus:-translate-y-0.5'
                />
                <label htmlFor="password" className="font-bold">Password</label>
                <input
                  type='password'
                  name='newPassword'
                  placeholder='........'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='w-full border border-black rounded-sm bg-white px-3 py-3 text-sm outline-none transition focus:-translate-y-0.5'
                />

                  <button
                  type='submit'
                  className='w-full border border-black rounded-md bg-black px-3 py-3 text-sm text-white transition-colors hover:bg-white hover:text-black'
                 >
                   Reset Password
                </button>
                {message && <p>{message}</p>}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
    )
}