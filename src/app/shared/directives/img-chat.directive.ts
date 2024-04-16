import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImgChat]',
  standalone: true
})
export class ImgChatDirective {

  @Input() appImgChat:string = '';
  robotPath = '../../../assets/images/svgs/chat-robot.svg';
  avatarPath = '../../../assets/images/svgs/chat-user.svg';

  constructor(
    private eRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const imgPath = this.appImgChat === 'bot' ? this.robotPath : this.avatarPath;
    this.renderer.setAttribute(this.eRef.nativeElement, 'src', imgPath);
  }

  // Cuando ocurre un error de carga en la imagen
  @HostListener('error')
  onError() {
    this.renderer.setAttribute(this.eRef.nativeElement, 'src', this.avatarPath);
  }


}
