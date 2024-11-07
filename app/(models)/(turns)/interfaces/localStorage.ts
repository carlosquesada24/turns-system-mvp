export interface TurnsAppLocalStorage {
    userTurn:
    | {
        id: string;
        name: string;
        position: number;
    }
    | {};
}