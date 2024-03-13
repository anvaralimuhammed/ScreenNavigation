import { _decorator, Component, Node } from 'cc';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;
export enum GameMode {
    mg_g =0,
    g_kg = 1,
    kg_ton=2,
}

enum ScreenNames {
    None,
    MainMenu,
    Category,
    Settings,
    Gameplay,
    Results,
}
export default ScreenNames;

export enum WeightUnits
{
    mg = "mg",
    g ="g",
    kg = "Kg",
    ton = "Ton"
}

export enum GamePlayStartType
{
    new_game,
    restart,
    next_level,
}



@ccclass('GameManager')
export class GameManager extends Component {
    
    protected start(): void {
       UIManager.getInstance().changeScreen(ScreenNames.MainMenu.toString());
   }

}

