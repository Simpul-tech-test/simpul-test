import { ApiResponse, ApiResponseList } from "../types/apiResponse";
import api from "./api";
import { ChattData, ChattMainData } from "../types/chatt";

export const chatService = {
  getAll(search?: string) {
    return api.get<ApiResponseList<ChattData>>("/newchat?q="+ search);
  },
  
  getList() {
    return api.get<ApiResponse<ChattData[]>>("/newchat");
  },

  getOne(id: string) {
    return api.get<{ data: ChattData }>("/newchat/" + id);
  },
  // async getOne(id: string) {
  //   const response = await api.get<{ data: ChattData }>("/newchat/" + id);
  //   return response.data.data;
  // },
  
  

  create(data: ChattMainData) {
    return api.post("/newchat", data);
  },

  edit(data: { id: string; data: ChattMainData }) {
    return api.patch(`/newchat/${data.id}`, data.data);
  },


  delete(id: string) {
    return api.delete(`/newchat/${id}`);
  },
};
