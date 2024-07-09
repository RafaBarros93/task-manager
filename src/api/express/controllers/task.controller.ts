import { Request, Response } from "express";
import { TaskRepository } from "../../../repositories/task/task";
import { TaskRepositoryPrisma } from "../../../repositories/task/prisma/task.repository.prisma";
import { prisma } from "../../../util/prisma.util";
import { TasksServiceImplementation } from "../../../services/implementation/task.service.implementation";
import { CreateInputDto, CreateOutputDto, DeleteInputDto, UpdatInputDto } from "../../../services/task/task.service";




export class TaskController {



    public static build() {

        return new TaskController();
    }


    public async create(request: Request, response: Response) {
        const { title, completed, createdAt, updatedAt } = request.body;

        const aTask = TaskRepositoryPrisma.build(prisma);
        const aService = TasksServiceImplementation.build(aTask);

        const task: CreateInputDto = {
            title,
            completed,
            createdAt,
            updatedAt
        }

        const result = await aService.create(task);


        response.status(201).json(result).send();


    }

    public async list(request: Request, response: Response) {
        const aTask = TaskRepositoryPrisma.build(prisma);
        const aService = TasksServiceImplementation.build(aTask);


        const output = await aService.list();


        response.status(201).json(output).send();


    }

    public async update(request: Request, response: Response) {
        const { completed } = request.body;
        const { id } = request.params


        const aTask = TaskRepositoryPrisma.build(prisma);
        const aService = TasksServiceImplementation.build(aTask);

        const task: UpdatInputDto = {
            id,
            completed
        }

        try {
            const output = await aService.update(task);


            response.status(201).json(output.isUpdated).send();


        } catch (error: unknown) {

            if (error) response.status(404).json(error.toString()).send();

        }


    }
    public async delete(request: Request, response: Response) {
        const { id } = request.params


        const aTask = TaskRepositoryPrisma.build(prisma);
        const aService = TasksServiceImplementation.build(aTask);



        try {
            const output = await aService.delete(id);


            response.status(201).json(output.isDeleted).send();


        } catch (error) {

            response.status(401).json(error).send();

        }

    }

}



