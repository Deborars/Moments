import { MomentService } from './../../../services/moment.service';
import { Component } from '@angular/core';
import { Moments } from '../../../Moments';
import { MessageService } from '../../../services/message.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent {
  btnText = "Compartilhar!";

  constructor(
    private momentService: MomentService, 
    private messageService: MessageService,
    private router: Router
    ){}

  async createHandler(moments: Moments){
    const formData = new FormData();

    formData.append("title", moments.title);
    formData.append("description", moments.description);

    if(moments.image){
      formData.append("image", moments.image);
    }

    // todo

    await this.momentService.createMoment(formData).subscribe();

    this.messageService.add(`Momento adicionado com sucesso!`);

    this.router.navigate(['/']);
  }
}
