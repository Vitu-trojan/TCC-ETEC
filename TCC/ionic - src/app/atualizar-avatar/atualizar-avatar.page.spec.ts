import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtualizarAvatarPage } from './atualizar-avatar.page';

describe('AtualizarAvatarPage', () => {
  let component: AtualizarAvatarPage;
  let fixture: ComponentFixture<AtualizarAvatarPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarAvatarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtualizarAvatarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
