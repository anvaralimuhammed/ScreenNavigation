import { _decorator, Color, Component, Label, Node, Sprite } from 'cc';
import { WeightQuestController } from './WeightQuestController';
const { ccclass, property } = _decorator;

@ccclass('WeightStone')
export class WeightStone extends Component {
    @property(Number)
    weight:number=0;

    @property(Label)
    weightLbl : Label = null;
    @property(Label)
    unitLbl : Label = null;

    normalColor = Color.GRAY;

    weightStoneSprite : Sprite = null;
    
    weightQuestController : WeightQuestController=null;

    initWeightStone(wqc : WeightQuestController,cUnit)
    {
        this.weightStoneSprite = this.getComponent(Sprite);
        this.weightStoneSprite.color = this.normalColor;
        this.weightQuestController = wqc;
        this.weightLbl.string = this.weight.toString();
        this.unitLbl.string = cUnit;
    }

    public placeOnScale(): void {
        this.weightQuestController.setWeightSelection(this);
    }

    public setHighlighted()
    {
        this.weightStoneSprite.color = Color.WHITE;
    }

    public setToNormal()
    {
        this.weightStoneSprite.color = Color.GRAY;
    }
}

