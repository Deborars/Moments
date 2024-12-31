import { MessageService } from './../../services/message.service';
import { Component } from '@angular/core';
import { MomentService } from '../../services/moment.service';
import { Moments } from '../../Moments';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css'
})
export class EditMomentComponent {
  moment!: Moments;
  btnText: string = 'Editar';

  constructor (private momentService: MomentService, private route: ActivatedRoute, private messageService: MessageService, private router: Router){}

  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe( item => {
      this.moment = item.data;
    })
  }

editHandler(momentData: Moments) {
  const id = this.moment.id;
  const formData = new FormData();

  formData.append('title', momentData.title);
  formData.append('description', momentData.description);

  if (momentData.image) {
    formData.append('image', momentData.image);
  }

  this.momentService.updateMoment(id!, formData).subscribe({
    next: () => {
      this.messageService.add(`Momento ${id} foi atualizado`);
      this.router.navigate(['/']);  // Só redireciona após o sucesso
    }
  });
}

}
