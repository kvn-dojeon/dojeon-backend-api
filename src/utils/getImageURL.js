export const getImageURL = (filename) => {
  return `${process.env.BASE_URL}/api/uploads/${filename}`;
};

export const defaultImagePlaceholder = `${process.env.BASE_URL}/api/uploads/logo.png`;
