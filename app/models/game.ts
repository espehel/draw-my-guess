import { IDrawing } from "./drawing";
import { IPlayer } from "./player";

export interface IGame {
    players: IPlayer[]
    drawings: IDrawing[];
}