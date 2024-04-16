import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ImgChatDirective } from '../../../../shared/directives/img-chat.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-proof',
  standalone: true,
  imports: [CommonModule, ImgChatDirective, FormsModule],
  templateUrl: './chat-proof.component.html',
  styleUrl: './chat-proof.component.scss'
})
export class ChatProofComponent {

  message = '';
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  chats:any = [
    // {id: 1, user: 'x', message: 'Nulla ut qui deserunt ad officia proident fugiat proident officia sint deserunt fugiat consequat sunt.'},
    // {id: 2, user: 'bot', message: 'AElit laborum nulla cillum proident consequat ut. Elit laborum nulla cillum proident consequat ut. Elit laborum nulla cillum proident consequat ut. Elit laborum nulla cillum proident consequat ut.'},
  ];


  get iconClass(){
    return this.message ? 'text-primary' : 'text-muted';
  }


  //METHODS---------------------------------------------------------------------------------

  sendMessage() {
    if(!this.message) return;

    this.chats.push({id: 1, user: 'x', message: this.message});
    this.message = '';

    //TODO: get response from api
    const response = 'Anim labore anim pariatur nulla magna esse fugiat dolore ut mollit.';
    this.chats.push({id: 2, user: 'bot', message: response});
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer) { // Ensures element exists before access
        this.chatContainer.nativeElement.scrollTo({
          top: this.chatContainer.nativeElement.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 0);
  }


}
