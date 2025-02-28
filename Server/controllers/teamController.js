const Team = require('../models/teamModel');
const express = require('express'); 
const bcrypt = require('bcrypt');   
const jwt = require('jsonwebtoken');    

const createTeamMember = async (req, res) => {
    try {
        const { teamUserName, teamMail, password, mobileNumber, address, pincode } = req.body;
        if (!teamUserName || !teamMail || !password || !mobileNumber || !address || !pincode) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }
        const existingUser = await Team.findOne({ teamMail });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newTeamMember = new Team({
            teamUserName,
            teamMail,
            password: hashedPassword,
            mobileNumber,
            address,
            pincode
        });    
        const response = await newTeamMember.save();
        res.status(201).json({
            message: "Registration successful",
            data: {
                id: response._id,
                teamUserName: response.teamUserName,
                teamMail: response.teamMail,
                mobileNumber: response.mobileNumber,
                address: response.address,
                pincode: response.pincode,
                }
    })
}catch (error) {
    res.status(500).json({ error: error.message });
}
}
const signInTeamMember = async (req, res) => {
    try {
        const { teamMail, password } = req.body;
        if (!teamMail || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }
        const teamMember = await Team.findOne({ teamMail });
        if (!teamMember) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, teamMember.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ teamMail: teamMember.teamMail },process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token,data:teamMember });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const editTeamMember = async (req, res) => {
    try {
        const { teamUserName,mobileNumber, address, pincode } = req.body;
        const teamMember = await Team.findById(req.params.id);
        if (!teamMember) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedData={
            teamUserName: teamUserName || teamMember.teamUserName,
            mobileNumber: mobileNumber || teamMember.mobileNumber,
            address: address || teamMember.address,
            pincode: pincode || teamMember.pincode,
        }
        const updatedTeamMember = await Team.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );
        res.status(200).json({ message: 'User updated successfully', data:{
            teamUserName:updatedTeamMember.teamUserName,
            teamMail:updatedTeamMember.teamMail,
            mobileNumber:updatedTeamMember.mobileNumber,
            address:updatedTeamMember.address,
            pincode:updatedTeamMember.pincode,
        } });
    }catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

module.exports = {
    createTeamMember,
    signInTeamMember,
    editTeamMember
}