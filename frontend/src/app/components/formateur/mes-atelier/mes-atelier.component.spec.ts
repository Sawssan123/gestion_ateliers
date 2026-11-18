import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAtelierComponent } from './mes-atelier.component';

describe('MesAteliersComponent', () => {
  let component: MesAteliersComponent;
  let fixture: ComponentFixture<MesAteliersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesAteliersComponent]
    });
    fixture = TestBed.createComponent(MesAteliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
