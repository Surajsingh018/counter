import React, { useState, useEffect } from "react";

export default function Counter() {
  const today = new Date().toISOString().split("T")[0];

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("krishnaCounter");
    if (saved) return JSON.parse(saved);

    return {
      totalCount: 0,
      dailyCounts: {},
    };
  });

  const totalCount = data.totalCount;
  const todayCount = data.dailyCounts[today] || 0;

  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().split("T")[0];
  const yesterdayCount = data.dailyCounts[yesterday] || 0;

  const cycle = Math.floor(totalCount / 108);

  useEffect(() => {
    localStorage.setItem("krishnaCounter", JSON.stringify(data));
  }, [data]);

  const increaseCount = () => {
    setData((prev) => ({
      totalCount: prev.totalCount + 1,
      dailyCounts: {
        ...prev.dailyCounts,
        [today]: (prev.dailyCounts[today] || 0) + 1,
      },
    }));
  };

  const resetAll = () => {
    localStorage.removeItem("krishnaCounter");
    setData({
      totalCount: 0,
      dailyCounts: {},
    });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden text-white">

      <div className="absolute inset-0 pointer-events-none opacity-5 text-5xl font-bold whitespace-nowrap animate-[scroll_40s_linear_infinite]">
        {Array(30).fill("🛕 Radhe Krishna 🙏 ").join("")}
      </div>

      <div className="relative bg-gray-900/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 text-center w-96 border border-yellow-600">

        <h1 className="text-2xl font-bold text-yellow-400 mb-4">
          🛕 राधा
        </h1>

        <p className="text-4xl font-bold text-yellow-300">
          Total: {totalCount}
        </p>

        <p className="mt-2 text-lg text-green-400">
          Today: {todayCount}
        </p>

        <p className="text-lg text-pink-400">
          Yesterday: {yesterdayCount}
        </p>

        <p className="mt-2 text-md text-blue-400">
          Cycle : {cycle}
        </p>

        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={increaseCount}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition"
          >
            Chant +1
          </button>

          <button
            onClick={resetAll}
            className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-lg transition"
          >
            Reset
          </button>
        </div>

      </div>
      
      <style>
        {`
          @keyframes scroll {
            from { transform: translateX(-100%); }
            to { transform: translateX(100%); }
          }
        `}
      </style>

    </div>
  );
}
