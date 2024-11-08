import React from "react";
import { Button } from "@/components/ui/button";

interface BarbersTurnInformationProps {
  currentTurnNumber: number;
  isLastTurn: boolean;
  advanceTurn: () => void;
}

const BarbersTurnInformation = ({
  currentTurnNumber,
  isLastTurn,
  advanceTurn,
}: BarbersTurnInformationProps) => {
  return (
    <div className="text-center">
      <div>
        <h2>Turno actual</h2>
        <h1>#{currentTurnNumber}</h1>
      </div>
      <Button disabled={isLastTurn} variant="default" onClick={advanceTurn}>
        Siguiente
      </Button>
    </div>
  );
};

export default BarbersTurnInformation;
