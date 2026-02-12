import { useState, useEffect } from "react";
import { getUsers, saveUsers, getToday } from "../utils/storage";
import MantraSelector from "../components/MantraSelector";
import CounterCard from "../components/CounterCard";
import AudioPlayer from "../components/AudioPlayer";

export default function Home({ currentUser, setCurrentUser }) {
  const [users, setUsers] = useState(getUsers());
  const [selected, setSelected] = useState(
    users[currentUser]?.lastSelected || "radha",
  );

  useEffect(() => saveUsers(users), [users]);

  const mantraData = users[currentUser].mantraData[selected];

  const updateCount = () => {
    const today = getToday();
    const updated = { ...users };
    const mantra = updated[currentUser].mantraData[selected];

    mantra.totalCount += 1;
    mantra.dailyCounts[today] = (mantra.dailyCounts[today] || 0) + 1;

    setUsers(updated);
  };

  const reset = () => {
    const updated = { ...users };
    updated[currentUser].mantraData[selected] = {
      totalCount: 0,
      dailyCounts: {},
    };
    setUsers(updated);
  };

  // Auto reset at 12 AM
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        const updated = { ...users };
        Object.keys(updated[currentUser].mantraData).forEach((mantra) => {
          updated[currentUser].mantraData[mantra].dailyCounts = {};
        });
        setUsers(updated);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [currentUser, users]);

  const mantraInfo = {
    radha: { title: "श्री राधा", subtitle: " राधे राधे" },
    ram: { title: "श्री राम", subtitle: "जय श्री राम" },
    shiva: { title: "ॐ नमः शिवाय", subtitle: "हर हर महादेव" },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h2 className="text-yellow-400 mb-2">
        Welcome {users[currentUser].name}
      </h2>

      <MantraSelector selected={selected} setSelected={setSelected} />

      <CounterCard
        data={mantraData}
        updateCount={updateCount}
        reset={reset}
        title={mantraInfo[selected].title}
        subtitle={mantraInfo[selected].subtitle}
      />

      <AudioPlayer
        selected={selected}
        currentUser={currentUser}
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
}
