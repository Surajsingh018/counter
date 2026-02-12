import { useRef, useState, useEffect } from "react";

export default function AudioPlayer({ selected, currentUser, users, setUsers }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const musicFiles = {
    radha: "/radha.mp3",
    ram: "/ram.mp3",
    shiva: "/shiva.mp3",
  };

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.src = musicFiles[selected];
    audioRef.current.load();
    setIsPlaying(false);

    const updatedUsers = { ...users };
    updatedUsers[currentUser].lastSelected = selected;
    setUsers(updatedUsers);

  }, [selected]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) audioRef.current.pause();
      else await audioRef.current.play();
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.log("Audio play error:", err);
    }
  };

  return (
    <div className="mt-6 text-center">
      <audio ref={audioRef} loop />
      <button onClick={togglePlay} className="px-4 py-2 bg-purple-600 rounded-lg">
        {isPlaying ? "Pause Aarti" : "Play Aarti"}
      </button>
    </div>
  );
}
