import { getToday, getYesterday } from "../utils/storage";

export default function CounterCard({ data, updateCount, reset, title, subtitle }) {
  const today = getToday();
  const yesterday = getYesterday();

  const total = data.totalCount;
  const todayCount = data.dailyCounts[today] || 0;
  const yesterdayCount = data.dailyCounts[yesterday] || 0;
  const cycle = Math.floor(total / 108);

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  });

  return (
    <div className="bg-gray-900 p-6 rounded-xl mt-6 w-96 text-center border border-yellow-500">
      <h2 className="text-3xl font-bold text-yellow-400">{title}</h2>
      <p className="text-lg text-pink-300">{subtitle}</p>

      <p className="text-5xl font-bold text-yellow-300 mt-4">{total}</p>
      <p className="text-green-400 mt-2">Today: {todayCount}</p>
      <p className="text-pink-400">Yesterday: {yesterdayCount}</p>
      <p className="text-blue-400">Cycle: {cycle}</p>

      <div className="flex gap-4 justify-center mt-6">
        <button onClick={updateCount} className="px-4 py-2 bg-yellow-500 text-black rounded-lg">
          📿 जप करें
        </button>
        <button onClick={reset} className="px-4 py-2 bg-red-600 text-white rounded-lg">
          🔄 रीसेट
        </button>
      </div>

      <div className="mt-4 text-left">
        <h3 className="text-yellow-400 mb-2">Last 7 Days:</h3>
        {last7Days.map((day) => (
          <p key={day}>{day} → {data.dailyCounts[day] || 0}</p>
        ))}
      </div>
    </div>
  );
}
