export const formatPhoneNumber = (phoneNumber) => {
  const regex = /^08/;

  if (regex.test(phoneNumber)) {
    return phoneNumber.replace(regex, "628");
  }

  return phoneNumber;
};
