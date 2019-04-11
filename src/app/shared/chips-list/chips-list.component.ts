import {ChangeDetectionStrategy, Component, OnInit, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';
import {User} from '../../domain';
import { startWith, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    }
  ],
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {

  @Input() multiple = true; // allows multiple or single tag
  @Input() placeholderText = '';
  @Input() label = 'Add / Edit members';
  form: FormGroup;
  items: User[] = [];
  memberResults$: Observable<User[]>; 

  constructor(
    private fb: FormBuilder,
    private service: UserService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['']
    })

    this.memberResults$ = this.searchUsers(this.form.controls['memberSearch'].valueChanges);
    

  } 

  searchUsers(obs: Observable<string>): Observable<User[]> {
    return obs
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        filter((s: string) => (s !== null || s !== undefined) && s.length > 1),
        switchMap(str => this.service.searchUsers(str))
      );
  }

  // set initial value
  public writeValue(obj: User[]) {
    if(obj && this.multiple) {
      const userEntities = obj.reduce((entities, user) => {
        return {...entities, [<string>user.id]: user};
      }, {});
      if(this.items) {
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj];
      }
    } else if(obj && !this.multiple) {
      this.items = [...obj];
    }
  }

  private propagateChange = (_: any) => {};

  // triggered when form value changed, emit change back to the form
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  public validate(c: FormControl) {
    return this.items ? null : {
      chipListInvalid: {
        valid: false,
      },
    };
  }

  // unused
  public registerOnTouched() { }

  removeMember(member: User) {
    const ids = this.items.map(item => item.id);
    const i = ids.indexOf(member.id);
    if(this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i+1)];
    } else {
      this.items = [];
    }

    this.form.patchValue({memberSearch: ''});
    this.propagateChange(this.items);
  }

  handleMemberSelection(member: User) {
    if(this.items.map(item => item.id).indexOf(member.id) !== -1) {
      return;
    }

    this.items = this.multiple? [...this.items, member] : [member];
    this.form.patchValue({memberSearch: ''});
    this.propagateChange(this.items);
  }

  displayUser(user: User): string {
    return user? user.name: '';
  }

  get displayInput() {
    return this.multiple || (this.items.length === 0);
  }
}
