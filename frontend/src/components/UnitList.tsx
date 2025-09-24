import { useEffect, useState } from "react";
import api from "../api";

type Unit = {
  id: number;
  name: string;
  type: string;
  status: string;
  lastUpdated: string;
};

export default function UnitList({ refresh }: { refresh: boolean }) {
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    api.get("/units").then(res => setUnits(res.data));
  }, [refresh]);

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.put(`/units/${id}`, { status });
      setUnits(units.map(u => (u.id === id ? { ...u, status } : u)));
    } catch (err: any) {
      alert(err.response.data.error);
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead> 
        <tr style={{ backgroundColor: "#FF8EC1" }}>
          <th className="p-2 border text-white">Name</th>
          <th className="p-2 border text-white">Type</th>
          <th className="p-2 border text-white">Status</th>
          <th className="p-2 border text-white">Update</th>
        </tr>
      </thead>
      <tbody>
        {units.map(u => (
          <tr key={u.id} className="hover:bg-gray-50">
            <td className="p-2 border">{u.name}</td>
            <td className="p-2 border">{u.type}</td>
            <td className="p-2 border">{u.status}</td>
            <td className="p-2 border">
              <select
                className="border rounded px-2 py-1"
                value={u.status}
                onChange={e => updateStatus(u.id, e.target.value)}
              >
                <option>Available</option>
                <option>Occupied</option>
                <option>Cleaning In Progress</option>
                <option>Maintenance Needed</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
