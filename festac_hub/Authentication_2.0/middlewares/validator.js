// Import Joi dependency
const Joi = require('@hapi/joi');

exports.registerValidation = (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string()
            .min(3)
            .trim()
            .pattern(/^[A-Za-z ]+$/)
            .required()
            .messages({
                "any.required": "Fullname is required",
                "string.empty": "Fullname cannot be empty",
                "string.pattern.base": "Fullname should only contain alphabets",
                "string.min": "Fullname should not be less than 3 letters"
            }),

        email: Joi.string().email().required().messages({
            "string.email": "Invalid email format",
            "any.required": "Email is required",
            "string.empty": "Email cannot be empty",
        }),

        password: Joi.string().pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({
            "any.required": "Password is required",
            "string.empty": "Password cannot be empty",
            "string.pattern.base": "Password must be minimum of 8 Characters and include at least one Uppercase, Lowercase and a Special character [!@#$%^&*].",
        })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            // message: error.details.map(err => err.message) // Send all validation errors
            message: error.message
        });
    }
    
    next();
};
