import { ApiResponse, ApiResponseList } from "../types/apiResponse";
import api from "./api";
import { ChattData, ChattMainData } from "../types/chatt";

export const chatService = {
  getAll(search?: string) {
    return api.get<ApiResponseList<ChattData>>("/chat?q="+ search);
  },
  
  getList() {
    return api.get<ApiResponse<ChattData[]>>("/chat");
  },

  getOne(id: string) {
    return api.get<{ data: ChattData }>("/chat/" + id);
  },

  create(data: ChattMainData) {
    return api.post("/chat", data);
  },

  edit(data: { id: string; data: ChattMainData }) {
    return api.patch(`/chat/${data.id}`, data.data);
  },

  editStatus(data: { id: string; status: Boolean }) {
    return api.patch(`/chat/${data.id}`, {
      status: data.status,
    });
  },

  delete(id: string) {
    return api.delete(`/chat/${id}`);
  },
};
