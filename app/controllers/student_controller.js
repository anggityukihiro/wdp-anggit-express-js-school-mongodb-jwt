import Student from "../models/Student.js";
import School from "../models/School.js";

export const get_student = async (req, res, next) => {
  try {
    const { student_id } = req.params;
    let student = await Student.findOne({ _id: student_id });
    let school = await School.findOne({ npsn: student.npsn });
    let detai_student = Object.assign(student._doc,{school:school});
    
    return res.status(200).json(detai_student);
  } catch (err) {
    return next(err);
  }
};

export const get_students = async (req, res, next) => {
  try {
    let students = await Student.find({});
    return res.status(200).json(students);
  } catch (err) {
    return next(err);
  }
};


export const add_student = async (req, res, next) => {
  try {
    const { name, npsn, kelas} = req.body;

    let get_student = await Student.findOne({ name: name });
    let get_school = await School.findOne({ npsn: npsn });

    if (get_student != null) {
      return res.status(404).json({ message: "Nama Siswa duplikat !" });
    } 
  
    else if (get_school == null) {
      return res.status(404).json({ message: "NPSN tidak valid !" });
    }  
  
    else {
  
      let student = await Student.create({
        name: name,
        npsn: npsn,
        kelas: kelas,
      });

      return res.status(201).json(student);

    }

  } catch (err) {
    return next(err);
  }
};


export const update_student = async (req, res, next) => {
  try {
    const { name, npsn, kelas} = req.body;
    const { student_id } = req.params;

    let student = await Student.findOne({ _id: student_id });
    let get_student = await Student.findOne({ name: name });
    let get_school = await School.findOne({ npsn: npsn });

    if (student == null) {
      return res.status(404).json({ message: "Siswa tidak ditemukan !" });
    }
  
    else if (get_student != null) {
      return res.status(404).json({ message: "Nama Siswa duplikat !" });
    } 
  
    else if (get_school == null) {
      return res.status(404).json({ message: "NPSN tidak valid !" });
    }  
  
    else {
      let student = await Student.replaceOne(
        { _id: student_id },      
        {
          name: name,
          npsn: npsn,
          kelas: kelas,
        }
      );

      return res.status(200).json(student);
    }
  } catch (err) {
    return next(err);
  }
};

export const delete_student = async (req, res, next) => {
  try {  
    const { student_id } = req.params;
    let student = await Student.findOne({ _id: student_id });

    if (student == null) {
      return res.status(404).json({ message: "Siswa tidak ditemukan !" });
    }

    await Student.deleteOne({ _id: student_id });

    return res.status(200).json({message: "Siswa berhasil di hapus"});
  }
  catch (err) {
    return next(err);
  }
};