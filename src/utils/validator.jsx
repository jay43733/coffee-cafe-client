import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().trim().email({ tlds: false }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid Email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

const registerSchema = Joi.object({
  firstName: Joi.string()
    .min(1)
    .max(50)
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.empty": "Firstname is required",
      "string.pattern.base": "Firstname must contain a-z, A-Z",
    }),
  lastName: Joi.string()
    .min(1)
    .max(50)
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.empty": "Lastname is required",
      "string.pattern.base": "Lastname must contain a-z, A-Z",
    }),
  email: Joi.string()
    .email({ tlds: false })
    .messages({
      "string.empty": "Email is required",
    })
    .required(),
  phoneNumber: Joi.string()
    .pattern(/^(08|09|06)[0-9]{7,9}$/)
    .messages({
      "string.pattern.base":
        "Please enter a valid phone number starting with 08, 09, or 06",
    })
    .allow(""),
  password: Joi.string()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must contain a-z, A-Z, or 0-9 and must be at least 6 characters",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": "Confirm Password is required",
    "any.only": "Passwords do not match",
  }),
});

const editProfileSchema = Joi.object({
  firstName: Joi.string()
    .min(1)
    .max(50)
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.empty": "Firstname is required",
      "string.pattern.base": "Firstname must contain a-z, A-Z",
    }),
  lastName: Joi.string()
    .min(1)
    .max(50)
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.empty": "Lastname is required",
      "string.pattern.base": "Lastname must contain a-z, A-Z",
    }),
  phoneNumber: Joi.string()
    .pattern(/^(08|09|06)[0-9]{7,9}$/)
    .messages({
      "string.pattern.base":
        "Please enter a valid phone number starting with 08, 09, or 06",
    })
    .allow(""),
});

// addProductSchema สำหรับการเพิ่มสินค้า
const addProductSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^(?![0-9])[A-Za-z0-9ก-ฮา]+/)
    .required()
    .messages({
      "string.empty": "Please type product name",
      "string.pattern.base":
        "Name cannot start with a number and must contain valid characters.",
    }),

  price: Joi.number()
    .custom((value, helpers) => {
      const valueString = value.toString();

      if (/\s/.test(valueString)) {
        return helpers.error("number.whitespace");
      }

      if (/^0\d/.test(valueString)) {
        return helpers.error("number.leadingZero");
      }

      return value; // ถ้าค่าถูกต้อง
    })
    .positive()
    .precision(2)
    .required()
    .messages({
      "number.base": "Price must be a valid number",
      "number.positive": "Price must be a positive number",
      "number.whitespace": "Price cannot contain spaces",
      "number.leadingZero": "Price cannot have leading zeros",
      "any.required": "Price is required",
    }),

  description: Joi.string().min(10).max(500).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description should have at least 10 characters",
    "string.max": "Description should have a maximum of 500 characters",
  }),

  product_categoryId: Joi.string().required().messages({
    "string.empty": "Product Category is required",
    "any.required": "Product category is required",
  }),

  isRecommended: Joi.boolean().allow(false),
});

const editProductSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^(?![0-9])[A-Za-z0-9ก-ฮา]+/)
    .required()
    .messages({
      "string.empty": "Please type product name",
      "string.pattern.base":
        "Name cannot start with a number and must contain valid characters.",
    }),

  price: Joi.number()
    .custom((value, helpers) => {
      const valueString = value.toString();

      if (/\s/.test(valueString)) {
        return helpers.error("number.whitespace");
      }

      if (/^0\d/.test(valueString)) {
        return helpers.error("number.leadingZero");
      }

      return value; // ถ้าค่าถูกต้อง
    })
    .positive()
    .precision(2)
    .required()
    .messages({
      "number.base": "Price must be a valid number",
      "number.positive": "Price must be a positive number",
      "number.whitespace": "Price cannot contain spaces",
      "number.leadingZero": "Price cannot have leading zeros",
      "any.required": "Price is required",
    }),

  description: Joi.string().min(10).max(500).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description should have at least 10 characters",
    "string.max": "Description should have a maximum of 500 characters",
  }),

  product_categoryId: Joi.number().required().messages({
    "number.base": "Product Category must be a valid number",
    "any.required": "Product category is required",
  }),

  isRecommended: Joi.boolean().allow(false),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const formatError = error.details.reduce((prev, curr) => {
      prev[curr.path[0]] = curr.message;
      return prev;
    }, {});
    return formatError;
  }
  return null; //If there is no error, nothing to show out
};

const validateLogin = (input) => {
  const { error } = loginSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const formatError = error.details.reduce((prev, curr) => {
      prev[curr.path[0]] = curr.message;
      return prev;
    }, {});
    return formatError;
  }
  return null; //If there is no error, nothing to show out
};

const validateEditProfile = (input) => {
  const { error } = editProfileSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const formatError = error.details.reduce((prev, curr) => {
      prev[curr.path[0]] = curr.message;
      return prev;
    }, {});
    return formatError;
  }
  return null; //If there is no error, nothing to show out
};

const validateAddProduct = (input) => {
  const { error } = addProductSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const formatError = error.details.reduce((prev, curr) => {
      prev[curr.path[0]] = curr.message;
      return prev;
    }, {});
    return formatError;
  }
  return null;
};

const validateEditProduct = (input) => {
  const { error } = editProductSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const formatError = error.details.reduce((prev, curr) => {
      prev[curr.path[0]] = curr.message;
      return prev;
    }, {});
    return formatError;
  }
  return null;
};

export default {
  validateRegister,
  validateLogin,
  validateEditProfile,
  validateAddProduct,
  validateEditProduct,
};
