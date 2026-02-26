import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError, EntityNotFoundError } from 'typeorm'; // Import from typeorm

@Catch(QueryFailedError, EntityNotFoundError) // Catch specific TypeORM errors
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Handle EntityNotFoundError (e.g., from findOneOrFail)
    if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = 'Entity not found';
    } 
    
    // Handle QueryFailedError
    else if (exception instanceof QueryFailedError) {
      const driverError = (exception as any).driverError;
      const code = driverError.code || driverError.errno; // Handle different DB drivers

      switch (code) {
        // PostgreSQL unique violation error code
        case '23505':
          status = HttpStatus.CONFLICT;
          message = driverError.detail;
          break;
        default:
          // Log the actual database error for debugging purposes if needed
          console.error('Unhandled QueryFailedError code:', code, driverError);
          message = 'Database query failed';
          break;
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}