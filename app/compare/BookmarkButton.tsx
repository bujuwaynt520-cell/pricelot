"use client";

import { useState } from "react";

import {

  toggleBookmark

} from "../lib/bookmarks";

interface Props {

  id: string;

  title: string;

  slug: string;

  type: string;

}

export default function BookmarkButton({

  id,

  title,

  slug,

  type,

}: Props) {

  const [saved, setSaved] = useState(false);

  return (

    <button

      onClick={() =>

        setSaved(

          toggleBookmark({

            id,

            title,

            slug,

            type,

          })

        )

      }

      className="rounded-xl border px-5 py-3"

    >

      {saved ? "★ Saved" : "☆ Save"}

    </button>

  );

}