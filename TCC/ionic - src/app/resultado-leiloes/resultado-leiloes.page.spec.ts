import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultadoLeiloesPage } from './resultado-leiloes.page';

describe('ResultadoLeiloesPage', () => {
  let component: ResultadoLeiloesPage;
  let fixture: ComponentFixture<ResultadoLeiloesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoLeiloesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadoLeiloesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
