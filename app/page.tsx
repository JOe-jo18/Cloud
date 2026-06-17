import Link from 'next/link';

export default function Page() {
  return (
    <main className='min-h-screen bg-white px-4 text-black sm:px-6 lg:px-8'>
      <section className='flex min-h-screen items-center justify-center'>
        <div className='flex w-full max-w-md flex-col items-center rounded-lg border border-black p-6 text-center shadow-sm sm:max-w-lg sm:p-8'>
          <h1 className='text-3xl font-bold sm:text-4xl'>Welcome to Cloud</h1>
          <div className='mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center'>
            <Link
              href="/signup"
              className='rounded border border-black px-4 py-2 transition-colors hover:bg-black hover:text-white'
            >
              Signup
            </Link>
            <Link
              href="/login"
              className='rounded border border-black px-4 py-2 transition-colors hover:bg-black hover:text-white'
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}