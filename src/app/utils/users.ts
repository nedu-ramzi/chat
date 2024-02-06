interface User {
    id: string | number,
    username: string,
    room: string
}

const Users: User[] = [];

//join user to chat
export function userJoin(id: string | number, username: string, room: string): User {
    const user: User = { id, username, room };

    Users.push(user);
    return user;
}

//get current user 
export function getCurrentUser(id: string | number) {
    return Users.find(user => user.id === id);
}

//user leaves chat
export function userLeave(id: string | number) {
    const index: number = Users.findIndex(user => user.id === id);

    if (index !== -1) {
        return Users.splice(index, 1)[0];
    }
    return undefined
}

//get room user
export function getRoomUsers(room: string) {
    return Users.filter(user => user.room === room);
}