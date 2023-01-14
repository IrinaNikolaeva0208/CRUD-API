import User from "./User";

type Message = {
    statusCode: number,
    content: string | User | User[];
}

export default Message;