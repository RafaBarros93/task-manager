import { PrismaClient } from "@prisma/client";
import { Task } from "../../../entities/task";
import { TaskRepository } from "../task";
import { CreateOutputDto, UpdatInputDto } from "../../../services/task/task.service";


export class TaskRepositoryPrisma implements TaskRepository {


    private constructor(readonly repository: PrismaClient) { }

    public static build(prisma: PrismaClient) {
        return new TaskRepositoryPrisma(prisma);
    }

    public async save(task: Task): Promise<CreateOutputDto> {

        const data = {
            id: task.id,
            title: task.title,
            completed: task.completed,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
        }

        await this.repository.task.create({ data });

        const output: CreateOutputDto = {
            id: task.id
        }

        return output;

    }
    public async list(): Promise<Task[]> {

        const aTasks = await this.repository.task.findMany();

        const taskList = aTasks.map(({ id, title, completed, createdAt, updatedAt }) => {
            const task = Task.with(
                id,
                title,
                completed,
                createdAt,
                updatedAt
            )

            return task;
        })

        return taskList;


    }
    public async update(task: UpdatInputDto): Promise<boolean> {
        const data = {
            completed: task.completed
        }

        await this.repository.task.update({ where: { id: task.id }, data });

        return true;
    }
    public async delete(id: string): Promise<boolean> {
        const aTask = await this.repository.task.findUnique({ where: { id } });

        if (!aTask) return false;

        await this.repository.task.delete({ where: { id } });

        return true;
    }
    public async find(id: string): Promise<Task | boolean> {
        const aTask = await this.repository.task.findUnique({ where: { id } });

        if (!aTask) return false;

        const task = Task.with(aTask.id, aTask.title, aTask.completed, aTask.createdAt, aTask.updatedAt);

        return task;

    }





}