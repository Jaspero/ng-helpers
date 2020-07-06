[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![CircleCI](https://circleci.com/gh/Jaspero/ng-helpers.svg?style=svg)](https://circleci.com/gh/Jaspero/ng-helpers)
[![NPM Version](https://img.shields.io/npm/v/@jaspero/ng-helpers.svg)](https://www.npmjs.com/package/@jaspero/ng-helpers)

# @jaspero/ng-helpers

A collection of useful components, directives and pipes for Angular applications.

Every item (component, directive and pipe) is published in a separate module, making it
easy to just import modules your application will use and not increase bundle size
unnecessarily.

- [Components](#components)
- [Directives](#directives)
  - [ClickOutsideDirective](#clickoutsidedirective)
  - [FormTouchOnHoverDirective](#formtouchonhoverdirective)
  - [StopPropagationDirective](#stoppropagationdirective)
  - [DebounceChangeDirective](#debouncechangedirective)
  - [TrackByField](#trackbyfield)
  - [LoadClickDirective](#loadclickdirective)
- [Pipes](#pipes)
  - [EnumPipe](#enumpipe)
  - [SanitizePipe](#sanitizepipe)
  - [TimePassedPipe](#timepassedpipe)
  - [EnumKeyFormatPipe](#enumkeyformatpipe)
- [Helper Classes](#helper-classes)
  - [OnChange](#onchange)

## Installation

To install this library, run:

```bash
$ npm install --save @jaspero/ng-helpers
```

Then import any Module you need. For example if you need the `ClickOutsideDirective` import the `ClickOutsideModule`.

## Components

## Directives

### ClickOutsideDirective

This directive listens for emitted events on the window object and emits
if the event doesn't contain the target element.

#### Example

```angular2html
<div (jpClickOutside)="doSomething()"></div>
```

#### Use Cases

- Closing modals, dropdowns, mobile navigations when clicked outside.
- Toggling off one item when another is clicked (accordion)

#### Outputs

| name           | description                                             |
| -------------- | ------------------------------------------------------- |
| jpClickOutside | Emits when current element isn't contained in the event |

#### Inputs

| name                  | type    | default | description                           |
| --------------------- | ------- | ------- | ------------------------------------- |
| clickOutsideEventType | string  | 'click' | event to listen for                   |
| clickOutsideBlock     | boolean | false   | if true `jpClickOutside` doesn't emit |

### FormTouchOnHoverDirective

This directive requires a `FormGroup` or `FormArray` then on mouseenter loops over all controls and marks them touched.

#### Example

```angular2html
<form [formGroup]="someForm">
  <input type="text" formControlName="someControl">

  <!--We wrapp the button so that we get mouseover event's even when the submit is disabled-->
  <div jpFormTouchOnHover>
    <button type="submit" [disabled]="someForm.invalid">Save</button>
  </div>
</form>
```

#### Use Cases

- This directive is particularly useful when you want to provide information on why the submit button is disabled.
  Since hovering over it will trigger any validation on the form.

#### Outputs

| name               | description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| jpFormTouchOnHover | Emits when controls finish looping and every element was touched |

#### Inputs

| name          | type                   | default | description                  |
| ------------- | ---------------------- | ------- | ---------------------------- |
| jpFormTouched | FormGroup or FormArray | null    | set of controls to loop over |

### StopPropagationDirective

Listens for the emitted event on the target element and simply
forwards it along and calls `event.stopPropagation()`.

#### Example

```angular2html
  <button (jpStopPropagation)="doSomething()">Click</button>
```

#### Use Cases

- When ever you need to stopPropagation on an event, you can use this directive rather then passing the event along

#### Outputs

| name              | description                                            |
| ----------------- | ------------------------------------------------------ |
| jpStopPropagation | Emits the original event after calling stopPropagation |

#### Inputs

| name                     | type    | default | description                                      |
| ------------------------ | ------- | ------- | ------------------------------------------------ |
| preventDefault           | boolean | false   | should `event.preventDefault()` also get called. |
| stopPropagationEventType | string  | 'click' | what event to listen for                         |
| condition | boolean or (event) => boolean | undefined | a condition to check before calling `event.stopPropagation()` |

### DebounceChangeDirective

Listens for the emitted event on the target element and simply
forwards it along after `debounceTime`.

#### Example

```angular2html
  <input type="text" (jpDebounceChange)="doSomething()" />
```

#### Use Cases

- When ever you need to emit events with a delay

#### Outputs

| name             | description                             |
| ---------------- | --------------------------------------- |
| jpDebounceChange | emits original event after debounceTime |

#### Inputs

| name                    | type    | default | description                              |
| ----------------------- | ------- | ------- | ---------------------------------------- |
| debounceTime            | number  | 500     | value to pass to the `debounceTime` pipe |
| debounceChangeEventType | string  | 'keyup' | what event to listen for                 |
| emitOnlyOnChange        | boolean | false   | only emit event if the value changes     |

### TrackByFieldDirective

### LoadClickDirective

Listens for the emitted click event on the target element and add loading class.

#### Example

```angular2html
  <button [jpLoadClick]="save()">Submit</button>
```

#### Use Cases

- For preventing double click on the submit button.

#### Inputs

| name                     | type            | default   | description                              |
| ------------------------ | --------------- | --------- | ---------------------------------------- |
| jpLoadClick              | Observable<any> | null      |  
| loadClickClass           | string          | 'loading' |  
| loadClickStopPropagation | boolean         | false     | Should `stopPropagation` be called. 
| loadClickEventType       | string          | 'click'   | 
| loadClickPreventDefault  | boolean         | false     | Should `preventDefault` be called. 
| disableAttribute         | boolean         | true      | Should the disabled attribute be attached to the element. 

## Pipes

### EnumPipe

A very simple pipe that returns an array of `{key: number, value: string}` objects from an enum.

#### Example

```angular2html
  <select>
    <option *ngFor="let item of someEnum | jpEnum" [value]="item.key">
      {{item.value}}
    </option>
  </select>
```

#### Use Cases

- It's most commonly used to easily iterate over an enum in a select

#### Input Value

| value | type | description                                                                                      |
| ----- | ---- | ------------------------------------------------------------------------------------------------ |
| value | enum | Supports any enum value. Provide it in typescript `someEnum = SomeEnum` to iterate over in html. |

#### Parameters

No parameters for `EnumPipe`

### SanitizePipe

Simplifies using of `DomSanitizer`. The pipe accepts any value and then tries to sanitize it to the desired format.

#### Example

```angular2html
<div [innerHtml]="unsanitizedHtml | jpSanitize:'html'"></div>
```

#### Use Cases

- Rendering raw html, styles...

#### Input Value

| value | type   | description                                                       |
| ----- | ------ | ----------------------------------------------------------------- |
| value | string | Accepts any unsanitized string and runs it through `DomSanitizer` |

#### Parameters

| param | type                                          | default | description                                                                |
| ----- | --------------------------------------------- | ------- | -------------------------------------------------------------------------- |
| type  | html or style or script or url or resourceUrl | html    | Type of entry value. This determines what `DomSanitizer` method get's used |

### TimePassedPipe

This pipe takes a date as input and returns the elapsed time since that date as a number in the desired format.

#### Example

```angular2html
<div>
 {{someDate | jpTimePassed:null:timePassedType.Minute}} minutes ago
</div>
```

#### Use Cases

- Displaying elapsed time

#### Input Value

| value | type | description |
| ----- | ---- | ----------- |
| value | Date | any date    |

#### Parameters

| param   | type           | default               | description                                                               |
| ------- | -------------- | --------------------- | ------------------------------------------------------------------------- |
| dateTwo | Date           | current date          | This is the ending date in the interval. It defaults to the current date. |
| type    | TimePassedType | TimePassedType.Minute | In what time format should the elapsed time be returned in.               |

### EnumKeyFormatPipe

#### Example

```angular2html
<div *ngFor="let item of someObject | jpArrayFromObject">
  <span>KEY: {{item.key}}</span>
  <span>VALUE: {{item.value}}</span>
</div>
```

#### Use Cases

- This pipe is useful when ever you need to iterate an object in your template

#### Input Value

| value | type   | description |
| ----- | ------ | ----------- |
| value | object | any object  |

#### Parameters

No parameters for `ArrayFromObjectPipe`

### OnChange

A decorator for change detection on properties
https://blog.angularindepth.com/creatively-decouple-ngonchanges-fab95395cc6e

## License

MIT © [Jaspero Ltd](mailto:info@jaspero.co)
