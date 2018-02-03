import { Component } from '@angular/core';
import { FaasPlatformService } from '../impl/faasPlatform.service';
import { Observable } from 'rxjs/Observable';
import { IFaasUsage } from '../api/FaasUsage';

@Component({
   moduleId: __moduleName,
   selector: 'my-solution',
   templateUrl: 'solution.component.html'
})
export class SolutionComponent {
   fnIds: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
   faasInfoById: any[] = [];
   faasUsageById: Observable<IFaasUsage>;

   constructor(private faasService: FaasPlatformService) {
      for (let i = 0; i < this.fnIds.length; i++) {
         faasService.getFaasInfo$(this.fnIds[i])
            .subscribe(
            info => { // console.log(info);
               this.faasInfoById.push(info);
            });

         //     this.faasUsageById = faasService.getFaasUsage$(this.fnIds[i]);
         /*   .subscribe(
            usage => { //console.log(usage);
               this.faasInfoById.push(usage); }
            );*/

      }
      this.faasInfoById.forEach(element => {
         //  console.log(element.id);
         //   console.log(faasService.getFaasUsage$(element.id));
         //element.usage =
         faasService.getFaasUsage$(element.id)
            .subscribe(usage => { element.usage = usage; }
            );
         console.log(element);
      });
      //  console.log(this.faasInfoById);

   }


}
