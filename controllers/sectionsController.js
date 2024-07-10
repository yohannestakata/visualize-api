import catchAsync from "../utils/catchAsync";

export const createSections = catchAsync(async (req, res) => {
  console.log(req.body, "iuoinoinonoinoi");
});

export const updateSection = catchAsync(async (req, res) => {
  console.log(req.body, req.params.id);
});
