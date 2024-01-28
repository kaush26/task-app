type ServerConfigType = {
  url: string;
  headers: { 'Content-Type': string };
  method: string;
}

export const servers: { [cmd: string]: ServerConfigType } = {
  auth: {
    url: 'http://localhost:3026/auth',
    headers: { 'Content-Type': 'application/json', },
    method: 'GET'
  },
  signUp: {
    url: 'http://localhost:3026/signUp',
    headers: { 'Content-Type': 'application/json', },
    method: 'POST'
  },
  login: {
    url: 'http://localhost:3026/login',
    headers: { 'Content-Type': 'application/json', },
    method: 'POST'
  },
  getLists: {
    url: 'http://localhost:3026/lists',
    headers: { 'Content-Type': 'application/json', },
    method: 'GET'
  },
  addList: {
    url: 'http://localhost:3026/lists/add',
    headers: { 'Content-Type': 'application/json', },
    method: 'POST'
  },
  updateList: {
    url: 'http://localhost:3026/lists/update',
    headers: { 'Content-Type': 'application/json', },
    method: 'POST'
  },
  deleteList: {
    url: 'http://localhost:3026/lists/delete',
    headers: { 'Content-Type': 'application/json', },
    method: 'POST'
  },
  getTasks: {
    url: 'http://localhost:3026/tasks',
    headers: { 'Content-Type': 'application/json', },
    method: 'GET'
  },
  addTask: {
    url: 'http://localhost:3026/tasks/add',
    headers: { 'Content-Type': 'application/json', },
    method: 'POST'
  },
  updateTask: {
    url: 'http://localhost:3026/tasks/update',
    headers: { 'Content-Type': 'application/json', },
    method: 'POST'
  },
  deleteTask: {
    url: 'http://localhost:3026/tasks/delete',
    headers: { 'Content-Type': 'application/json', },
    method: 'POST'
  },
}