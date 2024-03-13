import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
import { WeightStone } from './WeightStone';
import { Scale } from './Scale';
import BaseScreenComponent from './Core/BaseScreenComponent';
import ScreenNames, { GameMode, GamePlayStartType, WeightUnits } from './Core/GameManager';
import { UIManager } from './Core/UIManager';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('WeightQuestController')
export class WeightQuestController extends BaseScreenComponent {

    @property(WeightStone)
    weights : WeightStone[]=[];

    @property(Sprite)
    gameModeTitle : Sprite = null;

    @property(SpriteFrame)
    allModes : SpriteFrame[]= [];

    @property(Scale)
    balanceScale : Scale=null;
    selectedWeight : WeightStone=null;

    targetWeight =0;

    protected onShow(params?: any): void {
        super.onShow(params);
        if(params)
        {
            switch(params.gameStartType)
            {
                case GamePlayStartType.new_game:
                    console.log("Selected mode : "+params.mode);
                    let unitRight = "";
                    let unitLeft = ""
                    this.gameModeTitle.spriteFrame = this.allModes[params.mode];
                    switch(params.mode)
                    {
                        case GameMode.mg_g:
                            unitRight = WeightUnits.g;
                            unitLeft =WeightUnits.mg;
                            break;
                        case GameMode.g_kg:
                            unitRight = WeightUnits.kg;
                            unitLeft =WeightUnits.g;
                            break;
                        case GameMode.kg_ton:
                            unitRight = WeightUnits.ton;
                            unitLeft =WeightUnits.kg;
                            break;
                    }
                    this.initGamePlay(unitLeft);
                    this.startGame(unitLeft,unitRight);
                    break;
                case GamePlayStartType.restart:
                    this.balanceScale.setWeight(this.targetWeight);
                    break;
                case GamePlayStartType.next_level:
                    this.startLevel();
                    break;
                
            }
            
        }else
        {
           console.error("Screen params not found");
        }
    }

    private initGamePlay(currentUnit : string)
    {
        this.weights.forEach(w => {
            w.initWeightStone(this,currentUnit);
        });
        this.setWeightSelection(this.weights[0]);
    }
   
    private startGame(unitLeft : string, unitRight : string)
    {
       this.balanceScale.setWeightUnits(unitRight,unitLeft);
       this.startLevel();
    }

    private startLevel()
    {
       this.targetWeight = this.generateRandomTargetWeight();
       this.balanceScale.setWeight(this.targetWeight);
    }

    private generateRandomTargetWeight(): number 
    {
        let randomFloat = Math.random() * 5;
        randomFloat = Math.floor(randomFloat * 10) / 10;
        return randomFloat ;
    }
   
    private setWeightSelection(weight)
    {
        if(this.selectedWeight != null)
        {
            this.selectedWeight.setToNormal();
        }
        this.selectedWeight = weight;
        this.selectedWeight.setHighlighted();
    }  
    
    private increaseWeight()
    {
        AudioManager.getInstance().buttonClickSound();
        this.balanceScale.addWeight(this.selectedWeight.weight);
    }

    private decreaseWeight()
    {
        AudioManager.getInstance().buttonClickSound();
        this.balanceScale.removeWeight(this.selectedWeight.weight);
    }

    private resetCurrentLevel()
    {
        AudioManager.getInstance().buttonClickSound();
        this.balanceScale.setWeight(this.targetWeight);
    }

    private onConfirmBalanced()
    {
        AudioManager.getInstance().buttonClickSound();
        UIManager.getInstance().changeScreen(ScreenNames.Results.toString(),{isBalanced:this.balanceScale.getIsBalanced()});
    }

    private onHomeButtonClicked()
    {
        AudioManager.getInstance().buttonClickSound();
        UIManager.getInstance().changeScreen(ScreenNames.MainMenu.toString());
    }

   
}

