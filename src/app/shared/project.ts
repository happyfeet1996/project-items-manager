import { ProjectItem } from "./project-item";

export class Project{

    id!: string;
    remark: string = "";
    projectItems: ProjectItem[] = [];

    constructor(id: string){
        this.id = id;
    }

    get formatData(){
        return {
            id: this.id,
            projectItems: this.projectItems,
            remark: this.remark
        }
    }
    
}