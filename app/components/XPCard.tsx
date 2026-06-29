"use client";

import { useEffect, useState } from "react";

import { getStudentProgress } from "../lib/progressEngine";

export default function XPCard() {

  const [xp, setXp] = useState(0);

  useEffect(() => {

    setXp(getStudentProgress().xp);

  }, []);

  return (

    <div className="rounded-2xl bg-orange-500 text-white p-8">

      <div className="text-sm uppercase tracking-widest">

        Experience

      </div>

      <div className="text-5xl font-black mt-3">

        {xp} XP

      </div>

    </div>

  );

}