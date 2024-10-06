import fs from "fs";
import {v4 as uuid} from "uuid";

const dbFilePath = "./core/db"



interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo{
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false
  }
  const todos: Array<Todo> = [
    ...read(),
    todo,
  ];

  fs.writeFileSync(dbFilePath, JSON.stringify({
    todos,
    dogs: []

  }, null, 2));
  return todo;
}

function read(): Array<Todo> {
  const dbString = fs.readFileSync(dbFilePath, "utf-8")
  const db = JSON.parse(dbString || "{}")
  if(!db.todos){
    return []
  }
  return db.todos;
}

function update(id:string, partialTodo: Partial<Todo>) : Todo{
  let updatedTodo
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if(isToUpdate){
      updatedTodo = Object.assign(currentTodo, partialTodo)
    }
  })
  fs.writeFileSync(dbFilePath, JSON.stringify({todos},null,2))
  if(!updatedTodo) {
    throw new Error("Please, provide another ID")
  }
  return updatedTodo;
}
function updateContentById(id: string, content:string): Todo {
  return update(id, {content,})
}


function clearDB() {
  fs.writeFileSync(dbFilePath, "")
}


//Simulação
clearDB()
create("PRIMEIRA TODO")
create("Segunda TODO")
const terceiraTodo = create("terceira TODO")
update(terceiraTodo.id, {
  content: "Segunda todo com novo content",
})
updateContentById(terceiraTodo.id, "Atualizada")
console.log(read())

