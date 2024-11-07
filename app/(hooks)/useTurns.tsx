import React, { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import turnsSupabaseRepository from "../(modules)/(turns-generation)/(repositories)/turnsSupabaseRepository";
import { Turn } from "../(models)/(turns)/interfaces";
import { TURNS_APP_EMPTY_STATE } from "../(models)/(turns)/constants/localStorage";

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
    saveTurn,
    deleteTurn,
  };
};

export default useTurns;
