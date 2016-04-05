'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MediumContentEditor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5; // Imports


var _core = require('angular2/core');

var _common = require('angular2/common');

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

/**
 * CKEditor component
 * Usage :
 * <textarea [(ngModel)]="data" [config]="{...}" configFile="file.js"></textarea>
 */
var MediumContentEditor = exports.MediumContentEditor = (_dec = (0, _core.Component)({
    selector: 'meditor.editable',
    template: '<textarea #host></textarea>\n    <button (click)="hackUpdate($event)" #button></button>'
}), _dec2 = Reflect.metadata('parameters', [null, [new _core.OptionalMetadata()]]), _dec3 = (0, _core.Input)(), _dec4 = (0, _core.Input)(), _dec5 = (0, _core.Output)(), _dec6 = (0, _core.ViewChild)('host'), _dec7 = (0, _core.ViewChild)('button'), _dec(_class = _dec2(_class = (_class2 = function () {

    /**
     * Constructor
     */

    function MediumContentEditor(elementRef, ngControl) {
        _classCallCheck(this, MediumContentEditor);

        _initDefineProp(this, 'config', _descriptor, this);

        _initDefineProp(this, 'configFile', _descriptor2, this);

        _initDefineProp(this, 'change', _descriptor3, this);

        _initDefineProp(this, 'host', _descriptor4, this);

        _initDefineProp(this, 'button', _descriptor5, this);

        this.value = '';
        this.instance = null;
        this.ngControl = this.ngControl;
        this.elementRef = this.elementRef;
        this._buttonEl = this._buttonEl;

        if (ngControl) {
            ngControl.valueAccessor = this;
            this.ngControl = ngControl;
        }
        this.elementRef = elementRef;
    }

    /**
     * On component destroy
     */


    // Hack button


    _createClass(MediumContentEditor, [{
        key: 'ngOnDestroy',
        value: function ngOnDestroy() {
            if (this.editor) {
                this.instance.removeAllListeners();
                this.editor.destroy();
                this.editor = null;
            }
        }

        /**
         * On component view init
         */

    }, {
        key: 'ngAfterViewInit',
        value: function ngAfterViewInit() {
            var _this = this;

            // Configuration
            var config = {};

            // Fetch file
            if (this.configFile) {

                if (System && System.import) {
                    System.import(this.configFile).then(function (res) {
                        _this.editorInit(res.config);
                    });
                }

                // Config object
            } else {
                    config = this.config || {};
                    this.editorInit(config);
                }
        }

        /**
         * Editor init
         */

    }, {
        key: 'editorInit',
        value: function editorInit(config) {
            var _this2 = this;

            this.editor = new MediumEditor(this.host._appElement.nativeElement, config);

            // Hide hack button
            this._buttonEl = this.button._appElement.nativeElement;
            this._buttonEl.style.display = 'none';

            // Change event
            var editable = this.editor.elements[0];
            this.editor.subscribe('editableInput', function (event, editable) {
                var value = _this2.editor.elements[0].innerHTML;

                // This doesn't work ???
                _this2.onChange(value);
                _this2.change.emit(value);
                _this2.ngControl.viewToModelUpdate(value);

                // Hack
                //this._buttonEl.dispatchEvent(new Event('click'))
            });
        }

        /**
         * Hack to update model
         */

    }, {
        key: 'hackUpdate',
        value: function hackUpdate() {
            if (this.editor) {
                var value = this.vlaue;
                this.ngControl.viewToModelUpdate(value);
                //this.onChange( value );
                this.change.emit(value);
            }
        }

        /**
         * Implements ControlValueAccessor
         */

    }, {
        key: 'writeValue',
        value: function writeValue(value) {
            this.value = value;

            if (this.editor) {
                this.editor.elements[0].nextSibling.value = value;
                this.editor.elements[0].innerHTML = value;
                this.editor.elements[0].setAttribute("data-placeholder", "");
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(_) {}
    }, {
        key: 'onTouched',
        value: function onTouched() {}
    }, {
        key: 'registerOnChange',
        value: function registerOnChange(fn) {
            this.onChange = fn;
        }
    }, {
        key: 'registerOnTouched',
        value: function registerOnTouched(fn) {
            this.onTouched = fn;
        }
    }]);

    return MediumContentEditor;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'config', [_dec3], {
    enumerable: true,
    initializer: function initializer() {
        return this.config;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'configFile', [_dec4], {
    enumerable: true,
    initializer: function initializer() {
        return this.configFile;
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'change', [_dec5], {
    enumerable: true,
    initializer: function initializer() {
        return new _core.EventEmitter();
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'host', [_dec6], {
    enumerable: true,
    initializer: function initializer() {
        return this.host;
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'button', [_dec7], {
    enumerable: true,
    initializer: function initializer() {
        return this.button;
    }
})), _class2)) || _class) || _class);
Reflect.defineMetadata('design:paramtypes', [_core.ElementRef, _common.NgControl], MediumContentEditor);
//# sourceMappingURL=MediumContentEditor.js.map
