export interface Device {
  id: number,
  name: string,
  listCommands?: Command[]
}

export interface Command {
  id: number;
  name: string;
  url: string;
}
