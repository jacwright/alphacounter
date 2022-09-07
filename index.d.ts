export declare function inc(str: string, pad?: number): string;
export declare namespace inc {
    var is: (a: string) => {
        lt: (b: string) => boolean;
        gt: (b: string) => boolean;
        eq: (b: string) => boolean;
    };
    var from: (n: number, pad?: number) => string;
    var to: (str: string, pad?: number) => number;
}
