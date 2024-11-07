import React from "react";

interface TurnListItemProps {
  turn: any;
  isUsersTurn: boolean;
}

const TurnListItem = ({ turn, isUsersTurn }: TurnListItemProps) => {
  const listItemClassName = isUsersTurn ? "bg-sky-600 text-white" : "";

  return (
    <div key={turn.id} className={listItemClassName}>
      {turn.name} - #{turn.position}
    </div>
  );
};

export default TurnListItem;
