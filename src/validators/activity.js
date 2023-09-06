import * as yup from "yup";

export const activitySchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  estimatedTimeNeededPerSession: yup.number().required(),
  isPublic: yup.boolean().required(),
  //   movementIds: yup.array().of(yup.number().required()).required(),
});
