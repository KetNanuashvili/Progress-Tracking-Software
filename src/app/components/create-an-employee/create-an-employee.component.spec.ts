import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnEmployeeComponent } from './create-an-employee.component';

describe('CreateAnEmployeeComponent', () => {
  let component: CreateAnEmployeeComponent;
  let fixture: ComponentFixture<CreateAnEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAnEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAnEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
