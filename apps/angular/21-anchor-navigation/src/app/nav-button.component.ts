/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'nav-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="link()" [fragment]="fragment()">
      <ng-content></ng-content>
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  href = input.required<string>();
  link = computed(() => {
    const link = this.href().split('#')[0];
    return link === '' ? './' : link;
  });
  fragment = computed(() => this.href().split('#')[1]);
}
