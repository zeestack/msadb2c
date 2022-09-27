import { HttpModule as BaseHttpModule, HttpService } from '@nestjs/axios';
import { Logger, Module, OnModuleInit } from '@nestjs/common';

import { AxiosError } from 'axios';

@Module({
  imports: [BaseHttpModule],
  exports: [BaseHttpModule],
})
export class HttpModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  onModuleInit() {
    const logger = new Logger('HTTP Service');
    const axios = this.httpService.axiosRef;

    axios.interceptors.request.use(function (config) {
      config['metadata'] = { ...config['metadata'], startDate: new Date() };
      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        const { config } = response;
        config['metadata'] = { ...config['metadata'], endDate: new Date() };
        const duration =
          config['metadata'].endDate.getTime() -
          config['metadata'].startDate.getTime();
        logger.log(
          `${config.method.toUpperCase()} ${config.url} ${duration}ms`,
        );
        return {
          ...response.data,
          status: response.status,
          statusText: response.statusText,
          isError: false,
        };
      },

      (err: AxiosError) => {
        let errors: { [x: string]: unknown } = {};
        logger.error(err);
        const { response, request } = err;

        if (err.response) {
          logger.error(JSON.stringify(response.data));
          logger.verbose(JSON.stringify(response.headers));
          errors = {
            status: response.status,
            statusText: response.statusText,
            errorResponse: response.data,
            message: err.message,
          };
        } else if (request) {
          errors = {
            request: request,
            error: 'No response received from the server.',
            message: 'No response received from the server.',
          };
        } else {
          logger.error(err.message);
          errors.error = err.message;
        }

        errors.isError = true;
        return errors;
      },
    );
  }
}
