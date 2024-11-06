"use client";

import { useEffect, useState } from "react";

import turnsSupabaseRepository from "./(modules)/(turns-generation)/(repositories)/turnsSupabaseRepository";

import UsersTurnInformation from "./(modules)/(turns-generation)/(components)/UsersTurnInformation/UsersTurnInformation";
import TurnCreationForm from "./(modules)/(turns-generation)/(components)/TurnCreationForm/TurnCreationForm";

export default function Home() {
  const [turnsList, setTurnsList] = useState<any[]>([]);
  const [isTurnCreated, setIsTurnCreated] = useState(false);

  useEffect(() => {
    const handleFetchAllTurns = async () => {
      const fetchedTurnsList = await turnsSupabaseRepository.getAllTurns();
      setTurnsList(fetchedTurnsList);
    };

    handleFetchAllTurns();
  }, []);

  const onCreateTurn = async (formValues: any) => {
    alert("Turn created");

    const turnToSaveOnSupabase = {
      ...formValues,
      id: crypto.randomUUID(),
    };

    const savedTurn = await turnsSupabaseRepository.saveTurn(
      turnToSaveOnSupabase
    );

    const turnToSave = savedTurn ?? turnToSaveOnSupabase;

    // setTurnsList([...turnsList, formValues]);
    setTurnsList([...turnsList, turnToSave]);
    setIsTurnCreated(true);
  };

  return (
    <div className="">
      {!isTurnCreated && <TurnCreationForm onSubmit={onCreateTurn} />}

      {/* User's turn information */}
      {isTurnCreated && <UsersTurnInformation />}

      <p>---------------------------------------</p>
      <p>---------------------------------------</p>

      {turnsList.length}
      {turnsList.map((turn, index) => (
        <div
          key={index}
          // className={`${
          //   turn.name === "Superman" ? "bg-sky-600 text-white" : ""
          // }`}
        >
          {turn.name} - #{turn.position}
        </div>
      ))}
    </div>
  );
}
