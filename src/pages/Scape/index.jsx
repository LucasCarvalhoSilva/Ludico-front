import { useState, useEffect, useCallback } from "react";
import { Header } from "../../components/Header";

export function Scape() {
  const [isCreating, setIsCreating] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isCreating ? (
        <div className="h-screen w-screen bg-zinc-900">
          <Header title="Create Scape" />
          <div className="flex flex-col items-center mt-8">

          </div>
        </div>
      ) : (
        <div>
          <h1>Edit Scape</h1>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Stop Editing' : 'Start Editing'}
          </button>
          
        </div>
      )}
    </>
  )
}