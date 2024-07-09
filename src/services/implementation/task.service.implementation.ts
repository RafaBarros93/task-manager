import { title } from "process";
import { Task } from "../../entities/task";
import { TaskRepository } from "../../repositories/task/task";
import { CreateInputDto, CreateOutputDto, DeleteOutputDto, ListOutputDto, TasksService, UpdateOutputDto, UpdatInputDto } from "../task/task.service";


export class TasksServiceImplementation implements TasksService {

    private constructor(readonly repository: TaskRepository) { }

    public static build(repository: TaskRepository) {
        return new TasksServiceImplementation(repository);
    }

    public async create(task: CreateInputDto): Promise<CreateOutputDto> {

        const aTask = Task.create(undefined, task.title, task?.completed, task?.createdAt, task?.updatedAt)

        const result = await this.repository.save(aTask);

        const output: CreateOutputDto = {
            id: result.id
        }

        return output;


    }

    public async list(): Promise<ListOutputDto> {

        const aTaks = await this.repository.list();

        const tasks = aTaks.map((task) => {
            return {
                id: task.id,
                title: task.title,
                completed: task.completed!,
                createdAt: task.createdAt!,
                updatedAt: task.updatedAt!
            }
        })
        const output: ListOutputDto = {
            tasks
        }

        return output;

    }


    public async update(task: UpdatInputDto): Promise<UpdateOutputDto> {
        const aTask = await this.repository.find(task.id);

        if (!aTask) throw new Error(`A tarefa ${task.id} não foi encontrada!`);

        await this.repository.update(task);

        const output: UpdateOutputDto = {
            isUpdated: true
        };

        return output;

    }

    public async delete(id: string): Promise<DeleteOutputDto> {
        const aTask = await this.repository.find(id);

        if (!aTask) throw new Error(`A tarefa ${id} não foi encontrada!`);

        await this.repository.delete(id);

        const output: DeleteOutputDto = {
            isDeleted: true
        };

        return output;
    }



}