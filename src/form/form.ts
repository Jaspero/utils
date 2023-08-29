import {deepEqual} from '../deep-equal/deep-equal';
import {deepCopy} from '../deep-copy/deep-copy';

function isNumber(value: string | number) {
  return typeof value === 'number' || String(Number(value)) == value;
}

export class Validators {
  static required(value) {
    return {
      valid: value !== undefined && value !== null && value !== '',
      error: 'This field is required'
    };
  }

  static email(value) {
    return {
      valid: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
      error: 'Email is not valid'
    };
  }

  static min(minimum: number) {
    return (value: number) => {
      if (!isNumber(value)) {
        return {
          valid: false,
          error: `Field must be a number (minimum ${minimum})`
        };
      }

      const item = Number(value);
      return {
        valid: item >= minimum,
        error: `This field is too small (minimum ${minimum})`
      };
    };
  }

  static max(maximum: number) {
    return (value: number) => {
      if (!isNumber(value)) {
        return {
          valid: false,
          error: `Field must be a number (maximum ${maximum})`
        };
      }

      const item = Number(value);
      return {
        valid: item <= maximum,
        error: `This field is too big (maximum ${maximum})`
      };
    };
  }

  static minLength(minimum: number) {
    return (value: string) => {
      if (typeof value !== 'string' && !Array.isArray(value)) {
        return {
          valid: false,
          error: `This field is too short (minimum ${minimum} characters)`
        };
      }

      return {
        valid: value.length >= minimum,
        error: `This field is too short (minimum ${minimum} characters)`
      };
    };
  }

  static maxLength(maximum: number) {
    return (value: string) => {
      if (typeof value !== 'string' && !Array.isArray(value)) {
        return {
          valid: false,
          error: `This field is too long (maximum ${maximum} characters)`
        };
      }

      return {
        valid: value.length <= maximum,
        error: `This field is too long (maximum ${maximum} characters)`
      };
    };
  }

  static URL(value: string) {
    return {
      valid: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(value),
      error: 'This field is not a valid URL'
    };
  }

  static pattern(pattern: RegExp) {
    return (value: string) => {
      return {
        valid: pattern.test(value),
        error: `This field is not valid`
      };
    };
  }
}

export type ValidatorFn<T> = (value: T) => {
  valid: boolean;
  error?: string;
};

export class FormControl<T = unknown> {
  private readonly _originalValue: T;
  private _validators: ValidatorFn<T>[] = [];
  private readonly _proxy: any;
  private _subscriptions: ((value: T) => void)[] = [];
  private _touched = false;

  private _handler = {
    get: (target, key) => {
      // if (typeof target[key] === 'object' && target[key] !== null) {
      //   return new Proxy(target[key], this._handler as any as ProxyHandler<any>);
      // }
      return target[key]
    },
    set: (target, prop, value) => {
      target[prop] = value;
      if (!this._touched && !deepEqual(target[prop], this._originalValue)) {
        this._touched = true;
      }

      this._subscriptions.forEach(subscription => subscription(value));

      return true;
    }
  };

  constructor(value: T, validators?: ValidatorFn<T>[]) {
    this._originalValue = deepCopy(value);
    this._validators = validators || [];

    this._proxy = new Proxy({
      value
    }, this._handler as any as ProxyHandler<any>);
  }

  get value() {
    return this._proxy.value;
  }

  set value(value: T) {
    this._proxy.value = value;
  }

  get valid() {
    return this._validators.every(validator => validator(this._proxy.value).valid);
  }

  get invalid() {
    return !this.valid;
  }

  get errors() {
    return this._validators
      .map(validator => validator(this._proxy.value))
      .filter(result => !result.valid)
      .map(result => result.error);
  }

  get dirty() {
    return !deepEqual(this._proxy.value, this._originalValue) || this._touched;
  }

  setValue(value: T) {
    this._proxy.value = value;
  }

  subscribe(callback: (value: T) => void) {
    this._subscriptions.push(callback);

    return {
      unsubscribe: () => {
        this._subscriptions = this._subscriptions.filter(subscription => subscription !== callback);
      }
    };
  }
}

export class Form {
  controls: {
    [key: string]: FormControl;
  } = {};

  constructor(
    controls: {
      [key: string]: FormControl | [any, ...ValidatorFn<any>[]];
    }
  ) {
    this.controls = Object.keys(controls).reduce((acc, key) => {
      if (controls[key] instanceof FormControl) {
        return {
          ...acc,
          [key]: controls[key]
        };
      }

      return {
        ...acc,
        [key]: new FormControl(controls[key][0], (controls[key] as any).slice(1))
      }
    }, {});
  }

  get valid() {
    return Object.values(this.controls).every(control => control.valid);
  }

  get invalid() {
    return !this.valid;
  }

  get dirty() {
    return Object.values(this.controls).some(control => control.dirty);
  }

  get dirtyControls() {
    return Object.keys(this.controls).filter(key => this.controls[key].dirty);
  }

  get value() {
    return Object.keys(this.controls).reduce((acc, key) => ({
      ...acc,
      [key]: this.controls[key].value
    }), {});
  }

  get(key: string) {
    return this.controls[key];
  }
}
