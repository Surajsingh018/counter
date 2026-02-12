export default function MantraSelector({ selected, setSelected }) {
  const options = [
    { key: "radha", label: "श्री राधा" },
    { key: "ram", label: "श्री राम" },
    { key: "shiva", label: "ॐ नमः शिवाय" },
  ];

  return (
    <div className="flex gap-4 justify-center mt-4">
      {options.map((o) => (
        <button
          key={o.key}
          onClick={() => setSelected(o.key)}
          className={`px-4 py-2 rounded-lg ${
            selected === o.key ? "bg-yellow-500 text-black" : "bg-gray-700"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
