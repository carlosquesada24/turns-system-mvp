"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@/app/(hooks)/useForm";

interface TurnCreationFormProps {
  onSubmit: Function;
}

const TurnCreationForm = ({ onSubmit }: TurnCreationFormProps) => {
  const { values: formValues, handleInputChange } = useForm({ name: "" }, {});

  const handleSubmit = (formValues: any) => {
    typeof onSubmit === "function" && onSubmit(formValues);
  };

  return (
    <div>
      <Label htmlFor="name">Nombre</Label>
      <Input
        id="name"
        type="text"
        onChange={(e) => handleInputChange("name", e.currentTarget.value)}
        placeholder="Carlos"
      />
      <Button onClick={() => handleSubmit(formValues)}>Crear turno</Button>
    </div>
  );
};

export default TurnCreationForm;
