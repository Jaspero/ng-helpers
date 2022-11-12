import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[jpDropZone]'
})
export class DropZoneDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @Input() hoverClass = 'active';
  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean | Event>();

  @HostListener('drop', ['$event'])
  onDrop($event: any) {
    $event.preventDefault();
    
    this.dropped.emit($event.dataTransfer.files);

    if (this.hoverClass) {
      this.renderer.removeClass(this.el.nativeElement, this.hoverClass);
    }
    
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event: Event) {
    $event.preventDefault();
    
    if (this.hoverClass) {
      this.renderer.addClass(this.el.nativeElement, this.hoverClass);
    }

    this.hovered.emit($event);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event: Event) {
    $event.preventDefault();

    // @ts-ignore
    if ($event.currentTarget.contains($event.relatedTarget)) {
      return;
    }

    this.renderer.removeClass(this.el.nativeElement, this.hoverClass);
    this.hovered.emit(false);
  }
}
