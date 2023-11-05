import mongoose, { model } from "mongoose";
import Joi from "joi";

const modelUser = new mongoose.Schema(
    {
        username: {
            type: String,
        },

        lastname: {
            type: String,
        },

        numberPhone: {
            type: Number,
        },

        email: {
            type: String,
        },

        password: {
            type: String,
        },

        isClientOrProvider: {
            type: Boolean
        }
    }
)

const userModel = model("users", modelUser)

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(15)
            .required(),
        lastname: Joi.string()
            .min(3)
            .required(),
        numberPhone: Joi.number()
            .min(10)
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        password: Joi.string()
            .min(5)
            .required(),
        isClientOrProvider: Joi.bool()
    });
    return schema.validate(user);
};

export { userModel, validateUser }