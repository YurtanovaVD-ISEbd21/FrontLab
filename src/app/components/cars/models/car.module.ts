export class Car{
    id: number;
    model: string;
    price: number;
    status: number;
    start_use_date: Date;
    end_use_date: Date;
    
    public deserialize(input: any): this {
        return Object.assign(this, input);
    }
}