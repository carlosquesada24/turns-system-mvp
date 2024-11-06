"use client";

import UsersTurnInformation from "./(modules)/(turns-generation)/(components)/UsersTurnInformation/UsersTurnInformation";
import TurnCreationForm from "./(modules)/(turns-generation)/(components)/TurnCreationForm/TurnCreationForm";

import useTurns from "./(hooks)/useTurns";
import TurnsList from "./(modules)/(turns-display)/(components)/(TurnsList)/TurnsList";

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
  const { turnsList, userTurn, isTurnCreated, saveTurn } = useTurns();

  const onCreateTurn = async (formValues: any) => {
    saveTurn(formValues);
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

      <TurnsList turnsList={turnsList ?? []} userTurnId={userTurn?.id ?? ""} />
    </div>
  );
}
