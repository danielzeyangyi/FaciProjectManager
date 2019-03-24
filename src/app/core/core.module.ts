import { Optional, SkipSelf, NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { loadSvgResources } from './utils/svg.utils';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ],
  imports: [
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule
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
