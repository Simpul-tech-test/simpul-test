export type ChattMainData = {
  sender: string;
  message: string;
  created_at: string;
};

export interface ChattData extends ChattMainData {
  id: string;
  sender: string;
  title: string;
  message: string;
  created_at: string;
  updated_at: string;
}

