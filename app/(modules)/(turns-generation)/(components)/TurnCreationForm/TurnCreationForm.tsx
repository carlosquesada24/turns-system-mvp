"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@/app/(hooks)/useForm";

interface TurnCreationFormProps {
  onSubmit: Function;
}

interface TurnCreationForm {
  name: string;
}

const TURN_CREATION_FORM_EMPTY_STATE: TurnCreationForm = {
  name: "",
};

const TurnCreationForm = ({ onSubmit }: TurnCreationFormProps) => {
  const {
    values: formValues,
    handleInputChange,
    reset: clearForm,
  } = useForm(TURN_CREATION_FORM_EMPTY_STATE, {});

  const handleSubmit = (formValues: any) => {
    typeof onSubmit === "function" && onSubmit(formValues);

    clearForm();
  };

  const isCreateTurnButtonDisabled = formValues.name.length < 1;

  return (
    <div>
      <Label htmlFor="name">Nombre</Label>
      <Input
        id="name"
        type="text"
        onChange={(e) => handleInputChange("name", e.currentTarget.value)}
        placeholder="Carlos"
        value={formValues.name}
      />
      <Button
        disabled={isCreateTurnButtonDisabled}
        onClick={() => handleSubmit(formValues)}
      >
        Crear turno
      </Button>
    </div>
  );
};

export default TurnCreationForm;
