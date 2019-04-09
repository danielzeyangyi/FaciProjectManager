import { Observable } from "rxjs";
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

declare module 'rxjs' {
    interface Observable<T> {
        debug: (...any) => Observable<T>;
    }
}

Observable.prototype.debug = function(message: string) {
    return this.tap(
        (next) => {
            if(!environment.production) {
                console.log(message, next)
            }
        },
        (err) => {
            if(!environment.production) {
                console.error('Err :', message, err)
            }
        },
        () => {
            if(!environment.production) {
                console.log('completed');
            }
        }
    )
}