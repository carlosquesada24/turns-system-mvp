import { TurnsAppLocalStorage } from "../interfaces/localStorage";


export const TURNS_APP_EMPTY_STATE: TurnsAppLocalStorage = {
    userTurn: {},
    isBarberUser: false,
};

export const TURNS_APP_NORMAL_STATE: TurnsAppLocalStorage = {
    userTurn: {
        id: "cb442e86-3848-441c-bc24-041ee215264e",
        name: "Iron man",
        number: "8",
    },
    isBarberUser: false,
};


