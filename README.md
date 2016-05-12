# Angular2 - MediumEditor component

Use the [MediumEditor (15.5.x)] wysiwyg in your Angular2 application.

### <a name="install"></a>Installation

- Include MediumEditor javascript files in your application
- Install ng2-mediumeditor
  - NPM : ```npm install ng2-medium-editor```

### <a name="sample"></a>Sample (ES6)

```javascript
import {Component} from 'angular2/core';
import {MediumContentEditor} from 'ng2-medium-editor';

@Component({
  selector: 'sample',
  directives: [MediumContentEditor],
  template: `<meditor  [(ngModel)]="data.content"  class="editable"  #content="ngForm"  ngControl="content"></meditor>`
})
export class Sample{
  constructor(){
    this.editorContent = `<p>My HTML</p>`;
  }
}
```


