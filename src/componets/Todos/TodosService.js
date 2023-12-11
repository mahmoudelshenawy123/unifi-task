const { Todos } = require('./TodosModel');

exports.AddTodo=async(data)=>{
  try {
    let addedTodo = await Todos.create(data)
    return addedTodo
  } catch (error) {
    throw error
  }
}

exports.UpdateTodo=async(id,data)=>{
  try {
    let Todo = await Todos.findByIdAndUpdate(id,data)
    return Todo
  } catch (error) {
    throw error
  }
}

exports.GetTodosCount=async(query)=>{
  try {
    let TodoCount = await Todos.find(query).lean().count()
    return TodoCount
  } catch (error) {
    throw error
  }
}

exports.GetTodoById=async(id)=>{
  try {
    let Todo = await Todos.findById(id).lean()
    return Todo
  } catch (error) {
    throw error
  }
}
exports.GetTodoByQuery=async(query)=>{
  try {
    let Todo = await Todos.findById(query).lean()
    return Todo
  } catch (error) {
    throw error
  }
}

exports.GetAllTodos=async(query)=>{
  try {
    let todos = await Todos.find(query).lean()
    return todos
  } catch (error) {
    throw error
  }
}

exports.GetAllTodosPaginated=async(query,page,itemPerPage)=>{
  try {
    let todos = await Todos.find(query).lean().sort({ _id: -1 }).skip(page * itemPerPage).limit(itemPerPage)
    return todos
  } catch (error) {
    throw error
  }
}

exports.DeleteTodo=async(id)=>{
  try {
    let deleteTodo = await Todos.findByIdAndDelete(id)
    return deleteTodo
  } catch (error) {
    throw error
  }
}