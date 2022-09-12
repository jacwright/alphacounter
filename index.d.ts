export declare type Counter = string | undefined | null;
export declare function inc(counter: Counter, pad?: number): string;
export declare namespace inc {
    var is: (a: Counter) => {
        lt: (b: Counter) => boolean;
        gt: (b: Counter) => boolean;
        eq: (b: Counter) => boolean;
    };
    var from: (number: number, pad?: number) => string;
    var to: (counter: string, pad?: number) => number;
    var invert: (counter: string, pad?: number) => string;
}
