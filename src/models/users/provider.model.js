import mongoose, { model } from "mongoose";
import Joi from "joi";

const providerModelDatabase = new mongoose.Schema(
    {
        username: {
            type: String
        },

        lastname: {
            type: String
        },

        email: {
            type: String
        },

        password: {
            type: String
        },

        nameCorporate: {
            type: String
        },

        nameService: {
            type: String
        },

        experience: {
            type: String
        },

        role: {
            type: String
        },

        images: {
            type: String
        }
    }
)

const providerModel = model("providers", providerModelDatabase)

// ? validation data model
const validateDataProvider = (user) => {
    const Schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(25)
            .required(),
        lastname: Joi.string()
            .min(6)
            .max(30),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        password: Joi.string()
            .min(5)
            .required(),
        nameCorporate: Joi.string(),
        nameService: Joi.string()
            .required(),
        experience: Joi.string()
            .alphanum(),
        role: Joi.string()
            .max(60)
    })

    return Schema.validate(user)
}

export { providerModel, validateDataProvider }