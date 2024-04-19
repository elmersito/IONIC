import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [CardComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [CardComponent, FooterComponent]
})
export class ComponentsModule { }
