import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-20rem)] flex-1 items-center justify-center bg-zinc-50 px-6 py-24 dark:bg-zinc-950 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-zinc-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Go back home
          </Link>
          <Link
            href="/home"
            className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
          >
            Go to 2nd Home <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
