// Imports
import {
    Component,
    Directive,
    Input,
    Output,
    ElementRef,
    ViewChild,
    Optional,
    OptionalMetadata,
    EventEmitter
} from 'angular2/core';
import {NgControl, ControlValueAccessor} from 'angular2/common';

/**
 * CKEditor component
 * Usage :
 * <textarea [(ngModel)]="data" [config]="{...}" configFile="file.js"></textarea>
 */
@Component({
    selector: 'meditor.editable',
    template: `<textarea #host></textarea>
    <button (click)="hackUpdate($event)" #button></button>`
})
@Reflect.metadata('parameters', [null, [new OptionalMetadata()]])
export class MediumContentEditor {

    @Input() config;
    @Input() configFile;

    @Output() change = new EventEmitter();
    @ViewChild('host') host;
    @ViewChild('button') button;

    value = '';
    instance = null;
    ngControl;
	elementRef;

    // Hack button
    _buttonEl;

    /**
     * Constructor
     */
    constructor(elementRef:ElementRef, ngControl:NgControl){
        if( ngControl ){
            ngControl.valueAccessor = this;
            this.ngControl = ngControl;
        }
	this.elementRef = elementRef;
    }

    /**
     * On component destroy
     */
    ngOnDestroy(){
        if( this.editor ) {
            this.instance.removeAllListeners();
            this.editor.destroy();
            this.editor = null;
        }
    }

    /**
     * On component view init
     */
    ngAfterViewInit(){
        // Configuration
        var config = {};

        // Fetch file
        if( this.configFile ){

            if( System && System.import ){
                System.import(this.configFile)
                    .then((res) => {
                        this.editorInit( res.config );
                    })
            }

        // Config object
        }else{
            config = this.config || {};
            this.editorInit( config );
        }
    }

    /**
     * Editor init
     */
    editorInit( config ){

	this.editor = new MediumEditor(this.host._appElement.nativeElement, config);

        // Hide hack button
        this._buttonEl = this.button._appElement.nativeElement;
        this._buttonEl.style.display = 'none';

	        // Change event
	let editable =  this.editor.elements[0];
            this.editor.subscribe('editableInput',  (event, editable)=> {
                          let value =this.editor.elements[0].innerHTML;

			    // This doesn't work ???
			    this.onChange( value );
			    this.change.emit( value );
			    this.ngControl.viewToModelUpdate(value);

			    // Hack
			    //this._buttonEl.dispatchEvent(new Event('click'))
            });


    }

    /**
     * Hack to update model
     */
    hackUpdate(){
        if( this.editor ){
            var value = this.vlaue;
            this.ngControl.viewToModelUpdate(value);
            //this.onChange( value );
            this.change.emit( value );
        }
    }

    /**
     * Implements ControlValueAccessor
     */
    writeValue(value){
        this.value = value;
	
        if( this.editor ){
		this.editor.elements[0].nextSibling.value=value;
           	this.editor.elements[0].innerHTML=(value);
		this.editor.elements[0].setAttribute("data-placeholder","");
	}
    }
    onChange(_){}
    onTouched(){}
    registerOnChange(fn){this.onChange = fn;}
    registerOnTouched(fn){this.onTouched = fn;}
}
