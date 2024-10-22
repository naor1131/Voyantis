import { MessageQueue } from "../types";
import axiosInstance from "./axiosInstance";

export const fetchQueues = async () => {
  const response = await axiosInstance.get<MessageQueue[]>("/queues");
  const allQueues = response.data;

  return allQueues;
};

export const fetchQueueNextMessage = async (queueId: string) => {
  const response = await axiosInstance.get<string>(`/queues/${queueId}`);
  const nextMessage = response.data;
  console.log(response);

  return nextMessage;
};
