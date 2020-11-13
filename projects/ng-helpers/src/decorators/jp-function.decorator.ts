import {take} from 'rxjs/operators';

/**
 * @param options
 * take: Number passed to take operator (0 skips operator)
 */
export const JpFunction = (options: {take?: number} = {}) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    target[propertyKey] = function(...args) {
      const caller = /(\w+)@|at (\w+) \(/g.exec(Error().stack);
      const callerName = caller[1] || caller[2];
      const pipeline = [];
      if (options.take !== 0) {
        pipeline.push(take(options.take || 1));
      }
      return callerName === 'callHook' || callerName === 'invokeTask'
        ? descriptor.value
            .apply(this, args)
            .pipe(...pipeline)
            .subscribe()
        : () => descriptor.value.apply(this, args);
    };
    return target;
  };
};
