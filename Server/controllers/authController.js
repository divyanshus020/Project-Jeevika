const Employee = require('../models/employeeModel');
const Team = require('../models/teamModel');
const Company = require('../models/companyModel');
const sendEmail= require("../utils/emailHandler");
const crypto = require('crypto');
const bcrypt = require('bcrypt');



const forgetPassword = async (req, res) => {
  try {
    const { email, userType } = req.body;
    let Model;
    
    if(!email || !userType){
        return res.status(400).json({ message: "All fields are required" });
    }
      // Single switch statement for model selection
      switch (userType) {
          case 'employee':
              Model = Employee;
              break;
          case 'team':
              Model = Team;
              break;
          case 'company':
              Model = Company;
              break;
          default:
              return res.status(400).json({ message: "Invalid user type" });
      }

      const user = await Model.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: `${userType} not found` });
      }

      const resetToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000;
      await user.save();

      const resetUrl = `${process.env.CLIENT_URL}/${userType}/reset-password/?token=${resetToken}`;

      const emailContent = {
          email: user.email,
          subject: 'Password Reset Request',
          html: `
              <h1>Password Reset Request</h1>
              <p>Click the link below to reset your password:</p>
              <a href="${resetUrl}">Reset Password</a>
              <p>This link will expire in 1 hour.</p>
          `
      };

      await sendEmail(emailContent);
      
      // Single response at the end
      return res.status(200).json({
          success: true,
          message: "Password reset link sent to email"
      });

  } catch (error) {
      // Error response
      return res.status(500).json({
          success: false,
          message: "Error in forget password process",
          error: error.message
      });
  }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, userType } = req.body;
        if (!password || !userType) {
            return res.status(400).json({ message: "All fields are required" });
        }
        let Model;
        switch (userType) {
            case 'employee':
                Model = Employee;
                break;
            case 'team':
                Model = Team;
                break;
            case 'company':
                Model = Company;
                break;
            default:
                return res.status(400).json({ message: "Invalid user type" });
        }

        // Find user with valid token and not expired
        const user = await Model.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Password reset token is invalid or has expired"
            });
        }

        // Update password
        const getsalt = await bcrypt.genSalt(10);
        const hashPasword = await bcrypt.hash(password, getsalt);
        user.password = hashPasword;
        
        // Clear reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        // Send confirmation email
        const emailContent = {
            email: user.email,
            subject: 'Password Reset Successful',
            html: `
                <h1>Password Reset Successful</h1>
                <p>Your password has been successfully reset.</p>
                <p>If you did not perform this action, please contact support immediately.</p>
            `
        };

        await sendEmail(emailContent);

        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error resetting password",
            error: error.message
        });
    }
};


const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, userType,id } = req.body;
        const userId =id; // From verifyToken middleware
console.log(userId);
        if (!currentPassword || !newPassword || !userType || !id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let Model;
        switch (userType) {
            case 'employee':
                Model = Employee;
                break;
            case 'team':
                Model = Team;
                break;
            case 'company':
                Model = Company;
                break;
            default:
                return res.status(400).json({ message: "Invalid user type" });
        }

        const user = await Model.findById(userId);
        console.log(user);
        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        user.password = hashedPassword;
        await user.save();

        // Send confirmation email
        const emailContent = {
            email: user.email,
            subject: 'Password Changed Successfully',
            html: `
                <h1>Password Change Notification</h1>
                <p>Your password has been successfully changed.</p>
                <p>If you did not perform this action, please contact support immediately.</p>
            `
        };

        await sendEmail(emailContent);

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error changing password",
            error: error.message
        });
    }
};


module.exports = {
    forgetPassword,
    resetPassword,
    changePassword
};
