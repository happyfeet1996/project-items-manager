import { Component } from '@angular/core';
import { ProjectItem } from '../shared/project-item';
import { ProjectItemsManagerService } from '../services/project-items-manager.service';
import { Project } from '../shared/project';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private pimService: ProjectItemsManagerService
  ) {}

  projectItems: ProjectItem[] = [];
  private currentProject!: Project;
  isLoading: boolean = false;
  hasData: boolean = false;
  private id: string = ProjectItemsManagerService.dateFormat(new Date(), "yyyy-mm-dd");

  ngOnInit(): void {
    this.initProjectItem();
  }

  private initProjectItem():Promise<void> {
    // const id = ProjectItemsManagerService.dateFormat(new Date(), "yyyy-mm-dd");
    return new Promise(resolve=>{
      this.pimService.getItem(this.id).then(res => {
        if (res) {
          const project = new Project(this.id);
          project.remark = res.remark;
          const projectItems = res.projectItems.map((item: any) => {
            const projectItem = new ProjectItem();
            projectItem.status = item._status;
            projectItem.childItems = item.childItems;
            projectItem.description = item.description;
            return projectItem;
          });
          project.projectItems = projectItems;
          this.projectItems = project.projectItems;
          this.currentProject = project;
          this.hasData = true;
          resolve()
        }else{
          this.hasData = false;
        }
      });
    })
  }

  ionViewDidEnter(){
    this.initProjectItem();
  }

  handleRefresh(event:any) {
    this.initProjectItem().then(()=>{
      event.target.complete();
    })
  }

  handleDataChanged(data:any){
    this.isLoading = true;
    this.pimService.setItem(this.id,this.currentProject).then(()=>{
      this.isLoading = false;
    })
  }

}
