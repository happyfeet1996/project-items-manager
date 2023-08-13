import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Project } from '../shared/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectItemsManagerService {

  private _storage: Storage | null = null;

  constructor(
    private storage: Storage
  ) { 
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async setItem(key: string, value: any) {
    if(!this._storage)
      await this.init();
    await this._storage?.set(key, value);
  }

  async getItem(key: string){
    if(!this._storage)
      await this.init();
    const value = await this._storage?.get(key);
    return value;
  }

  async clearItems(){
    if(!this._storage)
      await this.init();
    await this._storage?.clear();
  }

  async getItemsKeys(){
    if(!this._storage)
      await this.init();
    const keys = await this._storage?.keys();
    return keys;
  }

  async getItemsLength(){
    if(!this._storage)
      await this.init();
    return await this._storage?.length();
  }

  async getProjectInfoItems():Promise<{id:string,remark:string,projectItems:any[]}[]>{
    if(!this._storage)
      await this.init();
    const projectInfoArr:any[] = [];
    
    await this._storage?.forEach((value,key)=>{
      if(key.search(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)===0){
        projectInfoArr.push(value)
      }
    })
    return projectInfoArr;
  }

  async removeItem(key: string){
    if(!this._storage)
      await this.init();
    this._storage?.remove(key);
  }

  static dateFormat(date:any, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }

  static sortProjects(projects:any[]){
    return projects.sort((a,b)=>{
      return Number(a.id.replace(/-/g,"")) - Number(b.id.replace(/-/g,""));
    })
  }

}
