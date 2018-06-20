[![Build Status](https://travis-ci.org/Jaspero/ng-helpers.svg?branch=master)](https://travis-ci.org/Jaspero/ng-helpers)
[![NPM Version](https://img.shields.io/npm/v/@jaspero/ng-helpers.svg)](https://www.npmjs.com/package/@jaspero/ng-helpers)

# @jaspero/ng-helpers

A collection of useful components, directives and pipes for Angular applications.

Every item (component, directive and pipe) is published in a separate module, making it
easy to just import modules your application will use and not increase bundle size 
unnecessarily.

  - [Components](#components)
  - [Directives](#directives)
    - [ClickOutside](#clickoutsidedirective)
    - [FormTouchOnHover](#formtouchonhoverdirective)
    - [StopPropagation](#stoppropagationdirective)
    - [DebounceChange](#debouncechangedirective)
  - [Pipes](#pipes)
    - [EnumPipe](#enumpipe)
    - [SanitizePipe](#sanitizepipe)
    - [TimePassedPipe](#timepassedpipe)
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

#### Example

#### Use Cases

#### Input Value

#### Parameters

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
