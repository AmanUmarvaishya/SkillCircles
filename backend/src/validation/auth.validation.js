// validation/signup.validation.js
import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.empty": "Name is required ",
    "any.required": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name max 20 characters",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
    "string.email": "Email must be valid",
  }),

  password: Joi.string().min(6).max(20).required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password maximum 20 characters",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
    "string.email": "Email must be valid",
  }),

  password: Joi.string().min(6).max(20).required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password maximum 20 characters",
  }),
});

export const otpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
    "string.email": "Email must be valid",
  }),
});

export const otpVerifySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
  }),

  otp: Joi.number().min(6).required().messages({
    "number.empty": "otp is required",
    "any.required": "otp is required",
    "number.min": "otp must be at min 6 characters",
  }),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
    "string.email": "Email must be valid",
  }),

  password: Joi.string().min(6).max(20).required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password maximum 20 characters",
  }),

  confirmPassword: Joi.string().min(6).max(20).required().messages({
    "string.empty": "confirmPassword is required",
    "any.required": "confirmPassword is required",
    "string.min": "confirmPassword must be at least 6 characters",
    "string.max": "confirmPassword maximum 20 characters",
  }),
});
