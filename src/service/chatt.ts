import { ApiResponse, ApiResponseList } from "../types/apiResponse";
import { api1 } from "./api";
import { ChattData, ChattMainData } from "../types/chatt";

export const chatService = {
  
  getList() {
    return api1.get<ApiResponse<ChattData[]>>("/chat");
  },

  getOne(id: string) {
    return api1.get<{ data: ChattData }>("/chat/" + id);
  },

  create(data: ChattMainData) {
    return api1.post("/chat", data);
  },

  edit(data: { id: string; data: ChattMainData }) {
    return api1.patch(`/chat/${data.id}`, data.data);
  },


  delete(id: string) {
    return api1.delete(`/chat/${id}`);
  },
};
