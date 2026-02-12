import { getUsers } from "../utils/storage";

export default function Dashboard({ currentUser, goBack }) {
  const users = getUsers();
  const userData = users[currentUser];

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <button onClick={goBack} className="mb-6 bg-yellow-500 px-4 py-2 rounded">
        ⬅ Back
      </button>

      <h1 className="text-3xl text-yellow-400 mb-6">📊 Dashboard - {userData.name}</h1>

      {Object.keys(userData.mantraData).map((mantra) => (
        <div key={mantra} className="bg-gray-900 p-6 rounded-xl mb-6">
          <h2 className="text-xl text-yellow-300 capitalize mb-3">{mantra}</h2>
          <p>Total Count: {userData.mantraData[mantra].totalCount}</p>

          <h3 className="mt-4 text-pink-400">Date Wise Data:</h3>
          {Object.entries(userData.mantraData[mantra].dailyCounts).map(([date, count]) => (
            <p key={date}>{date} → {count}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
