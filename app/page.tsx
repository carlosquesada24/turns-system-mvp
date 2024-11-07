"use client";

import UsersTurnInformation from "./(modules)/(turns-generation)/(components)/UsersTurnInformation/UsersTurnInformation";
import TurnCreationForm from "./(modules)/(turns-generation)/(components)/TurnCreationForm/TurnCreationForm";

import useTurns from "./(hooks)/useTurns";
import TurnsList from "./(modules)/(turns-display)/(components)/(TurnsList)/TurnsList";
import BarbersTurnInformation from "./(modules)/(turns-display)/(components)/BarbersTurnInformation/BarbersTurnInformation";

interface TurnsAppLocalStorage {
  userTurn:
    | {
        id: string;
        name: string;
        number: number;
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
    number: "8",
  },
};

export default function Home() {
  const { turnsList, userTurn, isTurnCreated, saveTurn } = useTurns();

  const onCreateTurn = async (formValues: any) => {
    saveTurn(formValues);
  };

  const isBarberView = true;

  const currentTurnNumber = turnsList[0]?.number;

  return (
    <div className="">
      {!isTurnCreated && !isBarberView && (
        <TurnCreationForm onSubmit={onCreateTurn} />
      )}

      {/* User's turn information */}
      {isTurnCreated && !isBarberView && (
        <UsersTurnInformation
          clientName={userTurn.name}
          turnNumber={userTurn.number}
        />
      )}

      {/* Vista de barbero */}
      {isBarberView && (
        <BarbersTurnInformation currentTurnNumber={currentTurnNumber} />
      )}

      <p>---------------------------------------</p>
      <p>---------------------------------------</p>

      <TurnsList
        turnsList={turnsList ?? []}
        userTurnId={userTurn?.id ?? ""}
        isClientView={!isBarberView}
      />
    </div>
  );
}
