import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { Moments } from '../../../Moments';
import { environment } from '../../../../environments/environment';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent {
  moment?: Moments;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(private momentService: MomentService, private route: ActivatedRoute, private messageService: MessageService, private router: Router){}

  ngOnInit():void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService.getMoment(id).subscribe( item => this.moment = item.data);
  }

  removeHandler(id:number){
    this.momentService.removeMoment(id).subscribe({
      next: () =>{
        this.messageService.add('Momento excluído com sucesso!');
        this.router.navigate(['/']); 
      }
    }); 
  }
}
