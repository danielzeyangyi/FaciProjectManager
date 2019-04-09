export interface Task {
    id?: string;
    desc:string;
    completed:boolean;
    priority: number;
    ownerId:string; 
    createData: Date;
    participantIds: string[];
    taskListId: string;
    createDate?: Date;
    dueDate?: Date; 
    reminder?: Date;
    remark?:string;
}