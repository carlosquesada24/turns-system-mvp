import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const TurnCreationForm = () => {
  return (
    <div>
      <Label htmlFor="name">Nombre</Label>
      <Input id="name" type="text" placeholder="Carlos" />
      <Button>Crear turno</Button>
    </div>
  );
};

export default TurnCreationForm;
