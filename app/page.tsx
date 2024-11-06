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
    id: "cb442e86-3848-441c-bc24-041ee215264e",
    name: "Iron man",
    position: "8",
  },
};

export default function Home() {
  const [turnsList, setTurnsList] = useState<any[]>([]);

  const { storedValue, setValue } = useLocalStorage(
    "turnsApp",
    TURNS_APP_EMPTY_STATE
  );
  const { userTurn } = storedValue;

  const [isTurnCreated, setIsTurnCreated] = useState(
    userTurn !== null &&
      userTurn !== undefined &&
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

    // Save in localStorage
    setValue({
      ...storedValue,
      userTurn: turnToSave,
    });
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
