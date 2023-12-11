const {
  ResponseSchema, PaginateSchema
} = require('../../helper/HelperFunctions');
const { ErrorHandler, CheckValidIdObject } = require('../../helper/ErrorHandler');
const { AddTodo, UpdateTodo, GetAllTodos, GetTodosCount, GetAllTodosPaginated, DeleteTodo, GetTodoById, GetTodoByQuery } = require('./TodosService');
const jwt = require('jsonwebtoken');
// const { GetUserById } = require('../Users/UsersService');

exports.createTodo = async(req, res) => {
  try {
    const { title ,priority,user_id } = req.body;
    // const token = req.headers.authorization.split(' ')[1];
    // const authedUser = jwt.decode(token);

    // if (!CheckValidIdObject(req, res, authedUser?.user_id, 'User Id is Invalid')) return;
    // const user = await GetUserById(authedUser?.user_id)
    // if (!user) {
    //   return res.status(404).json(ResponseSchema('User doesn\'t exist', false));
    // }

    let addedData={
      title,
      priority,
      // user_id:user?.id
      user_id:user_id
    }
    await AddTodo(addedData)
    return res.status(201).json(ResponseSchema('Todo Added Successfully', true))
  } catch (error) {
    return res.status(400).json(ResponseSchema('Somethings Went wrong', true, ErrorHandler(error)))
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { title ,priority } = req.body;
    const {id} = req.params
    // const token = req.headers.authorization.split(' ')[1];
    // const authedUser = jwt.decode(token);
    if (!CheckValidIdObject(req, res, id, 'Todo Id is Invalid')) return;
    const todo = await GetTodoById(id);
    if (!todo) {
      return res.status(404).json(ResponseSchema('Todo doesn\'t exist', false));
    }

    // if (!CheckValidIdObject(req, res, authedUser?.user_id, 'User Id is Invalid')) return;
    // const user = await GetUserById(authedUser?.user_id)
    // if (!user) {
    //   return res.status(404).json(ResponseSchema('User doesn\'t exist', false));
    // }
    // if(user?._id.equals(todo?.user_id)){
    //   return res.status(404).json(ResponseSchema("Sorry can't update. You aren't the owner of the todo", false));
    // }

    let updatedData = {
      title,
      priority,
    }
    await UpdateTodo(id,updatedData)
    
    return res.status(201).json(ResponseSchema('Todo Updated Successfully', true))
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema('Somethings Went wrong', true, ErrorHandler(error)))
  }
};

exports.getSingleTodo = async(req, res) => {
  const {user_id} =req.query
  const {id} = req.params
  try {
    if (!CheckValidIdObject(req, res, id, 'Todo Id is Invalid')) return;
    
    // const token = req?.headers?.authorization?.split(' ')?.[1];
    // const authedUser = jwt.decode(token);
    // if (!CheckValidIdObject(req, res, authedUser?.user_id, 'User Id is Invalid')) return;
    // const user = await GetUserById(authedUser?.user_id)
    // if (!user) {
    //   return res.status(404).json(ResponseSchema('User doesn\'t exist', false));
    // }
    // let queryParams={user_id:authedUser?.user_id}
    if (!user_id) {
      return res.status(404).json(ResponseSchema('User Id is Required', false));
    }
    let queryParams={user_id:user_id,_id:id}
    const todo = await GetTodoByQuery(queryParams);
    if (!todo) {
      return res.status(404).json(ResponseSchema('Todo doesn\'t exist', false));
    }
    const sendedObject = {
      id: todo?._id,
      title: todo?.title,
      priority: todo?.priority,
    }
    return res.status(200).json(ResponseSchema('Todo', true, sendedObject));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema('Somethings Went wrong', false, ErrorHandler(error)))
  }
};

exports.getAllTodos = async(req, res) => {
  const {user_id} =req.query
  try {
    // const token = req?.headers?.authorization?.split(' ')?.[1];
    // const authedUser = jwt.decode(token);
    // if (!CheckValidIdObject(req, res, authedUser?.user_id, 'User Id is Invalid')) return;
    // const user = await GetUserById(authedUser?.user_id)
    // if (!user) {
    //   return res.status(404).json(ResponseSchema('User doesn\'t exist', false));
    // }
    // let queryParams={user_id:authedUser?.user_id}
    if (!user_id) {
      return res.status(404).json(ResponseSchema('User Id is Required', false));
    }
    let queryParams={user_id:user_id}

    let todos = await GetAllTodos(queryParams)
    const sendedObject = todos.map((todo) => ({
      id: todo?._id,
      title: todo?.title,
      priority: todo?.priority,
    }));
    return res.status(200).json(ResponseSchema('Todos', true, sendedObject));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema('Somethings Went wrong', false, ErrorHandler(error)))
  }
};

exports.getAllTodosWithPagination = async (req, res) => {
  const {user_id} =req.query
  try {
    // const token = req?.headers?.authorization?.split(' ')?.[1];
    // const authedUser = jwt.decode(token);
    if (!user_id) {
      return res.status(404).json(ResponseSchema('User Id is Required', false));
    }
    let queryParams={user_id:user_id}

    const page = req.query.page - 1 || 0;
    const itemPerPage = req.query.limit || 10;
    const count = await GetTodosCount(queryParams);
    const pages = Math.ceil(count / itemPerPage);
    // if (!CheckValidIdObject(req, res, authedUser?.user_id, 'User Id is Invalid')) return;
    // const user = await GetUserById(authedUser?.user_id)
    // if (!user) {
    //   return res.status(404).json(ResponseSchema('User doesn\'t exist', false));
    // }
    let todos = await GetAllTodosPaginated(queryParams,page,itemPerPage)
    const sendedObject = todos.map((todo) => ({
      id: todo?._id,
      title: todo?.title,
      priority: todo?.priority,
    }));
    return res.status(200).json(ResponseSchema('Todos', true, PaginateSchema(page + 1, pages, count, sendedObject)));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema('Somethings Went wrong', false, ErrorHandler(error)))
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } =req.params
  try {
    if (!CheckValidIdObject(req, res, id, 'Todo Id is Invalid')) return;
    const todo = await GetTodoById(id);
    if (!todo) {
      return res.status(400).json(ResponseSchema('Todo Id is wrong', false));
    }
    await DeleteTodo(id)
    return res.status(201).json(ResponseSchema('Todo Deleted Successfully', true))
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema('Somethings Went wrong', false, ErrorHandler(error)))
  }
};