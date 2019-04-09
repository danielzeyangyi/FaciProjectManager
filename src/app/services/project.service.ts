import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project } from '../domain';
import { Observable, from } from 'rxjs';
import { mergeMap, count, switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly domain = 'projects';
  private headers = new HttpHeaders({
    'Content-type': 'application/json'
  })

 
  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
    ) { }

  //CREATE/POST
  add(project: Project): Observable<Project> {
    project.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
    .post<Project>(uri, JSON.stringify(project), {headers: this.headers})
    .pipe(map(res => res ))
  }

    //UPDATE/PUT
  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate ={
      name: project.name,
      desc:project.desc,
      coverImg: project.coverImg
    };  

    return this.http
    .patch<Project>(uri, JSON.stringify(toUpdate), {headers: this.headers})
    .pipe(map(res => res))
  }
    
  // DELETE /projects instead of deleting the records
  del(project: Project): Observable<Project> {
    const deltask$ = from(project.taskLists ? project.taskLists : []).pipe(
      mergeMap(listId =>
        this.http.delete(`${this.config.uri}/taskLists/${listId}`)
      ),
      count()
    );
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    return deltask$.pipe(
      switchMap(p => this.http.delete(uri).pipe(map(prj => project)))
    );
  }

    // GET /projects
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams().set('members_like', userId);
    return this.http.get<Project[]>(uri, {
      params: params,
      headers: this.headers
    }); 
  }


}
