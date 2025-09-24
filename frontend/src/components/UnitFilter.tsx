import React from "react";

export default function UnitFilter({
  type,
  status,
  onTypeChange,
  onStatusChange,
}: {
  type: string;
  status: string;
  onTypeChange: (t: string) => void;
  onStatusChange: (s: string) => void;
}) {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <select
        value={type}
        onChange={e => onTypeChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All types</option>
        <option value="capsule">Capsule</option>
        <option value="cabin">Cabin</option>
      </select>

      <select
        value={status}
        onChange={e => onStatusChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All statuses</option>
        <option value="Available">Available</option>
        <option value="Occupied">Occupied</option>
        <option value="Cleaning In Progress">Cleaning In Progress</option>
        <option value="Maintenance Needed">Maintenance Needed</option>
      </select>
    </div>
  );
}
