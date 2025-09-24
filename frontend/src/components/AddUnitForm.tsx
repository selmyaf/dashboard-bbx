import { useState } from "react";
import api from "../api";

export default function AddUnitForm({ onAdded }: { onAdded: () => void }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("capsule");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/units", { name, type });
    setName("");
    onAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="border rounded px-3 py-2 flex-1"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Unit name"
        required
      />
      <select
        className="border rounded px-3 py-2"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        <option value="capsule">Capsule</option>
        <option value="cabin">Cabin</option>
      </select>
      <button
        type="submit"
        className="px-4 py-2 rounded font-bold"
        style={{
          backgroundColor: "#FFFFFF",   // bisa diganti #F3F4F6 atau #FED462
          color: "#FF8EC1",
          border: "2px solid #FF8EC1",
        }}
      >
        Add
      </button>
    </form>
  );
}
