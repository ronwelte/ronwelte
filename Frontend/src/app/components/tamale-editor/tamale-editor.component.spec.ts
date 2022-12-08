import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TamaleEditorComponent } from "./tamale-editor.component";

describe("TamaleEditorComponent", () => {
  let component: TamaleEditorComponent;
  let fixture: ComponentFixture<TamaleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TamaleEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TamaleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
