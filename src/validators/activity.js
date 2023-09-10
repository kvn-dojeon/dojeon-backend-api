import * as yup from "yup";

export const activitySchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  estimatedTimeNeededPerSession: yup.number().required(),
  levelId: yup.number().required(),
  xpReward: yup.number().required(),
  isPublic: yup.boolean().required(),
  // movementDurations: yup
  //   .array()
  //   .of(
  //     yup.object({
  //       id: yup.number().required(),
  //       duration: yup.number().min(5).required(),
  //     })
  //   )
  //   .required(),
});
