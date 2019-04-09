import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Task, TaskList } from '../domain';
import { Observable, from } from 'rxjs';
import { mergeMap, count, switchMap, map, mapTo, reduce } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly domain = 'tasks';
  private headers = new HttpHeaders({
    'Content-type': 'application/json'
  })

 
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
    ) { }

  //CREATE/POST
  add(task: Task): Observable<Task> {
    task.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
    .post<Task>(uri, JSON.stringify(task), {headers: this.headers});
  }

    //UPDATE/PUT
  update(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate ={
      name: task.desc,
      priority:task.priority,
      dueDate: task.dueDate,
      reminder: task.reminder,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      remark: task.remark
    };  
    return this.http.patch<Task>(uri, JSON.stringify(toUpdate), {
      headers: this.headers
    });
  }
    
  // DELETE /tasks instead of deleting the records
  del(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.delete(uri).pipe(mapTo(task));
  }

    // GET /tasks
  get(taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams().set('taskListId', taskListId);
    return this.http.get<Task[]>(uri, {
      params: params,
      headers: this.headers
    }); 
  }

  // Get all the tasks from taskList from project perspective
  getByLists(lists: TaskList[]): Observable<Task[]> {
    return from(lists).pipe(
      mergeMap((list: TaskList) => this.get(<string>list.id)),
      reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], [])
    );
  }

  complete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.patch<Task>(
      uri,
      JSON.stringify({ completed: !task.completed }),
      { headers: this.headers }
    );
  }

  move(taskId: string, taskListId: string): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${taskId}`;
    return this.http.patch<Task>(
      uri,
      JSON.stringify({ taskListId: taskListId }),
      { headers: this.headers }
    );
  }
  
  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    return this.get(srcListId).pipe(
      mergeMap((tasks: Task[]) => from(tasks) ),
      mergeMap((task: Task) => this.move(<string>task.id, targetListId)),
      reduce((arrTasks: Task[], t: Task) => {
        return [...arrTasks, t];
      }, [])
    )
  }

  
}
