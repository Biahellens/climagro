export interface Command {
  id: string;
  name: string;
  url: string;
  userId: string;
}

export interface CommandsShow {
  id: number,
  name: string,
  url: string,
  deviceId: string,
  userId: string,
}
