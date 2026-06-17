import Link from 'next/link';

export default function SignupPage() {
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

            <form className='w-full sm:max-w-sm'>
              <div className='space-y-3'>
                <input
                  type='text'
                  name='userName'
                  placeholder='Username'
                  className='w-full border border-black rounded-sm bg-white px-3 py-3 text-sm outline-none transition focus:-translate-y-0.5'
                />
                <input
                  type='email'
                  name='email'
                  placeholder='example@gmail.com'
                  className='w-full border border-black rounded-sm bg-white px-3 py-3 text-sm outline-none transition focus:-translate-y-0.5'
                />
                <label htmlFor="password" className="font-bold">Password</label>
                <input
                  type='password'
                  name='password'
                  placeholder='........'
                  className='w-full border border-black rounded-sm bg-white px-3 py-3 text-sm outline-none transition focus:-translate-y-0.5'
                />
                <button
                  type='submit'
                  className='w-full border border-black rounded-md bg-black px-3 py-3 text-sm text-white transition-colors hover:bg-white hover:text-black'
                >
                  Sign Up
                </button>
               <p>Already have an account? <span><Link href="/login" className='font-semibold hover:underline'>Login</Link></span></p>
                <Link href="/forgotpassword" className='font-semibold hover:underline'>Forgot Password?</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}