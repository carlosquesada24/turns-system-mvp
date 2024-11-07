import React from "react";
import { Turn } from "@/app/(models)/(turns)/interfaces";

interface TurnListItemProps {
  turn: Turn;
  isUsersTurn: boolean;
}

const TurnListItem = ({ turn, isUsersTurn }: TurnListItemProps) => {
  const listItemClassName = isUsersTurn ? "bg-sky-600 text-white" : "";

  return (
    <div key={turn.id} className={listItemClassName}>
      {turn.name} - #{turn.number}
    </div>
  );
};

export default TurnListItem;
