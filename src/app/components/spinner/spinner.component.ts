import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';
import {SpinnerService} from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  @Input() name: string;
  @Input() group: string;

  @Input()
  get show(): boolean {
    return this.isShowing;
  }

  @Output() showChange = new EventEmitter();

  set show(val: boolean) {
    this.isShowing = val;
    this.showChange.emit(this.isShowing);

    if (this.isShowing) {
      this.renderer.addClass(document.body, 'overlay');
    } else {
      this.renderer.removeClass(document.body, 'overlay');
    }
  }


  private isShowing = false;

  constructor(private spinnerService: SpinnerService,
              private renderer: Renderer2) {

  }

  ngOnInit() {
    if (!this.name) {
      throw new Error('Spinner must have a \'fileName\' attribute.');
    }
    this.spinnerService._register(this);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'overlay');
    this.spinnerService._unregister(this);
  }
}

