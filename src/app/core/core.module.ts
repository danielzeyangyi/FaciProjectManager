import { Optional, SkipSelf, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { loadSvgResources } from './utils/svg.utils';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ]
})
export class CoreModule { 
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer
    ){
    if(parent){
      throw new Error('Core module is alrady loaded !!!');
    }

    loadSvgResources(iconRegistry, sanitizer);
  }
}
