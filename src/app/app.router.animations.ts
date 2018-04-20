import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [

    query(':enter, :leave', style({position: 'absolute', width: '100%'})
      , {optional: true}),

    query(':enter', [
      style({opacity: 0}),
    ], {optional: true}),

    query(':leave', [
      style({opacity: 1}),
      animate('.3s ease-in-out',
        style({opacity: 0}))
    ], {optional: true}),

    query(':enter', [
      style({opacity: 0}),
      animate('.3s ease-in-out',
      style({opacity: 1}))
    ], {optional: true}),
  ])
]);
