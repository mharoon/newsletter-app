export class ResponseItem {
    StatusCode: number;
    StatusMessage: string;
}

export enum STATUS_CODE {
    Error = 0,
    Success = 1,
    DuplicateEmail = 2
}

export const STATUS_MSG = Object.freeze ({
    Error: "There is some error in processing the request. Please try again.!",
    Success: "Thank You for Subscribing!"
})


