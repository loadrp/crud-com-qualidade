import fs from "fs";
import { v4 as uuid } from "uuid";

const dbFilePath = "./core/db";

type UUID = string;

interface Todo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

export function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };
  const todos: Array<Todo> = [...read(), todo];

  fs.writeFileSync(
    dbFilePath,
    JSON.stringify(
      {
        todos,
        dogs: [],
      },
      null,
      2
    )
  );
  return todo;
}

export function read(): Array<Todo> {
  const dbString = fs.readFileSync(dbFilePath, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    return [];
  }
  return db.todos;
}

function update(id: UUID, partialTodo: Partial<Todo>): Todo {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });
  fs.writeFileSync(dbFilePath, JSON.stringify({ todos }, null, 2));
  if (!updatedTodo) {
    throw new Error("Please, provide another ID");
  }
  return updatedTodo;
}
function updateContentById(id: UUID, content: string): Todo {
  return update(id, { content });
}

function deleteById(id: UUID) {
  const todos = read();
  const todosWithoutOneID = todos.filter((todos) => {
    return todos.id !== id;
  });
  fs.writeFileSync(
    dbFilePath,
    JSON.stringify({ todos: todosWithoutOneID }, null, 2)
  );
}

function clearDB() {
  fs.writeFileSync(dbFilePath, "");
}

//Simulação
clearDB();
create("PRIMEIRA TODO");
const secondTodo = create("Segunda TODO");
const terceiraTodo = create("terceira TODO");
update(terceiraTodo.id, {
  content: "Segunda todo com novo content",
});
updateContentById(terceiraTodo.id, "Atualizada");
deleteById(secondTodo.id);
deleteById(terceiraTodo.id);
