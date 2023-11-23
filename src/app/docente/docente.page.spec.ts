import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DocentePage } from './docente.page';

describe('HomePage', () => {
  let component: DocentePage;
  let fixture: ComponentFixture<DocentePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocentePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

