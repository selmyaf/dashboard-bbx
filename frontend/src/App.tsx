import { useState } from "react";
import AddUnitForm from "./components/AddUnitForm";
import UnitList from "./components/UnitList";
import "./index.css";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1
        className="text-3xl font-bold text-center mb-6"
        style={{ color: "black" }}
      >
        Unit Management Dashboard
      </h1>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <AddUnitForm onAdded={() => setRefresh(!refresh)} />
        <UnitList refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
