import React from "react";
import TurnListItem from "./TurnListItem";
import { Turn } from "@/app/(models)/(turns)/interfaces";

interface TurnsListProps {
  turnsList: Turn[];
  userTurnId: string;
  isClientView: boolean;
}

const TurnsList = ({ turnsList, userTurnId, isClientView }: TurnsListProps) => {
  const isValidArray = turnsList && Array.isArray(turnsList);
  const isEmptyArray = isValidArray && turnsList.length === 0;

  return (
    <div>
      <h2 className="text-xl font-bold text-center">Turnos pendientes</h2>
      <div className="text-center">
        {isEmptyArray ? (
          <h2>¡No hay turnos pendientes!</h2>
        ) : (
          turnsList?.map((turn) => {
            const isUsersTurn = isClientView && userTurnId === turn.id;

            return <TurnListItem turn={turn} isUsersTurn={isUsersTurn} />;
          })
        )}
      </div>
    </div>
  );
};

export default TurnsList;
