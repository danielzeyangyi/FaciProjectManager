import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TaskList } from '../domain';
import { Observable, from, concat, } from 'rxjs';
import { mergeMap, count, switchMap, map, reduce, mapTo } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  private readonly domain = 'taskLists';
  private headers = new HttpHeaders({
    'Content-type': 'application/json'
  })

 
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
    ) { }

  //CREATE/POST
  add(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
    .post<TaskList>(uri, JSON.stringify(taskList), {headers: this.headers});
  }

    //UPDATE/PUT
  update(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate ={
      name: taskList.name,
    };  

    return this.http
    .patch<TaskList>(uri, JSON.stringify(toUpdate), {headers: this.headers})
    .pipe(map(res => res))
  }
    
  // DELETE /taskLists instead of deleting the records
  del(taskList: TaskList): Observable<TaskList> {

    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http.delete(uri).pipe(mapTo(taskList));
  }

  // GET /tasklist
  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<TaskList[]>(uri, { params });
  }


  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
    const drag$ = this.http.patch<TaskList>(
      dragUri,
      JSON.stringify({ order: target.order }),
      { headers: this.headers }
    );
    const drop$ = this.http.patch<TaskList>(
      dropUri,
      JSON.stringify({ order: src.order }),
      { headers: this.headers }
    );
    return concat(drag$, drop$).pipe(
      reduce((arrs: TaskList[], list: TaskList) => [...arrs, list], [])
    );
  }
}
