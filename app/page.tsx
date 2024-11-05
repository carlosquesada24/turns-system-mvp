"use client";

import { useEffect, useState } from "react";

import turnsSupabaseRepository from "./(modules)/(turns-generation)/(repositories)/turnsSupabaseRepository";

import TurnCreationForm from "./(modules)/(turns-generation)/(components)/TurnCreationForm/TurnCreationForm";

export default function Home() {
  const [turnsList, setTurnsList] = useState<any[]>([]);

  useEffect(() => {
    const handleFetchAllTurns = async () => {
      const fetchedTurnsList = await turnsSupabaseRepository.getAllTurns();
      setTurnsList(fetchedTurnsList);
    };

    handleFetchAllTurns();
  }, []);

  const onCreateTurn = async (formValues: any) => {
    alert("Turn created");

    setTurnsList([...turnsList, formValues]);

    const turnToSave = {
      ...formValues,
      id: crypto.randomUUID(),
    };

    await turnsSupabaseRepository.saveTurn(turnToSave);
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
