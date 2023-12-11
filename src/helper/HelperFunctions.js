
function PaginateSchema(currentPage, pages, count, data) {
  return {
    currentPage,
    pages,
    count,
    data,
  };
}
function ResponseSchema(message, status, data) {
  return {
    message,
    status,
    data,
  };
}
module.exports = {
  ResponseSchema, PaginateSchema,
};
