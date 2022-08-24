export declare function inc(str: string, pad?: number): string;
export declare namespace inc {
    var is: (a: string) => {
        lt: (b: string) => boolean;
        gt: (b: string) => boolean;
        eq: (b: string) => boolean;
    };
}
