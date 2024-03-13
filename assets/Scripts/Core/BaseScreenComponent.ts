import { _decorator, AnimationComponent, Component, Enum, Node } from 'cc';
import { UIManager } from './UIManager';
import ScreenNames from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('BaseScreenComponent')
export default class BaseScreenComponent extends Component implements IScreenObserver {
    @property ({type:Enum(ScreenNames)})
    screenName: ScreenNames = ScreenNames.None;

    @property(AnimationComponent)
    popAnim : AnimationComponent; // it is an optional animation component, this will be assigned only for pop ups, not for screen


    onLoad() {
        UIManager.getInstance().registerObserver(this);
    }

    onScreenChange(screenName: string, params?: any): void {
        
        if (this.screenName.toString() == screenName) {
            this.node.active = true;
            this.onShow(params);
        } else {
            this.node.active = false;
            this.onHide();
        }
    }

    protected onShow( params?: any): void {
        // Override to provide show logic
        if(this.popAnim != null)
        {
            this.popAnim.play("popOut");
        }
    }

    protected onHide(): void {
        // Override to provide hide logic
    }
}


