import User from "../types/User";

class Database {
    private dbArray: User[] = [];

    createUser(user: User) {
        this.dbArray.push(user);
        return user;
    }

    removeUser(id: string) {
        const userIndex = this.dbArray.findIndex(item => item.id == id);
        if (userIndex != -1) {
            const removedUser = this.dbArray[userIndex];
            this.dbArray.splice(userIndex, 1);
            return removedUser;
        }
        return null;
    }

    getUserById(id: string) {
        return this.dbArray.find(item => item.id == id) || null;
    }

    getAllUsers() {
        return this.dbArray;
    }

    updateUser(user: User) {
        const userIndex = this.dbArray.findIndex(item => item.id == user.id);
        this.dbArray[userIndex] = user;
        return user;
        
    }
}

export default Database;