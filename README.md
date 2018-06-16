[![Build Status](https://travis-ci.org/Jaspero/ng-helpers.svg?branch=master)](https://travis-ci.org/Jaspero/ng-helpers)
[![NPM Version](https://img.shields.io/npm/v/@jaspero/ng-helpers.svg)](https://www.npmjs.com/package/@jaspero/ng-helpers)

# @jaspero/ng-helpers

A collection of useful components, directives and pipes for Angular applications.

  - [Components](#components)
  - [Directives](#directives)
    - [ClickOutside](#clickoutsidedirective)
    - [FormTouchOnHover](#formtouchonhoverdirective)
    - [StopPropagation](#stoppropagationdirective)
    - [DebounceChange](#debouncechangedirective)
  - [Pipes](#pipes)
    - [EnumPipe](#enumpipe)
    - [SanitizePipe](#sanitizepipe)
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

```html
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

### StopPropagationDirective

Listens for the emitted event on the target element and simply 
forwards it along and calls 'event.stopPropagation()'.

### DebounceChangeDirective

Listens for the emitted event on the target element and simply
forwards it along after `debounceTime`.

## Pipes 

### EnumPipe

### SanitizePipe

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
