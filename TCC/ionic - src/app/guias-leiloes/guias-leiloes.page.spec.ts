import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuiasLeiloesPage } from './guias-leiloes.page';

describe('GuiasLeiloesPage', () => {
  let component: GuiasLeiloesPage;
  let fixture: ComponentFixture<GuiasLeiloesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiasLeiloesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuiasLeiloesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
