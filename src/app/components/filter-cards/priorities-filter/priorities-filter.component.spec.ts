import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritiesFilterComponent } from './priorities-filter.component';

describe('PrioritiesFilterComponent', () => {
  let component: PrioritiesFilterComponent;
  let fixture: ComponentFixture<PrioritiesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrioritiesFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrioritiesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
