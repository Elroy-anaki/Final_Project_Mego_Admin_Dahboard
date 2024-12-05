import React from 'react'
import { AddButton } from "../../buttons/addButtons";
function Home() {
  const handleAdd = () => {
    alert("Button clicked!");
  };

  return (
    <div>
    <div>
      Home
    </div>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <AddButton text="Add Item" onClick={handleAdd} />
    </div>
    </div>
  );
}

export default Home

