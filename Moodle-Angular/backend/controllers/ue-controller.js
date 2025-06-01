import UE from "../models/Ue.js";

export const getUeById = async (req, res, next) => {
  try {
    const ue = await UE.findOne({ _id: req.params.id });
    if (!ue) {
      return next({ statusCode: 404, message: "UE not found" });
    }

    next({ statusCode: 200, data: ue });
  } catch (error) {
    next({ statusCode: 500, message: "Error fetching UE", data: error });
  }
};
