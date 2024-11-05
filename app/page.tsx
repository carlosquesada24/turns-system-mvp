"use client";

import { useState } from "react";
import TurnCreationForm from "./(modules)/(turns-generation)/(components)/TurnCreationForm/TurnCreationForm";

export default function Home() {
  const [turnsList, setTurnsList] = useState<any[]>([]);

  const onCreateTurn = () => {
    alert("Turn created");

    setTurnsList([...turnsList, { name: "Carlos" }]);
  };

  return (
    <div className="">
      <TurnCreationForm onSubmit={onCreateTurn} />
    </div>
  );
}
