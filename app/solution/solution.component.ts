import { Component } from '@angular/core';
import { FaasPlatformService } from '../impl/faasPlatform.service';

@Component({
   moduleId: __moduleName,
   selector: 'my-solution',
   templateUrl: 'solution.component.html'
})
export class SolutionComponent {
   fnIds: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
   faasInfoById: any[] = [];

   constructor(private faasService: FaasPlatformService) {
      for (let i = 0; i < this.fnIds.length; i++) {
         faasService.getFaasInfo$(this.fnIds[i])
            .subscribe(
            info => { console.log(info); this.faasInfoById.push(info); });
      }
   }


}
