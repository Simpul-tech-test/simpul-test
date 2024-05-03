export interface ApiResponse<T> {
    status: boolean;
    data: T;
    message: string;
  }
  
  export interface ApiResponseList<T> {
    map: any;
    // map(arg0: (item: import("./chatt").ChattData) => import("react").JSX.Element): import("react").ReactNode;
    status: boolean;
    data: T[];
    message: string;
  }
  
  export interface ErrorResponse {
    response: {
      data: {
        message: string;
      };
    };
  }
  