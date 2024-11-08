import React, { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import turnsSupabaseRepository from "../(modules)/(turns-generation)/(repositories)/turnsSupabaseRepository";
import { Turn } from "../(models)/(turns)/interfaces";
import { TURNS_APP_EMPTY_STATE } from "../(models)/(turns)/constants/localStorage";
import supabase from "../(utils)/supabase";

const useTurns = () => {
  const [turnsList, setTurnsList] = useState<Turn[]>([]);
  const [currentTurnNumber, setCurrentTurnNumber] = useState<number>(
    turnsList.length > 0 ? turnsList[0].number : 0
  );
  const [isLastTurn, setIsLastTurn] = useState<boolean>(false);

  const advanceTurn = () => {
    // Remove current turn from turnsList
    // - supabase
    const turnToDeleteOnSupabase = turnsList[0];
    deleteTurnOnSupabase(turnToDeleteOnSupabase.id);

    // Filter turnsList array locally
    const updatedTurnsList = turnsList.slice(1);
    setTurnsList(updatedTurnsList);

    // Update currentTurnNumber
    const nextTurn = updatedTurnsList[0].number;
    setCurrentTurnNumber(nextTurn);

    if (updatedTurnsList.length === 1) {
      setIsLastTurn(true);
    } else {
      setIsLastTurn(false);
    }

    alert(`Turno ha sido avanzado con éxito`);
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

  const sortTurnsList = (turnsList: Turn[]) => {
    return turnsList.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  };

  useEffect(() => {
    const handleFetchAllTurns = async () => {
      const fetchedTurnsList = await turnsSupabaseRepository.getAllTurns();

      // Sort turnsList by created_at
      const sortedTurnsList = sortTurnsList(fetchedTurnsList);
      setTurnsList(sortedTurnsList);

      setCurrentTurnNumber(fetchedTurnsList[0].number);
    };

    handleFetchAllTurns();

    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Turns" },
        (payload) => {
          console.log("Change received!", payload);
          handleFetchAllTurns();
        }
      )
      .subscribe();
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
    isLastTurn,
    saveTurn,
    deleteTurn,
    advanceTurn,
  };
};

export default useTurns;
