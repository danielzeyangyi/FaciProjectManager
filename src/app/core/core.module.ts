import { Optional, SkipSelf, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parent: CoreModule){
    if(parent){
      throw new Error('Core module is alrady loaded !!!');
    }
  }
}
