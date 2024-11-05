"use client";

import TurnCreationForm from "./(modules)/(turns-generation)/(components)/TurnCreationForm/TurnCreationForm";

export default function Home() {
  const onCreateTurn = () => {
    alert("Turn created");
  };

  return (
    <div className="">
      <TurnCreationForm onSubmit={onCreateTurn} />
    </div>
  );
}
