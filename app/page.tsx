"use client";

import UsersTurnInformation from "./(modules)/(turns-generation)/(components)/UsersTurnInformation/UsersTurnInformation";
import TurnCreationForm from "./(modules)/(turns-generation)/(components)/TurnCreationForm/TurnCreationForm";

import useTurns from "./(hooks)/useTurns";
import TurnsList from "./(modules)/(turns-display)/(components)/(TurnsList)/TurnsList";
import BarbersTurnInformation from "./(modules)/(turns-display)/(components)/BarbersTurnInformation/BarbersTurnInformation";
import useLocalStorage from "./(hooks)/useLocalStorage";

import { TURNS_APP_EMPTY_STATE } from "./(models)/(turns)/constants/localStorage";

export default function Home() {
  const { turnsList, userTurn, isTurnCreated, saveTurn, deleteTurn } =
    useTurns();

  const {
    storedValue: { isBarberUser },
  } = useLocalStorage("turnsApp", TURNS_APP_EMPTY_STATE);
  const isClientUser = !isBarberUser;

  const onCreateTurn = async (formValues: any) => {
    saveTurn(formValues);
  };

  const currentTurnNumber = turnsList[0]?.number;

  return (
    <div className="">
      {!isTurnCreated && isClientUser && (
        <TurnCreationForm onSubmit={onCreateTurn} />
      )}

      {/* User's turn information */}
      {isTurnCreated && isClientUser && (
        <UsersTurnInformation
          clientName={userTurn.name}
          turnNumber={userTurn.number}
          turnId={userTurn.id}
          deleteTurn={deleteTurn}
        />
      )}

      {/* Vista de barbero */}
      {isBarberUser && (
        <BarbersTurnInformation currentTurnNumber={currentTurnNumber} />
      )}

      <p>---------------------------------------</p>
      <p>---------------------------------------</p>

      <TurnsList
        turnsList={turnsList ?? []}
        userTurnId={userTurn?.id ?? ""}
        isClientView={isClientUser}
      />
    </div>
  );
}
