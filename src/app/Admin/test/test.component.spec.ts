import { ComponentFixture, TestBed } from '@angular/core/testing';
 
import { TestComponent } from './test.component';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //#region My Test Cases

  //npm run test
  
  it('Testing a variable', () => {
    expect(component.submitted).toBe(false);
  });

  it('Testing a function without Parameters', () => {
    expect(component.functionA).toBe(10);
  });

  it('Testing a function with Parameters', () => {
    expect(component.functionB(5, 7)).toBe(12);
  });

  it('Testing html element', () => {
    const data: HTMLElement = fixture.nativeElement;
    const query = data.querySelector('h1')?.textContent;
    expect(query).toContain("THIS IS A TEST COMPONENT 01");
  });
  //#endregion
});