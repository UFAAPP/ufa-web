// import the required animation functions from the angular animations module
import {
  trigger,
  state,
  animate,
  transition,
  style,
  query,
  group,
  AnimationGroupMetadata,
  AnimationQueryMetadata,
} from '@angular/animations';

export const slideInOutAnimation = trigger('routeAnimations', [
  // transition('* => toRight', slideToSide('left')),
  transition('* => toLeft', slideToSide('right')),
]);
function slideToSide(
  direction: string
): (AnimationQueryMetadata | AnimationGroupMetadata)[] {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'relative',
          top: 0,
          [direction]: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%' })], optional),
    group([
      query(
        ':leave',
        [animate('.5s ease-in-out', style({ [direction]: '100%' }))],
        optional
      ),
      query(
        ':enter',
        [animate('.5s ease-in-out', style({ [direction]: '0%' }))],
        optional
      ),
    ]),
  ];
}
