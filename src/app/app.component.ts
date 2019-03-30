import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  overlayContainerClasses: any;  
  darkTheme = false;

  sqaureState: string;

  constructor( private oc: OverlayContainer) {
    this.overlayContainerClasses = this.oc.getContainerElement();
  }

  switchTheme(dark){
    this.darkTheme = dark.checked;
    this.toggleTheme();
  }

  toggleTheme(): void {
    if (this.overlayContainerClasses.classList.contains("myapp-dark-theme")) {
        this.overlayContainerClasses.classList.remove("myapp-dark-theme");
        this.overlayContainerClasses.classList.add("angular-material-theme");
    } else {
      this.overlayContainerClasses.classList.remove("angular-material-theme");
      this.overlayContainerClasses.classList.add("myapp-dark-theme");
    }
  }
  
}
