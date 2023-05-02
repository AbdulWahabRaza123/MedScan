const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const multer = require("multer");
const fs = require("fs");
app.use(cookieParser());
const router = express.Router();
const { json } = express();
const Admin = require("../models/admin");
const Patient = require("../models/patient");
const Radiologist = require("../models/radiologist");
const Report=require("../models/report");
const authAdmin = require("../middleware/authAdmin");
const authUser = require("../middleware/authUser");
const authRadiologist = require("../middleware/authRadiologist");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "temp.jpg");
  },
});
let upload = multer({ storage: storage });
router.get("/hello", (req, res) => {
  res.send("Hello Server");
});
router.get("/authAdmin", authAdmin, (req, res) => {
  res.status(200).json({ message: "done",mode:"admin" });
});
router.get("/authUser", authUser, (req, res) => {
  res.status(200).json({ message: "done",mode:"user" });
});
router.get("/authRadiologist", authRadiologist, (req, res) => {
  res.status(200).json({ message: "done",mode:"radiologist" });
});
// Register Admin 
router.post("/registerAdmin", async (req, res) => {
  try {
    const { name, email, phone, password, cPassword, pin } = req.body;
    if (!name || !email || !phone || !password || !cPassword || !pin) {
      res.json({ message: "error", type: "uncompleted details" });
    }
    const confirm = await Admin.findOne({ email });
    if (confirm) {
      res.json({ message: "error", type: "data already exist",mode:"admin" });
    } else {
      if (password === cPassword) {
        const admin = await new Admin({
          name,
          email,
          phone,
          password,
          cPassword,
          pin,
        });
        if (admin) {
          const data = await admin.save();
          res
            .status(200)
            .json({ message: "done", type: "successfully registration",mode:"admin" });
        } else {
          res
            .status(401)
            .json({ message: "error", type: "error in storing data",mode:"admin" });
        }
      } else {
        res.json({ message: "error", type: "password not matching",mode:"admin" });
      }
    }
  } catch (e) {
    res.json({ message: "error", type: "unknown error",mode:"admin" });
  }
});
// Register Patient
router.post("/registerPatient", async (req, res) => {
  try {
    const { name, email, password, cPassword } = req.body;
    if (!name || !email || !password || !cPassword) {
      res.json({ message: "error", type: "uncompleted details",mode:"patient" });
    }
    const admin = await Admin.findOne({ email });
    if (admin) {
      res.json({ message: "error", type: "data already exist",mode:"patient" });
    }
    const confirm = await Patient.findOne({ email });
    if (confirm) {
      res.json({ message: "error", type: "data already exist",mode:"patient" });
    } else {
      if (password === cPassword) {
        const patient = await new Patient({
          name,
          email,
          password,
          cPassword,
        });

        if (patient) {
          console.log("This is data ");
          const data = await patient.save();

          res
            .status(200)
            .json({ message: "done", type: "successfully registration",mode:"patient" });
        } else {
          res
            .status(401)
            .json({ message: "error", type: "error in storing data",mode:"patient" });
        }
      } else {
        res.json({ message: "error", type: "password not matching",mode:"patient" });
      }
    }
  } catch (e) {
    res.json({ message: "error", type: "unknown error",mode:"patient" });
  }
});
// Register Radiologist
router.post("/registerRadiologist", async (req, res) => {
  try {
    const { name, email,specialization, password, cPassword } = req.body;
    if (!name || !email ||!specialization|| !password || !cPassword) {
      res.json({ message: "error", type: "uncompleted details",mode:"radiologist" });
    }
    const admin = await Admin.findOne({ email });
    if (admin) {
      res.json({ message: "error", type: "data already exist",mode:"radiologist" });
    }
    else{
    const patient = await Patient.findOne({ email });
    if (patient) {
      res.json({ message: "error", type: "data already exist",mode:"radiologist" });
    }
    else{
      
    const confirm = await Radiologist.findOne({ email });
    if (confirm) {
      res.json({ message: "error", type: "data already exist",mode:"radiologist" });
    } else {
      if (password === cPassword) {
        const radiologist = await new Radiologist({
          name,
          email,
          specialization,
          password,
          cPassword,
        });

        if (radiologist) {
        //  console.log("This is radiologist ",radiologist);
          const data = await radiologist.save();
          

          res
            .status(200)
            .json({ message: "done", type: "successfully registration",mode:"radiologist" });
        } else {
          res
            .status(401)
            .json({ message: "error", type: "error in storing data",mode:"radiologist" });
        }
      } else {
        res.json({ message: "error", type: "password not matching",mode:"radiologist" });
      }
    }
    }
  }
  } catch (e) {
    res.json({ message: "error", type: "unknown error",mode:"radiologist" });
  }
});
// Login Post Request 
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "error" });
    }
    const patient = await Patient.findOne({ email });
    if (patient) {
      const matchPassword = await bcrypt.compare(password, patient.password);
      const token = await patient.generateAuthToken();

      if (matchPassword) {
        res
          .cookie("jwToken", token, {
            key: "user",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          })
          .status(200)
          .json({ message: "done", token: token, mode: "user",data:patient });
      } else {
        return res.status(400).json({ message: "error" });
      }
    }
    else{
      const radiologist = await Radiologist.findOne({ email });
      if (radiologist) {
        const matchPassword = await bcrypt.compare(password, radiologist.password);
        const token = await radiologist.generateAuthToken();
  
        if (matchPassword) {
          res
            .cookie("jwToken", token, {
              key: "radiologist",
              httpOnly: true,
              sameSite: "strict",
              secure: true,
            })
            .status(200)
            .json({ message: "done", token: token, mode: "radiologist",data:radiologist });
        } else {
          return res.status(400).json({ message: "error" });
        }
      }
      else if(!radiologist&&!patient){
        const admin = await Admin.findOne({ email });

        if (admin) {
          const matchPassword = await bcrypt.compare(password, admin.password);
          const token = await admin.generateAuthToken();
  
          if (matchPassword) {
            res
              .cookie("jwToken", token, {
                key: "admin",
                httpOnly: true,
                sameSite: "strict",
                secure: true,
              })
              .status(200)
              .json({ message: "done", token: token, mode: "admin",data:admin });
          } else {
            return res.status(400).json({ message: "error" });
          }
        } else {
          return res
            .status(401)
            .json({ message: "error", type: "data not found" });
        }
      }
    }
    
  } catch (e) {
    return res.json({ message: "error", type: "unknown error" });
  }
});
router.post("/GenerateReport",upload.single("file"),async(req,res)=>{
  try {
    const {patientEmail,radiologistEmail,generatedReport}=req.body;
    const patientData = await Patient.findOne({ email:patientEmail });
    const radiologistData=await Radiologist.findOne({email:radiologistEmail});
    const patientReport = await Report.findOne({ radiologistEmail,'reports.patientEmail':patientEmail });
    console.log("This is patient report ",patientReport);
    const radiologistExist = await Report.findOne({ radiologistEmail });
    if(patientData && radiologistEmail &&!radiologistExist ){
      console.log("I am here ");
      const data = await new Report({
        radiologistEmail:radiologistData.email,
        radiologistName:radiologistData.name,
        specialization:radiologistData.specialization,
        reports:[
          {
        patientEmail:patientData.email,
        patientName:patientData.name,
        
        filedata: {
          data: fs.readFileSync("uploads/temp.jpg"),
          contentType: "image/jpeg",
        },
        report:generatedReport
      }
      ]
      });
      if(data){
        await data.save();
        res.status(200).json({ message: "done", report: generatedReport });
      }else{
        res.json({ message: "error",type:"Error in database"});
      }
    
    }else if(radiologistEmail&&radiologistExist&&!patientReport){
      Report.updateOne({
        radiologistEmail: radiologistData.email,
      }, {
        $push: {
          reports: {
            patientEmail: patientData.email,
            patientName: patientData.name,
            filedata: {
              data: fs.readFileSync("uploads/temp.jpg"),
              contentType: 'image/jpeg',
            },
            report: generatedReport
          }
        }

      }, (err, result) => {
        if (err) {
          console.error(err);
          res.json({ message: "error",type:"Error in database"});
        } else {
          console.log('Report added successfully');
          res.status(200).json({ message: "done", report:generatedReport });
        }
      });
    }
    else if(radiologistEmail&&patientReport&&radiologistExist){
      Report.findOneAndUpdate(
        {
          radiologistEmail:  radiologistData.email,
          'reports.patientEmail': patientData.email,
        },
        {
          $set: {
            'reports.$.report': generatedReport,
            'reports.$.filedata': {
              data: fs.readFileSync("uploads/temp.jpg"), // actual buffer data
              contentType: 'image/jpeg', // file type
            }
          }
        },
        {
          new: true,
          useFindAndModify: false
        },
        (err, updatedReport) => {
          if (err) {
            console.error(err);
          } else if (!updatedReport) {
            console.log('No matching report found');
            res.json({ message: "error",type:"No Matching found"});
          } else {
            console.log('Report updated successfully');
            res.status(200).json({ message: "done", report: "Patient has a broken arm" });
          }
        }
      );

    }
    else{
      res.status(404).json({ message: "error",type:"Data not found"});
    }
  }catch(e){
    return res.status(401).json({ message: "error", type: "unknown error" });
  }

})
router.post("/getPatientReport",authUser,async(req,res)=>{
  
 try{
  
  const {email}=req.body;
  if(email){
    const patientReport = await Report.find({ 'reports.patientEmail':email });
    if(patientReport){
      const radiologistData=await Radiologist.findOne({email:patientReport.radiologistEmail});
      const patientData=await Report.aggregate([
        { $match: { "reports.patientEmail": email } },
        // Then, use the $unwind operator to create a separate document for each report of each matching document
        { $unwind: "$reports" },
        // Next, match only the reports that have the patient email you want to search for
        { $match: { "reports.patientEmail": email } },
        // Finally, project only the fields you need (in this case, the radiologist email and name, and the patient name and report)
        // { $project: { _id: 0, radiologistEmail: 1, radiologistName: 1, "reports.patientName": 1,"reports.patientEmail": 1, "reports.fileData": 1,"reports.report": 1 } }
      ], function(err, result) {
        if (err) {
          res.status(404).json({ message: "error",type:"Data not found"});
        } else {
          res.status(200).json({ message: "done",data:result });
          
        }
      });
    }else{
      res.status(404).json({ message: "error",type:"Data not found"});
    }
  }
  else{
    res.status(404).json({ message: "error",type:"Patient not found"});
  }
  
 }
 catch(e){
  return res.status(401).json({ message: "error", type: "unknown error" });
 }
})
router.get("/getReports",authAdmin,async(req,res)=>{
  
  try{
     const patientReport = await Report.find({});
     if(patientReport){    
     res.status(200).json({ message: "done",data:patientReport }); 
     }else{
       res.status(404).json({ message: "error",type:"Data not found"});
     }
   }
  catch(e){
   return res.status(401).json({ message: "error", type: "unknown error" });
  }
 })
