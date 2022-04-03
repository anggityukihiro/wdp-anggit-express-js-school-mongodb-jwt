import School from "../models/School.js";

export const get_school = async (req, res, next) => {
  try {
    const { school_id } = req.params;
    let school = await School.findOne({ _id: school_id });
    return res.status(200).json(school);
  } catch (err) {
    return next(err);
  }
};

export const get_schools = async (req, res, next) => {
  try {
    let schools = await School.find({});

    return res.status(200).json(schools);
  } catch (err) {
    return next(err);
  }
};
