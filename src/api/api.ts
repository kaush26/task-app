import { servers } from "./servers";

type ConfigType = {
  body?: string;
  headers: { 'Content-Type': string, Authorization: string };
  method: string;
  signal: AbortSignal;
}

export default class API {
  controller
  constructor() {
    this.controller = new AbortController();
  }
  call = async ({ cmd, payload }: { cmd: string; payload?: object }) => {
    const { url, headers, method } = servers[cmd]
    const config: ConfigType = { headers: { ...headers, Authorization: "Bearer " + localStorage.getItem('token') }, method, signal: this.controller.signal };

    if (method === 'POST') config.body = JSON.stringify(payload)

    const res = await fetch(url, config);
    return await res.json()
  }
}