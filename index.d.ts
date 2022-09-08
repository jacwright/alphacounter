export declare function inc(counter: string, pad?: number): string;
export declare namespace inc {
    var is: (a: string) => {
        lt: (b: string) => boolean;
        gt: (b: string) => boolean;
        eq: (b: string) => boolean;
    };
    var from: (number: number, pad?: number) => string;
    var to: (counter: string, pad?: number) => number;
}
