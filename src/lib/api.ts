import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie } from "cookies-next";

class AxiosInstance {
  private instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  });

  constructor() {
    this.instance.interceptors.request.use(this.onRequest, this.onRequestError);
    this.instance.interceptors.response.use(
      this.onResponse,
      this.onErrorResponse
    );
  }

  private onRequest(
    config: AxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    const token = getCookie("access_token");
    if (!config.headers) {
      config.headers = {};
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return Promise.resolve({
      ...config,
    } as InternalAxiosRequestConfig);
  }

  private onRequestError(error: AxiosError<AxiosRequestConfig>) {
    switch (true) {
      case Boolean(error.config):
        // console.debug("Request Failed", error);
        break;
      case Boolean(error.request):
        // console.debug("Not Response", error);
        break;
      default:
        // console.debug("Request Error", error);
        break;
    }
    return Promise.reject(error);
  }

  private onResponse(response: AxiosResponse) {
    return response;
  }

  private async onErrorResponse(error: AxiosError | Error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.status!;

      switch (statusCode) {
        case 400:
          // console.debug("400 Error", message);
          break;
        case 401: {
          // TODO : delete access token
          break;
        }
        case 403: {
          // console.debug("403 Error", message);
          break;
        }
        case 404: {
          // console.debug("404 Error", message);
          break;
        }
        case 500: {
          // console.debug("500 Error", message);
          break;
        }
        default: {
          break;
        }
      }
    } else if (error instanceof Error && error.name === "TimeoutError") {
      // console.debug("TimeoutError");
    } else {
      // console.debug("Error", error);
    }

    return Promise.reject(error);
  }

  public getInstance() {
    return this.instance;
  }
}

export default new AxiosInstance().getInstance();
