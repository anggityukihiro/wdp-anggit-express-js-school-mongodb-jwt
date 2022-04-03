import mongoose from "mongoose";

const { Schema, model } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nama WAJIB di isi !"],
    unique: true,
    validate: {
        validator: (param) => {
            return (param == "") ? false : true;
        }
    }
  },
  npsn: {
    type: Number,
    required: [true, "NPSN WAJIB di isi !"],
  },
  kelas: {
    type: Number,
    required: [true, "Kelas WAJIB di isi !"],
    max: [12, "Maksimal kelas adalah 12"],
    min: [1, "Minimal kelas adalah 1"]
  },
});

const Student = model("Student", studentSchema);

export default Student;
