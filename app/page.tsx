"use client";

import { useEffect, useState } from "react";

import turnsSupabaseRepository from "./(modules)/(turns-generation)/(repositories)/turnsSupabaseRepository";

import TurnCreationForm from "./(modules)/(turns-generation)/(components)/TurnCreationForm/TurnCreationForm";
import { Button } from "@/components/ui/button";

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
      {/* <TurnCreationForm onSubmit={onCreateTurn} /> */}

      {/* Información de turno del usuario */}
      <div className="text-center">
        <h3>Superman</h3>
        <div>
          <h2>Su turno es</h2>
          <h1>#1</h1>
        </div>
        <Button variant="destructive">Cancelar turno</Button>
      </div>

      <p>---------------------------------------</p>
      <p>---------------------------------------</p>

      {turnsList.length}
      {turnsList.map((turn, index) => (
        <div key={index}>{turn.name}</div>
      ))}
    </div>
  );
}
