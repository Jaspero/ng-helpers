[![Build Status](https://travis-ci.org/Jaspero/ng-helpers.svg?branch=master)](https://travis-ci.org/Jaspero/ng-helpers)
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
  - [Pipes](#pipes)
    - [EnumPipe](#enumpipe)
    - [SanitizePipe](#sanitizepipe)
    - [TimePassedPipe](#timepassedpipe)
    - [ArrayFromObjectPipe](#arrayfromobjectpipe)
  - [Helper Classes](#helper-classes)
    - [RxDestroy](#rxdestroy)

## Installation

To install this library, run:

```bash
$ npm install --save @jaspero/ng-helpers
```

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

|name|description|
|---|---|
|jpClickOutside|Emits when current element isn't contained in the event|

#### Inputs

|name|type|default|description|
|---|---|---|---|
|clickOutsideEventType|string|'click'|event to listen for|
|clickOutsideBlock|boolean|false|if true `jpClickOutside` doesn't emit|

### FormTouchOnHoverDirective

#### Example

#### Use Cases

#### Outputs

#### Inputs

### StopPropagationDirective

Listens for the emitted event on the target element and simply 
forwards it along and calls `event.stopPropagation()`.

#### Example

#### Use Cases

#### Outputs

#### Inputs

### DebounceChangeDirective

Listens for the emitted event on the target element and simply
forwards it along after `debounceTime`.

#### Example

#### Use Cases

#### Outputs

#### Inputs

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

|value|type|description|
|---|---|---|
|value|enum|Supports any enum value. Provide it in typescript `someEnum = SomeEnum` to iterate over in html. 

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

|value|type|description|
|---|---|---|
|value|string|Accepts any unsanitized string and runs it through `DomSanitizer`  

#### Parameters

|param|type|default|description|
|---|---|---|---|
|type|html or style or script or url or resourceUrl|html|Type of entry value. This determines what `DomSanitizer` method get's used|

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

|value|type|description|
|---|---|---|
|value|Date|any date|

#### Parameters

|param|type|default|description|
|---|---|---|---|
|dateTwo|Date|current date|This is the ending date in the interval. It defaults to the current date.|
|type|TimePassedType|TimePassedType.Minute|In what time format should the elapsed time be returned in.|

### ArrayFromObjectPipe

This pipe takes an object as input and returns an array with `{key: string, value: any}`.

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

|value|type|description|
|---|---|---|
|value|object|any object  

#### Parameters

No parameters for `ArrayFromObjectPipe`

## Helper Classes

### RxDestroy

A dead simple helper class that's intended to extend components.
It uses the `OnDestroy` angular life cycle hook, it calls `next()` and
`complete()` on `destroyed$` Subject. 

This means that instead of calling `unsubscribe()` on all your observables
in the `OnDestroy` hook, you can simply do this:

```ts
interval(1000)
  .pipe(
    takeUntil(this.destroyed$)
  )
  .subscribe(_ => {});
```

## License

MIT © [Jaspero Ltd](mailto:info@jaspero.co)
