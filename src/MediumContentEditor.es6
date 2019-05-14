import { Component, Input, Output, ViewChild, EventEmitter, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as MediumEditor from 'medium-editor';

/**
* MediumEditor component
* Usage :
* <medium-editor [(html)]="data" [config]="{...}" ></medium-editor>
*/
@Component({
  selector: 'medium-editor',
  template: `<div #host></div>`,
  styleUrls: [
    './medium-editor.component.less',
  ]
})
export class MediumContentEditor implements OnInit, OnChanges {
  @Input() config : any;
  @Output() change: EventEmitter<any> = new EventEmitter();
  @ViewChild('host') host : any;

  @Input() html: string = '';
  @Output() htmlChange: EventEmitter<string> = new EventEmitter();

  private value: string = '';
  private instance: any = null;
  private editor: any;


  /**
   * Constructor
   */
  constructor(elementRef:ElementRef,
    ) {
  }

  /**
   * On component destroy
   */
  ngOnDestroy(): void {
    if( this.editor ) {
      this.instance.removeAllListeners();
      this.editor.destroy();
      this.editor = null;
    }
  }

  /**
   * On component view init
   */
  ngAfterViewInit() : void {
    this.editorInit( this.config );
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.html && this.editor && this.editor.elements && this.editor.elements[0] && this.editor.elements[0].innerHTML !== changes.html.currentValue) {
      this.editor.elements[0].innerHTML = changes.html.currentValue;
    }
  }

  /**
   * Editor init
   */
  editorInit( config: any ) : void {

    this.editor = new MediumEditor(this.host.nativeElement, config);

    if(this.html) {
      this.editor.elements[0].innerHTML = this.html;
    }
    this.editor.subscribe('editableInput',  (event, editable)=> {
      let value = this.editor.elements[0].innerHTML;
      this.htmlChange.emit( value );

    });


  }

  onChange() : void {}
  onTouched() : void {}
  registerOnChange (fn: any) : void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any )  : void {
    this.onTouched = fn;
  }
}
