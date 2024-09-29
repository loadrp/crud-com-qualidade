const fs = require("fs");
const dbFilePath = "./core/db"

console.log("[CRUD]")

function create(content){
  fs.writeFileSync(dbFilePath, content)

  return content;
}

console.log(create("testando a mensagem inicial"))