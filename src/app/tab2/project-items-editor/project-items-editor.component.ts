import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalService } from 'ng-zorro-antd-mobile';
import { ProjectItemsManagerService } from 'src/app/services/project-items-manager.service';
import { Project } from 'src/app/shared/project';
import { ProjectItem } from 'src/app/shared/project-item';

@Component({
  selector: 'app-project-items-editor',
  templateUrl: './project-items-editor.component.html',
  styleUrls: [],
})
export class ProjectItemsEditorComponent  implements OnInit {

  @ViewChild(IonModal)
  addProjectItemModal!: IonModal;

  currentProject: Project|undefined;
  currentProjectItem: ProjectItem = new ProjectItem();
  isLoading: boolean = false;
  private dataChanged: boolean = false;
  private isEidt: boolean = false;

  @Input()
  set projectInfo(info:{id: string,remark: string, projectItems: any[]}){
    const project = new Project(info.id);
    project.remark = info.remark;
    const tempProjectItems:ProjectItem[] = [];
    info.projectItems.forEach(p=>{
      const projectItem = new ProjectItem();
      projectItem.childItems = p.childItems;
      projectItem.description = p.description;
      projectItem.status = p.status;
      tempProjectItems.push(projectItem);
    })
    project.projectItems = tempProjectItems;
    this.currentProject = project;
  }

  constructor(
    private _modal: ModalService,
    private pimService: ProjectItemsManagerService
  ) { }

  ngOnInit() {}

  resetProjectItem(){
    this.currentProjectItem = new ProjectItem();
  }

  addItem(){
    this.currentProjectItem?.childItems.push({
      description: "",
      finished: false
    });
    this.dataChanged = true;
  }

  deleteItem(){
    this.currentProjectItem?.childItems.pop();
    this.dataChanged = true;
  }

  cancelAddProjectItem(){
    this.currentProjectItem = new ProjectItem();
    this.addProjectItemModal.dismiss();
  }

  confirmAddProjectItem(){
    if(this.currentProject&&(!this.isEidt))
      this.currentProject.projectItems.push(this.currentProjectItem)
    this.currentProjectItem = new ProjectItem();
    this.addProjectItemModal.dismiss();
    this.dataChanged = true;
  }

  deleteProjectItem(){
    this.isLoading = true;
    if(this.currentProject){
      this.currentProject.projectItems.pop();
      this.uploadProject().then(()=>{
        this.isLoading = false;
      })
    }
  }

  async uploadProject(){
    if(!this.currentProject)
      return;
    this.isLoading = true;
    await this.pimService.setItem(this.currentProject.id,this.currentProject.formatData).then(()=>{
      this.isLoading = false;
      this.dataChanged = false
    })
  }

  async ionViewWillLeave(){
    if(this.dataChanged){
      const flag = confirm("有未保存的项目，是否保存？");
      if(flag){
        await this.uploadProject();
      }
    }
  }

  editModelLeaved(){
    this.isEidt = false;
  }

  editProjectItem(item: ProjectItem){
    this.currentProjectItem = item;
    // this.addProjectItemBut.nativeElement.onClick();
    this.isEidt = true;
    const element = document.getElementById("add-project-item");
    element?.click();
  }

}
