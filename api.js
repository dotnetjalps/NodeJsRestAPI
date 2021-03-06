var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.port || 3000;
var router = express.Router();

app.use('/api/employee', router);
app.listen(port);

var employees= [
    {
        Id: 1,
        FirstName: "Jalpesh",
        LastName: "Vadgama",
        Designation: "Technical Architect"
    }
];

// Get all employees
router.get("/",function (req,res){
    res.json(employees);
});

//get specific employee based on Id
router.get("/:Id",function(req,res){
    var employeeId = parseInt(req.params.Id);
    var currentEmployee = employees.filter(e=>e.Id==employeeId)[0];

    if(currentEmployee){
        res.json(currentEmployee);
    }else{
        res.sendStatus(404);
    }
});

/// Add employee
router.post("/", function (req,res) {
    var employee = req.body;
    var isValid =isValidEmployee(employee);
    if(isValid){
        employees.push(employee);
        res.send(employee);
    } else{
        res.sendStatus(500);
    }
});

//Update employee
router.put("/:Id",function (req,res) {  
    var employeeId = parseInt(req.params.Id);
    var currentEmployee = employees.filter(e=>e.Id==employeeId)[0];
    if(currentEmployee){
        let employee = req.body;
        var isValid = isValidEmployee(employee);
        if(isValid){
            currentEmployee.FirstName = employee.FirstName;
            currentEmployee.LastName = employee.FirstName;
            currentEmployee.Designation = employee.Designation;
            res.sendStatus(204);
        }else{
            res.sendStatus(500);
        }
    }else{
        res.sendStatus(404);
    }
});

//delete employee
router.delete("/:Id", function(req,res){
    var employeeId = parseInt(req.params.Id);
    var currentEmployee = employees.filter(e=>e.Id==employeeId)[0];
    if(currentEmployee){
        employees = employees.filter(e=>e.Id!=employeeId);
        res.sendStatus(204);
    }else{
        res.sendStatus(404);
    }
});

//validation for employee
function isValidEmployee(employee){
    if(!employee.Id){
        return false;
    }
    if(!employee.FirstName){
        return false;
    }
    if(!employee.LastName){
        return false;
    }
    if(!employee.Designation){
        return false;
    }
    return true;
}
