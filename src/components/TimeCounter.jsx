import React, { useState, useEffect } from 'react';
import { Clock, Heart, Sparkles, Gift } from 'lucide-react';

export default function TimeCounter() {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const dob = new Date('2005-09-03T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diffMs = now - dob;

      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const years = Math.floor(totalDays / 365.25);
      const remainingDays = Math.floor(totalDays % 365.25);
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      setTimeElapsed({
        years,
        days: remainingDays,
        hours,
        minutes,
        seconds
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-white/80 backdrop-blur-md shadow-xl border border-pink-200 text-center my-6">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Clock className="w-5 h-5 text-rose-500 animate-spin" />
        <span className="font-rounded font-bold text-xs uppercase tracking-wider text-rose-600">
          Chitruuu's Life Ticker ⏳
        </span>
      </div>

      <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-700 font-bold mb-1">
        Spreading Joy Since Sept 3, 2005 💕
      </h3>
      <p className="font-body text-xs text-rose-900/70 mb-4">
        You've been making the world a brighter place for:
      </p>

      {/* Grid Counter Badges */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        <div className="bg-rose-50 p-2 sm:p-3 rounded-2xl border border-rose-200/60 shadow-sm flex flex-col items-center">
          <span className="font-rounded font-bold text-xl sm:text-2xl text-rose-600">
            {timeElapsed.years}
          </span>
          <span className="font-body text-[10px] sm:text-xs text-rose-400 font-medium uppercase">Years</span>
        </div>

        <div className="bg-rose-50 p-2 sm:p-3 rounded-2xl border border-rose-200/60 shadow-sm flex flex-col items-center">
          <span className="font-rounded font-bold text-xl sm:text-2xl text-rose-600">
            {timeElapsed.days}
          </span>
          <span className="font-body text-[10px] sm:text-xs text-rose-400 font-medium uppercase">Days</span>
        </div>

        <div className="bg-rose-50 p-2 sm:p-3 rounded-2xl border border-rose-200/60 shadow-sm flex flex-col items-center">
          <span className="font-rounded font-bold text-xl sm:text-2xl text-rose-600">
            {timeElapsed.hours}
          </span>
          <span className="font-body text-[10px] sm:text-xs text-rose-400 font-medium uppercase">Hrs</span>
        </div>

        <div className="bg-rose-50 p-2 sm:p-3 rounded-2xl border border-rose-200/60 shadow-sm flex flex-col items-center">
          <span className="font-rounded font-bold text-xl sm:text-2xl text-rose-600">
            {timeElapsed.minutes}
          </span>
          <span className="font-body text-[10px] sm:text-xs text-rose-400 font-medium uppercase">Mins</span>
        </div>

        <div className="bg-rose-50 p-2 sm:p-3 rounded-2xl border border-rose-200/60 shadow-sm flex flex-col items-center">
          <span className="font-rounded font-bold text-xl sm:text-2xl text-rose-600 animate-pulse">
            {timeElapsed.seconds}
          </span>
          <span className="font-body text-[10px] sm:text-xs text-rose-400 font-medium uppercase">Secs</span>
        </div>
      </div>
    </div>
  );
}
