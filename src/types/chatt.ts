export type ChattMainData = {
  sender: string;
  message: boolean;
};

export interface ChattData extends ChattMainData {
  id: string;
  sender: string;
  message: boolean;
  created_at: string;
  updated_at: string;
}

