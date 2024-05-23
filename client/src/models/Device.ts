export interface Device {
  id: string,
  name: string,
  listCommands: Command[]
}

export type Command = {
  id: string;
  name: string;
  url: string;
}
