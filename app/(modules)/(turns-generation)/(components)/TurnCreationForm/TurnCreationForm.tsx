"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface TurnCreationFormProps {
  onSubmit: Function;
}

const TurnCreationForm = ({ onSubmit }: TurnCreationFormProps) => {
  const handleSubmit = () => {
    typeof onSubmit === "function" && onSubmit();
  };

  return (
    <div>
      <Label htmlFor="name">Nombre</Label>
      <Input id="name" type="text" placeholder="Carlos" />
      <Button onClick={handleSubmit}>Crear turno</Button>
    </div>
  );
};

export default TurnCreationForm;
