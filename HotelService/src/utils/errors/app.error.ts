export interface AppError extends Error {
    statusCode: number;
}

export class InternalServerError implements AppError {
    statusCode: number;
    message: string;
    name: string;
    constructor(message: string) {
        this.statusCode = 500;
        this.message = message;
        this.name = "Internal Server Error";
    }
}

export class NotFoundError implements AppError {
    statusCode: number;
    message: string;
    name: string;
    constructor(message: string) {
        this.statusCode = 404;
        this.message = message;
        this.name = "Not Found Error";
    }
}
