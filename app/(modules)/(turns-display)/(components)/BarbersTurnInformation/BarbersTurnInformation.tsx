import React from "react";
import { Button } from "@/components/ui/button";

const BarbersTurnInformation = () => {
  return (
    <div className="text-center">
      <div>
        <h2>Turno actual</h2>
        <h1>#19</h1>
      </div>
      <Button variant="default">Siguiente</Button>
    </div>
  );
};

export default BarbersTurnInformation;
