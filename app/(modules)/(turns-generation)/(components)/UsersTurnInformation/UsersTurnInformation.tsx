import React from "react";

import { CancelTurnModal } from "@/app/(modules)/(turns-adjustment)/(components)/CancelTurnModal/CancelTurnModal";

interface UsersTurnInformationProps {
  turnId: string;
  clientName: string;
  turnNumber: number;
  deleteTurn: (turnId: string) => void;
}

const UsersTurnInformation = ({
  turnId,
  clientName,
  turnNumber,
  deleteTurn,
}: UsersTurnInformationProps) => {
  return (
    <div className="text-center">
      <h3>{clientName}</h3>
      <div>
        <h2>Su turno es</h2>
        <h1>#{turnNumber}</h1>
      </div>

      <CancelTurnModal
        turnId={turnId}
        clientName={clientName}
        deleteTurn={deleteTurn}
      />
    </div>
  );
};

export default UsersTurnInformation;
