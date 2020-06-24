export default interface IQuestion{
    id?:number;
    question?: string;
    option_a?: string;
    option_b?: string;
    option_c?: string;
    option_d?: string;
    correct?: string;
    type?: string;
    isDel?: number
}