router.get("/getRadiologists",authAdmin,async(req,res)=>{
  try{
const radiologists=await Radiologist.find();
if(radiologists){
let customRadio=[];
for(let i=0;i<radiologists.length;i++){
  customRadio.push({name:radiologists[i].name,email:radiologists[i].email,specialization:radiologists[i].specialization})
}
res.status(200).json({message:"done",data:customRadio});
}else{
  res.status(404).json({ message: "error",type:"Data not found"});
}
  }catch(e){
    res.status(404).json({ message: "error",type:"Data not found"});
  }
})
router.get("/AdminLogout", authAdmin, (req, res) => {
  if (req.cookies.jwToken) {
    res.clearCookie("jwToken", { path: "/" }).json({ message: "done" });
  } else {
    res.json({ message: "done" });
  }
});
router.get("/UserLogout", authUser, (req, res) => {
  if (req.cookies.jwToken) {
    res.clearCookie("jwToken", { path: "/" }).json({ message: "done" });
  } else {
    res.json({ message: "done" });
  }
});
router.get("/RadiologistLogout", authRadiologist, (req, res) => {
  if (req.cookies.jwToken) {
    res.clearCookie("jwToken", { path: "/" }).json({ message: "done" });
  } else {
    res.json({ message: "done" });
  }
});
module.exports = router;
