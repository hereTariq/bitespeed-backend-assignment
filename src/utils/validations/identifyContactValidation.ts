import Joi from 'joi';

export const identityContactValidation = Joi.object({
    email: Joi.string().email().optional(),
    phoneNumber: Joi.string()
        .pattern(/^[0-9]+$/)
        .optional(),
}).or('email', 'phoneNumber');
