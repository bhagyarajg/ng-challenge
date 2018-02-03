import { Component } from '@angular/core';
import { FaasPlatformService } from '../impl/faasPlatform.service';
import { Observable } from 'rxjs/Observable';
import { IFaasUsage } from '../api/FaasUsage';

@Component({
      moduleId: __moduleName,
      selector: 'my-solution',
      styleUrls: ['./solution.component.css'],
      templateUrl: 'solution.component.html'
})
export class SolutionComponent {
      readonly amberThreshold: number = 1e7;
      readonly redThreshold: number = 2e7;
      fnIds: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
      faasInfoById: any[] = [];
      faasUsageById: Observable<IFaasUsage>;
      constructor(private faasService: FaasPlatformService) {
            for (let i = 0; i < this.fnIds.length; i++) {
                  faasService.getFaasInfo$(this.fnIds[i])
                        .subscribe(info => this.faasInfoById.push(info));
            }
            this.faasInfoById.forEach(element => {
                  faasService.getFaasUsage$(element.id)
                        .subscribe(usage => { element.usage = usage; });
            });
      }
      amberAlert(size: number): boolean {
            return (this.amberThreshold < size) && (size < this.redThreshold);
      }
      redAlert(size: number): boolean {
            return size > this.redThreshold;
      }
}
