import fs from "fs";
const dbFilePath = "./core/db"

console.log("[CRUD]")

interface Todo {
  date: string,
  content: string,
  done: boolean
}

function create(content: string){
  const todo: Todo = {
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
  return content;
}

function read(): Array<Todo> {
  const dbString = fs.readFileSync(dbFilePath, "utf-8")
  const db = JSON.parse(dbString || "{}")
  if(!db.todos){
    return []
  }
  return db.todos;
}
function clearDB() {
  fs.writeFileSync(dbFilePath, "")

}


//Simulação
clearDB()
create("PRIMEIRA TODO")
create("SEGUNDA TODO")
console.log(read())

