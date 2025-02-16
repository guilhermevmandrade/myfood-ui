import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  status: number;
};

type ApiHandlerOptions = {
  successMessage?: string;
  errorMessage?: string;
  defaultStatus?: number;
};

type ErrorResponseData = {
  Details?: string;
  Message?: string;
  StackTrace?: string;
};

const useApiRequest = <T>() => {
  const [isLoading, setIsLoading] = useState(false);

  const handleApiResponse = (
    response: AxiosResponse<T> | AxiosError,
    options: ApiHandlerOptions = {}
  ): ApiResponse<T> => {
    const {
      successMessage = "Requisição bem-sucedida.",
      errorMessage = "Erro na requisição. Tente novamente.",
      defaultStatus = 500,
    } = options;

    // Verifica se é uma resposta de sucesso
    if (!(response instanceof AxiosError) && response.status >= 200 && response.status < 300) {
      return {
        success: true,
        message: successMessage,
        data: response.data,
        status: response.status,
      };
    }

    // Caso seja um erro
    if (response instanceof AxiosError && response.response) {
      const errorData = response.response.data as ErrorResponseData;
      const errorDetails = errorData.Details || errorData.Message || errorMessage;
      return {
        success: false,
        message: errorDetails,
        status: response.response.status,
      };
    }

    // Caso o erro não seja do Axios ou não tenha uma resposta
    return {
      success: false,
      message: errorMessage,
      status: defaultStatus,
    };
  };

  const makeRequest = async (
    request: () => Promise<AxiosResponse<T>>,
    options?: ApiHandlerOptions
  ) => {
    setIsLoading(true);

    try {
      const response = await request();
      const apiResponse = handleApiResponse(response, options);
      return apiResponse;
    } catch (error) {
      const apiResponse = handleApiResponse(error as AxiosError, options);
      return apiResponse;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, makeRequest };
};

export default useApiRequest;
