import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperaPage } from './recupera.page';

describe('RecuperaPage', () => {
  let component: RecuperaPage;
  let fixture: ComponentFixture<RecuperaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecuperaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
