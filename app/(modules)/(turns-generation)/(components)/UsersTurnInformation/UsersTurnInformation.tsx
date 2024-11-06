import React from "react";

import { Button } from "@/components/ui/button";

const UsersTurnInformation = () => {
  return (
    <div className="text-center">
      <h3>Superman</h3>
      <div>
        <h2>Su turno es</h2>
        <h1>#1</h1>
      </div>
      <Button variant="destructive">Cancelar turno</Button>
    </div>
  );
};

export default UsersTurnInformation;
