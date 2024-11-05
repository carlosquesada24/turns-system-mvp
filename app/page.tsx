"use client";

import { useState } from "react";
import TurnCreationForm from "./(modules)/(turns-generation)/(components)/TurnCreationForm/TurnCreationForm";
import supabase from "./(utils)/supabase";

export default function Home() {
  const [turnsList, setTurnsList] = useState<any[]>([]);

  const onCreateTurn = async (formValues: any) => {
    alert("Turn created");

    setTurnsList([...turnsList, formValues]);

    await supabase
      .from("Turns")
      .insert({ ...formValues, id: crypto.randomUUID() });
  };

  return (
    <div className="">
      <TurnCreationForm onSubmit={onCreateTurn} />
      {turnsList.length}
      {turnsList.map((turn, index) => (
        <div key={index}>{turn.name}</div>
      ))}
    </div>
  );
}
