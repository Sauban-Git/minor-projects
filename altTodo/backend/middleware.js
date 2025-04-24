const { updateTodo, createTodo } = require("./types");

function createMiddleWare(req, res, next) {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);
  if (!parsePayload.success) {
    return res.status(403).json({
      msg: "You sent wrong inputs",
    });
  } else {
    next();
  }
}
function updateMiddleWare(req, res, next) {
  const updatePayload = req.body;
  const parsePayload = updateTodo.safeParse(updatePayload);
  if (!parsePayload.success) {
    return res.status(403).json({
      msg: "You sent wrong inputs",
    });
  } else {
    next();
  }
}

module.exports = {
  createMiddleWare,
  updateMiddleWare,
};
