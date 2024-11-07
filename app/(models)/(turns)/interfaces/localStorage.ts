export interface TurnsAppLocalStorage {
    userTurn:
    | {
        id: string;
        name: string;
        number: number;
    }
    | {};
}