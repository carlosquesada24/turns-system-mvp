import React from "react";

interface TurnsListProps {
  turnsList: any[];
  userTurnId: string;
}

const TurnsList = ({ turnsList, userTurnId }: TurnsListProps) => {
  const isValidArray = turnsList && Array.isArray(turnsList);
  const isEmptyArray = isValidArray && turnsList.length === 0;

  return (
    <div>
      <h2 className="text-xl font-bold text-center">Turnos pendientes</h2>
      <div className="text-center">
        {isEmptyArray ? (
          <h2>¡No hay turnos pendientes!</h2>
        ) : (
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
          })
        )}
      </div>
    </div>
  );
};

export default TurnsList;
