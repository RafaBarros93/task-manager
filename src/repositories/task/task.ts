import { Task } from "../../entities/task";
import { CreateOutputDto, UpdatInputDto } from "../../services/task/task.service";

export interface TaskRepository {
    save(task: Task): Promise<CreateOutputDto>;
    list(): Promise<Task[]>;
    update(task: UpdatInputDto): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    find(id: string): Promise<Task | boolean>;

}