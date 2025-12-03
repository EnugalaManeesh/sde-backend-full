import { User } from '../users/user.entity';
export declare class Item {
    id: string;
    title: string;
    description?: string;
    owner: User;
}
