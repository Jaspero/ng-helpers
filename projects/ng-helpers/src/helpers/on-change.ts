/**
 * Courtesy of
 * https://blog.angularindepth.com/creatively-decouple-ngonchanges-fab95395cc6e
 */

export interface SimpleChange<T> {
  firstChange: boolean;
  previousValue: T;
  currentValue: T;
  isFirstChange: () => boolean;
}

export function OnChange<T = any>(callback: (value: T, simpleChange?: SimpleChange<T>) => void) {
  const cachedValueKey = Symbol();
  const isFirstChangeKey = Symbol();
  return (target: any, key: PropertyKey) => {
    Object.defineProperty(target, key, {
      set: function (value) {
        /**
         * Change status of "isFirstChange"
         */
        this[isFirstChangeKey] = this[isFirstChangeKey] === undefined;

        /**
         *  No operation if new value is same as old value
         */
        if (!this[isFirstChangeKey] && this[cachedValueKey] === value) {
          return;
        }

        const oldValue = this[cachedValueKey];
        this[cachedValueKey] = value;
        const simpleChange: SimpleChange<T> = {
          firstChange: this[isFirstChangeKey],
          previousValue: oldValue,
          currentValue: this[cachedValueKey],
          isFirstChange: () => this[isFirstChangeKey],
        };
        callback.call(this, this[cachedValueKey], simpleChange);
      },
      get: function () {
        return this[cachedValueKey];
      }
    });
  };
}
