import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ProjectItemsManagerService } from '../services/project-items-manager.service';
import { ProjectItem } from '../shared/project-item';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Project } from '../shared/project';
import { ProjectItemsEditorComponent } from './project-items-editor/project-items-editor.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: []
})
export class Tab2Page {

  @ViewChild(IonModal)
  addProjectModal!: IonModal;

  minDate: any = new Date();
  date: Date = new Date();
  isLoading: boolean = false;
  remark: string = "";
  toastVis: boolean = false;
  projects: any[] = [];
  component = ProjectItemsEditorComponent

  constructor(
    private pimService: ProjectItemsManagerService
  ) {}

  add(){
    this.confirmDate().then(res=>{
      if(res){
        this.isLoading = true;
        const project = new Project(this.currentDateFormat(this.date));
        project.remark = this.remark;
        this.pimService.setItem(project.id,project.formatData).then(()=>{
          this.isLoading = false;
          this.addProjectModal.dismiss();
        })
      }
    })
  }
  
  cancel(){
    this.addProjectModal.dismiss(null,"cancel");
  }

  onOk(value:any){
    this.date = new Date(value);
    this.confirmDate();
  }

  currentDateFormat(date:any, format: string = 'yyyy-mm-dd'): any {
    return ProjectItemsManagerService.dateFormat(date,format);
  }

  private confirmDate():Promise<boolean>{
    this.isLoading = true;
    return new Promise(resolve=>{
      this.pimService.getItem(this.currentDateFormat(this.date)).then((res)=>{
        if(res){
          this.existAlert();
          resolve(false)
        }else{
          this.toastVis = false;
          resolve(true)
        }
        this.isLoading = false;
      })
    })
    
  }

  private existAlert(){
    this.toastVis = true;
  }

  ionViewDidEnter(){
    console.log("enterd")
    this.initProjectList();
  }

  private initProjectList(){
    this.isLoading = true;
    this.pimService.getProjectInfoItems().then(res=>{
      const tempProjects:any[] = [];
      res.forEach(p=>{
        tempProjects.push(p)
      })
      this.projects = ProjectItemsManagerService.sortProjects(tempProjects);
      this.isLoading = false;
    })
  }

}
