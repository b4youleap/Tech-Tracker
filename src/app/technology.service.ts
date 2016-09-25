import { Injectable } from '@angular/core';

import { Technology } from './technology';
import { TECHNOLOGIES } from './mock-technologies';

@Injectable()
export class TechnologyService {

  // stub a method like ->  getTechnologies(): void {}
  getTechnologies(): Promise<Technology[]> {
    return Promise.resolve(TECHNOLOGIES);
  }

}