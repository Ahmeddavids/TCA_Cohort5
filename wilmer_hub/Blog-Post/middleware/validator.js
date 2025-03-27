const Joi = require('@hapi/joi');

exports.registerUserValidation = (req, res, next) => {
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
            "any.required": "Email is required"
        }),

        password: Joi.string().min(6).required().messages({
            "string.min": "Password must be at least 6 characters",
            "any.required": "Password is required"
        })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error){
        return res.status(400).json({
            message: error.message
        })
    }
    next()
};
