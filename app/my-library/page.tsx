"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {

  Bookmark,

  getBookmarks,

} from "../lib/bookmarks";

export default function MyLibraryPage() {

  const [bookmarks, setBookmarks] =

    useState<Bookmark[]>([]);

  useEffect(() => {

    setBookmarks(getBookmarks());

  }, []);

  return (

    <main className="max-w-6xl mx-auto py-16">

      <h1 className="text-5xl font-black mb-12">

        My Library

      </h1>

      {bookmarks.length === 0 && (

        <div className="rounded-2xl border border-dashed p-10 text-center text-zinc-500">

          You haven't saved anything yet.

        </div>

      )}

      <div className="grid gap-6">

        {bookmarks.map((bookmark) => (

          <Link

            key={bookmark.id}

            href={`/${bookmark.type}s/${bookmark.slug}`}

            className="rounded-2xl border border-zinc-200 p-6 hover:border-orange-500"

          >

            <div className="text-sm text-orange-600 uppercase font-bold">

              {bookmark.type}

            </div>

            <div className="text-2xl font-bold mt-2">

              {bookmark.title}

            </div>

          </Link>

        ))}

      </div>

    </main>

  );

}