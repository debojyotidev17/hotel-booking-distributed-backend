declare module "redlock" {
    import Redis from "ioredis";

    export default class Redlock {
        constructor(
            clients: Redis[],
            settings?: {
                driftFactor?: number;
                retryCount?: number;
                retryDelay?: number;
                retryJitter?: number;
                automaticExtensionThreshold?: number;
            },
        );

        acquire(resources: string[], ttl: number): Promise<Lock>;
    }

    class Lock {
        resources: string[];
        value: string;
        expiration: number;

        release(): Promise<void>;

        extend(ttl: number): Promise<Lock>;
    }
}
