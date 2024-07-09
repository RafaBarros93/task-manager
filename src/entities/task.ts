export type TaskProps = {
    id: string,
    title: string,
    completed?: boolean,
    createdAt?: Date,
    updatedAt?: Date
}


export class Task {

    private constructor(readonly props: TaskProps) { }

    public static create(id: string = crypto.randomUUID().toString(), title: string, completed?: boolean, createdAt?: Date, updatedAt?: Date) {
        return new Task({
            id,
            title,
            completed,
            createdAt,
            updatedAt
        })

    }

    public static with(id: string, title: string, completed: boolean, createdAt: Date, updatedAt: Date) {

        return new Task({
            id,
            title,
            completed,
            createdAt,
            updatedAt
        })

    }

    public get id() {
        return this.props.id;
    }
    public get title() {
        return this.props.title;
    }
    public get completed() {
        return this.props.completed;
    }
    public get createdAt() {
        return this.props.createdAt;
    }
    public get updatedAt() {
        return this.props.updatedAt;
    }
}