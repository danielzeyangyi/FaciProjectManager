import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

export const loadSvgResources = (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => {
    iconRegistry.addSvgIcon(
        'user',
        sanitizer.bypassSecurityTrustResourceUrl('assets/user.svg'));
}