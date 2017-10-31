import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { beforeMethod } from 'kaop-ts';import { LogAspect } from '../helpers/logAspect';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
