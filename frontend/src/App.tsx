import { useState } from "react";
import AddUnitForm from "./components/AddUnitForm";
import UnitList from "./components/UnitList";
import UnitFilter from "./components/UnitFilter";
import "./index.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-500">
        Unit Management Dashboard
      </h1>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <AddUnitForm onAdded={() => setRefresh(!refresh)} />
        <UnitFilter
          type={typeFilter}
          status={statusFilter}
          onTypeChange={setTypeFilter}
          onStatusChange={setStatusFilter}
        />
        <UnitList refresh={refresh} typeFilter={typeFilter} statusFilter={statusFilter} />
      </div>
    </div>
  );
}

export default App;
