"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  utcTime: string;
  className?: string;
}

export default function CountdownTimer({ utcTime, className = "" }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState<string>("");
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const target = new Date(utcTime);
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("LIVE NOW");
        setIsLive(true);
        return;
      }

      setIsLive(false);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setCountdown(`${hours}h ${minutes}m`);
      } else if (minutes > 0) {
        setCountdown(`${minutes}m ${seconds}s`);
      } else {
        setCountdown(`${seconds}s`);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [utcTime]);

  return (
    <div className={`flex items-center gap-1.5 font-mono text-xs font-bold ${className}`}>
      <Clock className={`w-3.5 h-3.5 ${isLive ? "text-red-500 animate-pulse" : "text-zinc-400"}`} />
      <span className={isLive ? "text-red-600 font-bold" : "text-zinc-600"}>
        {countdown}
      </span>
    </div>
  );
}
