import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompagnesComponent } from './compagnes.component';

describe('CompagnesComponent', () => {
  let component: CompagnesComponent;
  let fixture: ComponentFixture<CompagnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompagnesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompagnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
