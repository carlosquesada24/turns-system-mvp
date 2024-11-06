"use client";

import { useEffect, useState } from "react";

import turnsSupabaseRepository from "./(modules)/(turns-generation)/(repositories)/turnsSupabaseRepository";

import UsersTurnInformation from "./(modules)/(turns-generation)/(components)/UsersTurnInformation/UsersTurnInformation";
import TurnCreationForm from "./(modules)/(turns-generation)/(components)/TurnCreationForm/TurnCreationForm";
import useLocalStorage from "./(hooks)/useLocalStorage";

interface TurnsAppLocalStorage {
  userTurn:
    | {
        id: string;
        name: string;
        position: number;
      }
    | {};
}

const TURNS_APP_EMPTY_STATE: TurnsAppLocalStorage = {
  userTurn: {},
};

const TURNS_APP_NORMAL_STATE: TurnsAppLocalStorage = {
  userTurn: {
    id: "b7b24505-7d94-40f5-b98b-eba119c672bf",
    name: "The best superheroe",
    position: 1,
  },
};

export default function Home() {
  const [turnsList, setTurnsList] = useState<any[]>([]);

  const {
    storedValue: { userTurn },
  } = useLocalStorage("turnsApp", TURNS_APP_EMPTY_STATE);

  const [isTurnCreated, setIsTurnCreated] = useState(
    Object.keys(userTurn).length > 0
  );

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
      {isTurnCreated && (
        <UsersTurnInformation
          clientName={userTurn.name}
          turnNumber={userTurn.position}
        />
      )}

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
