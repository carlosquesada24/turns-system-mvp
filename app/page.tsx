"use client";

import { useState } from "react";
import TurnCreationForm from "./(modules)/(turns-generation)/(components)/TurnCreationForm/TurnCreationForm";

export default function Home() {
  const [turnsList, setTurnsList] = useState<any[]>([]);

  const onCreateTurn = (formValues: any) => {
    alert("Turn created");

    setTurnsList([...turnsList, formValues]);
  };

  return (
    <div className="">
      <TurnCreationForm onSubmit={onCreateTurn} />
    </div>
  );
}
