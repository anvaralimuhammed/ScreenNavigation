import { _decorator, Component, Label, Node } from 'cc';
import { WeightStone } from './WeightStone';
const { ccclass, property } = _decorator;

@ccclass('Scale')
export class Scale extends Component {
    
    @property(Label)
    targetWeightLbl : Label = null;
    @property(Label)
    targetUnitLbl : Label = null;

    @property(Label)
    currentWeightLbl : Label = null;
    @property(Label)
    currentUnitLbl : Label = null;

    @property(Node)
    balanceStick : Node=null;

    private targetWeight : number;
    private currentWeight = 0;
    private isBalanced = false;

    maxTiltAngle = 10;


    setWeightUnits(targetUnit:string,currentUnit:string)
    {
        this.targetUnitLbl.string = targetUnit;
        this.currentUnitLbl.string = currentUnit;
    }

    setWeight(taregtWeight:number)
    {
        this.targetWeight = taregtWeight;
        this.targetWeightLbl.string = this.targetWeight.toString();
        this.applyTilt(this.maxTiltAngle);
        this.currentWeight=0;
        this.currentWeightLbl.string = this.currentWeight.toString();
    }

    public addWeight(weight: number): void {
        this.currentWeight += weight;
        this.currentWeightLbl.string = this.currentWeight.toString();
        this.checkBalance();
      }

      public removeWeight(weight: number): void {
        this.currentWeight -= weight;
        if(this.currentWeight<=0)
        {
            this.currentWeight=0;
        }
        this.currentWeightLbl.string = this.currentWeight.toString();
        this.checkBalance();
      }
    
      private checkBalance(): void {
            let weightWithRightUnit = this.currentWeight/1000.0;
            let tiltAngle = 0;
            if(weightWithRightUnit < this.targetWeight)
            {
                // console.log("towards left "+(this.targetWeight-weightWithRightUnit));
                tiltAngle = this.calculateTiltAngle(this.targetWeight - weightWithRightUnit, false);
                this.applyTilt(tiltAngle);
                this.isBalanced = false;
            }else if(weightWithRightUnit > this.targetWeight)
            {
                // console.log("towards right "+(weightWithRightUnit-this.targetWeight));
                tiltAngle = this.calculateTiltAngle(weightWithRightUnit - this.targetWeight, true);
                this.applyTilt(-tiltAngle);
                this.isBalanced = false;
            }else
            {
                // console.log("blanced");
                this.applyTilt(0);
                this.isBalanced = true;
            }
      }
    
      // Getters for current and target weights might be used for other game logic
      public getCurrentWeight(): number {
        return this.currentWeight;
      }
    
      public getTargetWeight(): number {
        return this.targetWeight;
      }

      public getTargetWeightUnit():string
      {
        return this.targetUnitLbl.string;
      }

      public getIsBalanced()
      {
        return this.isBalanced;
      }

      private calculateTiltAngle(weightDifference: number, isRight: boolean): number {
        // Calculate the tilt angle based on the weight difference and the max tilt angle
        // Assuming that the max weight difference to reach the max tilt angle is equal to the target weight
        const angleProportion = weightDifference / this.targetWeight;
        return Math.min(this.maxTiltAngle, angleProportion * this.maxTiltAngle);
      }
    
      private applyTilt(tiltAngle: number): void {
        // Placeholder: This function should apply the tilt to the scale in your game
        // For example, by setting the rotation property of the scale's node
        // this.node.rotation = tiltAngle;
        this.balanceStick.angle = tiltAngle;
        // If using Cocos Creator, you would typically use this.node.angle = tiltAngle;
      }

}

