import BusinessInfo from "../models/BusinessInfo.js";

// @desc    Get business information
// @route   GET /api/business
// @access  Public
export const getBusinessInfo = async (req, res, next) => {
  try {
    let info = await BusinessInfo.findOne();

    // If no record exists, create one with default settings
    if (!info) {
      info = await BusinessInfo.create({});
    }

    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};

// @desc    Update business information
// @route   PUT /api/business
// @access  Private/Admin
export const updateBusinessInfo = async (req, res, next) => {
  try {
    let info = await BusinessInfo.findOne();

    if (!info) {
      info = await BusinessInfo.create(req.body);
    } else {
      info = await BusinessInfo.findByIdAndUpdate(
        info._id,
        req.body,
        { new: true, runValidators: true }
      );
    }

    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};
