export interface chatResponse
{
    source:string;
    category: string;
    msg: any;
    nextIdReq:string;
    nextCategory?:string;
}