import React, { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import turnsSupabaseRepository from "../(modules)/(turns-generation)/(repositories)/turnsSupabaseRepository";
import { Turn } from "../(models)/(turns)/interfaces";
import { TURNS_APP_EMPTY_STATE } from "../(models)/(turns)/constants/localStorage";

const useTurns = () => {
  const [turnsList, setTurnsList] = useState<Turn[]>([]);
  const [currentTurnNumber, setCurrentTurnNumber] = useState<number>(
    turnsList.length > 0 ? turnsList[0].number : 0
  );

  const advanceTurn = () => {
    const newTurnsList = turnsList.slice(1);

    const nextTurn = newTurnsList[0].number;

    setTurnsList(newTurnsList);
    setCurrentTurnNumber(nextTurn);

    alert(`Next turn is: ${nextTurn}`);
  };

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

      setCurrentTurnNumber(fetchedTurnsList[0].number);
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

  const saveTurnOnSupabase = async (turn: Turn): Promise<Turn> => {
    return await turnsSupabaseRepository.saveTurn(turn);
  };

  const saveTurnOnLocalStorage = (turnToSave: Turn) => {
    setValue({
      ...storedValue,
      userTurn: turnToSave,
    });
  };

  const deleteTurn = (turnId: string) => {
    deleteTurnOnLocalStorage();
    deleteTurnOnSupabase(turnId);

    // Remove turn from turnsList
    const updatedTurnsList = turnsList.filter((turn) => turn.id !== turnId);
    setTurnsList(updatedTurnsList);

    setIsTurnCreated(false);

    alert("Turn deleted successfully");
  };

  const deleteTurnOnLocalStorage = () =>
    setValue({ userTurn: {}, isBarberUser: false });

  const deleteTurnOnSupabase = async (turnId: string) => {
    await turnsSupabaseRepository.deleteTurn(turnId);
  };

  return {
    turnsList,
    userTurn,
    isTurnCreated,
    currentTurnNumber,
    saveTurn,
    deleteTurn,
    advanceTurn,
  };
};

export default useTurns;
