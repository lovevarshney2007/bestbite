import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {

    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || error.status || 500;

        error = new ApiError(
            statusCode,
            error.message || "Internal Server Error",
            error.errors || [],
            err.stack
        );
    }

    return res.status(error.statusCode).json({
        success: error.success,
        message: error.message,
        errors: error.errors,
        data: error.data
    });
};

export { errorHandler };