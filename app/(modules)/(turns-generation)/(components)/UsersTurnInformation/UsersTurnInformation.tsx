import React from "react";

import { Button } from "@/components/ui/button";

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
      <Button variant="destructive">Cancelar turno</Button>
    </div>
  );
};

export default UsersTurnInformation;
