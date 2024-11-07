import React from "react";

import { CancelTurnModal } from "@/app/(modules)/(turns-adjustment)/(components)/CancelTurnModal/CancelTurnModal";

interface UsersTurnInformationProps {
  clientName: string;
  turnNumber: number;
}

const UsersTurnInformation = ({
  clientName,
  turnNumber,
}: UsersTurnInformationProps) => {
  return (
    <div className="text-center">
      <h3>{clientName}</h3>
      <div>
        <h2>Su turno es</h2>
        <h1>#{turnNumber}</h1>
      </div>

      <CancelTurnModal />
    </div>
  );
};

export default UsersTurnInformation;
