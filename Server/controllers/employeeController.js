
const express= require("express");
const Employee = require("../models/employeeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

 const createEmployee = async (req,res)=>{
    try{
        const {name,email,password,mobile,address,workExperience,expectedSalary,jobRole,pincode,dob} = req.body;
        if(!name || !email || !password || !mobile || !address || !workExperience || !expectedSalary || !jobRole || !pincode || !dob){
           return res.status(400).json({message:"Please fill all the fields"});
       }
        const existingUser  =await Employee.findOne({ email });
        console.log(existingUser);
        if (existingUser ) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
     
        const newEmployee = new Employee({
            name,
            email,
            password: hashedPassword,
            mobile,
            address,
            workExperience,
            expectedSalary,
            jobRole,
            pincode,
            dob
        });
       const response =  await newEmployee.save();
        res.status(201).json({
            message: "Registration successful",
            data: {
                id: response._id,
                name: response.name,
                email: response.email,
                jobRole: response.jobRole
            }
        });
        
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

const  signInEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }
        // Find employee by email
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(404).json({ message: "User With Email Not Exists" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        data= {
            id: employee._id,
            name: employee.name,
            email: employee.email,
            jobRole: employee.jobRole,
            mobile:employee.mobile,
            address:employee.address,
            workExperience:employee.workExperience,
            expectedSalary: employee.expectedSalary,
            pincode:employee.pincode,
            dob:employee.dob
        }
        const token = jwt.sign(
           data,
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Logged in successful",
            token,
            data
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editEmployee = async (req, res) => {
    try {
        const { name, email, mobile, address, workExperience, expectedSalary, jobRole, pincode, dob } = req.body;
        const employeeId = req.params.id;

        // Find employee by ID
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Update fields if provided
        const updatedEmployee = {
            name: name || employee.name,
            email: email || employee.email,
            mobile: mobile || employee.mobile,
            address: address || employee.address,
            workExperience: workExperience || employee.workExperience,
            expectedSalary: expectedSalary || employee.expectedSalary,
            jobRole: jobRole || employee.jobRole,
            pincode: pincode || employee.pincode,
            dob: dob || employee.dob
        };

        // Update employee in database
        const response = await Employee.findByIdAndUpdate(
            employeeId,
            updatedEmployee,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Employee updated successfully",
            data: {
                id: response._id,
                name: response.name,
                email: response.email,
                jobRole: response.jobRole,
                mobile: response.mobile,
                address: response.address,
                workExperience: response.workExperience,
                expectedSalary: response.expectedSalary,
                pincode: response.pincode,
                dob: response.dob
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {createEmployee,signInEmployee,editEmployee};