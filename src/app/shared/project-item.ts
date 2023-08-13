import { ProjectItemsManagerService } from "../services/project-items-manager.service";

export enum PROJECT_ITEM_STATUS{
    NOT_START = 0,
    IN_PROGRESS = 1,
    FINISHED = 2
}

export interface ProjectItemChildItems{
    finished: boolean,
    description: string
}

export class ProjectItem{

    description!: string;
    childItems: ProjectItemChildItems[] = [];
    private _status: PROJECT_ITEM_STATUS = PROJECT_ITEM_STATUS.NOT_START;
    
    get status():PROJECT_ITEM_STATUS{
        if(this.childItems.length <= 0)
            return this._status;
        let s = PROJECT_ITEM_STATUS.NOT_START;
        let finishedItems = this.childItems.filter(item=>item.finished);
        if(finishedItems.length===this.childItems.length)
            s = PROJECT_ITEM_STATUS.FINISHED;
        else if(finishedItems.length>0 && finishedItems.length<this.childItems.length)
            s = PROJECT_ITEM_STATUS.IN_PROGRESS;
        return s;
    }

    set status(s:PROJECT_ITEM_STATUS){
        this._status = s;
        switch (s) {
            case PROJECT_ITEM_STATUS.NOT_START:
                this.childItems.forEach(item=>{
                    item.finished = false;
                })
                break;
            case PROJECT_ITEM_STATUS.FINISHED:
                this.childItems.forEach(item=>{
                    item.finished = true;
                })
                break;
            default:
                break;
        }
    }

    get color():string{
        let s = this.status;
        if(s === PROJECT_ITEM_STATUS.NOT_START)
            return "danger";
        else if(s === PROJECT_ITEM_STATUS.IN_PROGRESS)
            return "warning"
        return "success";
    }

    constructor(){
        this.description = `事项清单`;
    }

    get formatData(){
        return JSON.parse(JSON.stringify({
            description: this.description,
            childItems: this.childItems,
            status: this.status
        }))
    }

}