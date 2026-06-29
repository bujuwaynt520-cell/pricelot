"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Activity,
  getActivity,
} from "../lib/activityEngine";

export default function RecentlyViewed(){

  const [items,setItems]=useState<Activity[]>([]);

  useEffect(()=>{

    setItems(getActivity());

  },[]);

  if(items.length===0) return null;

  return(

    <section className="mt-20">

      <h2 className="text-3xl font-black mb-8">

        Recently Viewed

      </h2>

      <div className="space-y-4">

        {items.slice(0,5).map(item=>(

          <Link

            key={item.id}

            href={item.slug}

            className="block border rounded-xl p-5 hover:border-orange-500 transition"

          >

            <div className="text-xs uppercase text-orange-600 font-bold">

              {item.type}

            </div>

            <div className="font-bold mt-1">

              {item.title}

            </div>

          </Link>

        ))}

      </div>

    </section>

  );

}