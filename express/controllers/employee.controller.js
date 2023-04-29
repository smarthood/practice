const Designation = require('../models').designation;
const Role = require('../models').role;
const Employee = require('../models').employee;
const user = require('../models').user
const getEmployees = async function (req, res) {
  let err;
  [err, response] = await to(Employee.findAll({
    include: [
      { model: Role },
      { model: Designation }
    ]
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { response });
}
module.exports.getEmployees = getEmployees;

const createEmployee = async function (req, res) {
  let err;
  let body = req.body;
  [err, employee] = await to(Employee.create(body));
  if (err) return ReE(res, err, 422);
  return ReS(res, { employee });
}
module.exports.createEmployee = createEmployee;


const getDesignation = async function (req, res) {
  let err;
  [err, designation] = await to(Designation.findAll());
  if (err) return ReE(res, err, 422);
  return ReS(res, { designation });
}
module.exports.getDesignation = getDesignation;

const getRole = async function (req, res) {
  let err;
  [err, role] = await to(Role.findAll());
  if (err) return ReE(res, err, 422);
  return ReS(res, { role });
}
module.exports.getRole = getRole;

const deleteEmployee = async function (req, res) {
  let err;
  let body = req.body;
  [err, deleteEmp] = await to(Employee.destroy({
    where: {
      id: body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { deleteEmp });
}
module.exports.deleteEmployee = deleteEmployee;

const getEmployee = async function (req, res) {
  let err;
  [err, employeeDetails] = await to(Employee.findOne({
    where: {
      id: req.body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { employeeDetails });
}
module.exports.getEmployee = getEmployee;

const updateEmployee = async function (req, res) {
  let err;
  let body = req.body;
  [err, employeeDetails] = await to(Employee.update(body, {
    where: {
      id: body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { employeeDetails });
}
module.exports.updateEmployee = updateEmployee;

const Login = async function (req, res) {
  let err;
  let body = req.body;
  [err, user_detail] = await to(user.create(body));
  if (err) return ReE(res, err, 422);
  return ReS(res, { user_detail });
}
module.exports.Login = Login;