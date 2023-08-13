import { Component } from '@angular/core';
import { ProjectItemsManagerService } from '../services/project-items-manager.service';
import { ModalService } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  isLoading: boolean = false;

  constructor(
    private pimService: ProjectItemsManagerService,
    private _modal: ModalService
  ) {}

  private clearItems(){
    this.isLoading = true;
    this.pimService.clearItems().then(()=>{
      this.isLoading = false;
    })
  }

  confirmClearItems(){
    this._modal.alert('清除', '确定清除所有计划吗？', [
      { text: '取消', onPress: () => {}  },
      { text: '确定', onPress: () => {
        this.clearItems();
      } }
    ]);
  }

}
