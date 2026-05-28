import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesMoedaPage } from './detalhes-moeda.page';

describe('DetalhesMoedaPage', () => {
  let component: DetalhesMoedaPage;
  let fixture: ComponentFixture<DetalhesMoedaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesMoedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
