import Category from "../models/Category.js";
import Counter from "../models/Counter.js";

// export const createCategory = async (
//   req,
//   res
// ) => {
//   try {
//     const category =
//       await Category.create(req.body);

//     res.status(201).json(category);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
export const createCategory = async (
  req,
  res
) => {
  try {
    const counter =
      await Counter.findOneAndUpdate(
        {
          name: "categoryId",
        },
        {
          $inc: {
            sequence: 1,
          },
        },
        {
          new: true,
          upsert: true,
        }
      );

    const category =
      await Category.create({
        categoryId:
          counter.sequence,
        name: req.body.name,
        description:
          req.body.description,
      });

    res.status(201).json(
      category
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

export const getCategories = async (
  req,
  res
) => {
  try {
    const categories =
      await Category.find().sort({
        createdAt: -1,
      });

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCategory = async (
  req,
  res
) => {
  try {
    const category =
      await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCategory = async (
  req,
  res
) => {
  try {
    await Category.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Category deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};