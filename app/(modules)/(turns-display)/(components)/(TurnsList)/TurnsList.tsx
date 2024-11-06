import React from "react";

interface TurnsListProps {
  turnsList: any[];
  userTurnId: string;
}

const TurnsList = ({ turnsList, userTurnId }: TurnsListProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Turnos pendientes</h2>
      {turnsList &&
        Array.isArray(turnsList) &&
        turnsList?.map((turn, index) => {
          const isUsersTurn = userTurnId === turn.id;

          return (
            <div
              key={index}
              className={`${isUsersTurn ? "bg-sky-600 text-white" : ""}`}
            >
              {turn.name} - #{turn.position}
            </div>
          );
        })}
    </div>
  );
};

export default TurnsList;
