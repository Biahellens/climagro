export interface Device {
  id: number,
  name: string,
  listCommands: Command[]
}

export type Command = {
  id: number;
  name: string;
  url: string;
}
