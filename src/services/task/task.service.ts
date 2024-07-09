import { Task } from "../../entities/task";

export type ListOutputDto = {
    tasks: {
        id: string,
        title: string,
        completed: boolean,
        createdAt: Date,
        updatedAt: Date
    }[];
}

export type CreateInputDto = {
    title: string,
    completed?: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

export type CreateOutputDto = {
    id: string;

}

export type UpdatInputDto = {
    id: string;
    completed: boolean
}


export type UpdateOutputDto = {
    isUpdated: boolean;

}
export type DeleteInputDto = {
    id: string

}



export type DeleteOutputDto = {
    isDeleted: boolean;

}



export interface TasksService {
    create(task: CreateInputDto): Promise<CreateOutputDto>,
    list(): Promise<ListOutputDto>
    update(task: UpdatInputDto): Promise<UpdateOutputDto>
    delete(id: string): Promise<DeleteOutputDto>
}