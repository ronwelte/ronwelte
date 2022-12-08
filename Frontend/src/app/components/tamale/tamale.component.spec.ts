import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TamaleComponent } from "./tamale.component";

describe("TamaleComponent", () => {
  let component: TamaleComponent;
  let fixture: ComponentFixture<TamaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TamaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TamaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
