
const e = require("express");
const Company = require("../models/companyModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

 const createCompany = async (req,res)=>{
    try{
        const {companyName,companyMail,password,mobileNumber,address,industryDepartment,workExperience,foundedDate,pincode,category,requirement} = req.body;
        if(!companyName ||
          !companyMail ||
          ! password ||
          !workExperience ||
          !industryDepartment ||
          !foundedDate ||
          !category ||
          !address ||
          !pincode ||
          !mobileNumber ||
          !requirement){
           return res.status(400).json({message:"Please fill all the fields"});
       }
        const existingCompany =await Company.findOne({ companyMail });
        console.log(existingCompany);
        if (existingCompany ) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
     
        const newCompany = new Company({
          companyName,
          companyMail,
          password:hashedPassword,
          industryDepartment,
          workExperience,
          foundedDate,
          category,
          address,
          pincode,
          mobileNumber,
          requirement,
        });
       const response =  await newCompany.save();
        res.status(201).json({
            message: "Registration successful",
            data: {
              companyName:response.companyName,
              companyMail:response.companyMail,
              industryDepartment:response.industryDepartment,
              workExperience:response.workExperience,
              foundedDate:response.foundedDate,
              category:response.category,
              address:response.address,
              pincode:response.pincode, 
              mobileNumber:response.mobileNumber,
              requirement:response.requirement,
            } 
        });
        
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

const  signInCompany = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }
    
        const company = await Company.findOne({ companyMail: email });
        if (!company) {
            return res.status(404).json({ message: "User With Email Not Exists" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, company.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        data={
          companyName:company.companyName,
          companyMail:company.companyMail,
          industryDepartment:company.industryDepartment,
          workExperience:company.workExperience,
          foundedDate:company.foundedDate,
          category:company.category,
          address:company.address,
          pincode:company.pincode, 
          mobileNumber:company.mobileNumber,
          requirement:company.requirement,
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

const editCompany = async (req, res) => {
    try {
        const { companyName, mobileNumber, address, pincode, industryDepartment, requirement, category } = req.body;
        const company = await Company.findById(req.params.id);
        
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const updatedData = {
            companyName: companyName || company.companyName,
            mobileNumber: mobileNumber || company.mobileNumber,
            address: address || company.address,
            pincode: pincode || company.pincode,
            industryDepartment: industryDepartment || company.industryDepartment,
            requirement: requirement || company.requirement,
            category: category || company.category
        };

        const updatedCompany = await Company.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.status(200).json({ 
            message: 'Company updated successfully', 
            data: {
                companyName: updatedCompany.companyName,
                companyMail: updatedCompany.companyMail,
                industryDepartment: updatedCompany.industryDepartment,
                foundedDate: updatedCompany.foundedDate,
                category: updatedCompany.category,
                address: updatedCompany.address,
                pincode: updatedCompany.pincode,
                mobileNumber: updatedCompany.mobileNumber,
                requirement: updatedCompany.requirement
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {createCompany,signInCompany,editCompany};