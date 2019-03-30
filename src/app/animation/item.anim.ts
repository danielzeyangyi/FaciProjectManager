import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';

export const itemAnim = trigger('item', [
    state('out', style({'border-left-width':'3px'})),
    state('hover', style({'border-left-width':'15px'})),
    transition('out => hover', animate('100ms ease-in')),
    transition('hover => out', animate('100ms ease-out')),
]);