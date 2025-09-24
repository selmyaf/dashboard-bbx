export type UnitStatus = "Available" | "Occupied" | "Cleaning In Progress" | "Maintenance Needed";

export interface Unit {
  id: number;
  name: string;
  type: "capsule" | "cabin";
  status: UnitStatus;
  lastUpdated: string;
}
