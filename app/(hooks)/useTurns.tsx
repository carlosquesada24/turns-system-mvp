import React, { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import turnsSupabaseRepository from "../(modules)/(turns-generation)/(repositories)/turnsSupabaseRepository";

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
interface Turn {
  id: string;
  name: string;
  position: number;
}

const useTurns = () => {
  const [turnsList, setTurnsList] = useState<Turn[]>([]);

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

  const saveTurn = async (formValues: any) => {
    alert("Turn created");

    const turnToSaveOnSupabase = {
      ...formValues,
      id: crypto.randomUUID(),
    };

    const savedTurn = await saveTurnOnSupabase(turnToSaveOnSupabase);
    saveTurnOnLocalStorage(savedTurn ?? turnToSaveOnSupabase);
    setTurnsList([...turnsList, savedTurn ?? turnToSaveOnSupabase]);

    setIsTurnCreated(true);
  };

  const saveTurnOnSupabase = async (turn: any): Promise<Turn> => {
    return await turnsSupabaseRepository.saveTurn(turn);
  };

  const saveTurnOnLocalStorage = (turnToSave: Turn) => {
    setValue({
      ...storedValue,
      userTurn: turnToSave,
    });
  };

  return {
    turnsList,
    userTurn,
    isTurnCreated,
    saveTurn,
  };
};

export default useTurns;
