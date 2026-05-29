import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnunciosAtivosPage } from './anuncios-ativos.page';

describe('AnunciosAtivosPage', () => {
  let component: AnunciosAtivosPage;
  let fixture: ComponentFixture<AnunciosAtivosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnunciosAtivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
