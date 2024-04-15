import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/firebase/users.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get(): string {
          return '123';
        },
      },
    },
  };
  let service : UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        [ UsersService ],
        provideAnimationsAsync(),
        importProvidersFrom(
          provideFirebaseApp(() => initializeApp(environment.firebase))
        ),
        importProvidersFrom(provideFirestore(() => getFirestore())),
      ],
    }).compileComponents();

    service = TestBed.inject(UsersService);
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
