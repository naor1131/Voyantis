interface Message {
  message: string;
  createdAt: number;
}

class MessageQueue {
  private queues: { [key: string]: Message[] } = {};

  constructor() {
    this.addMessage("queue1", "hello everyone");
    this.addMessage("queue1", "this is amazing");
    this.addMessage("queue1", "life is cool");

    this.addMessage("queue2", "where is the jacket");
    this.addMessage("queue2", "it is winter");
    this.addMessage("queue2", "drink water everyday");
  }

  // Add a message to the queue
  public addMessage(queueId: string, message: string): void {
    if (!this.queues[queueId]) {
      this.queues[queueId] = [];
    }
    this.queues[queueId].push({ message, createdAt: Date.now() });
  }

  public getNextMessage(queueId: string): string | null {
    if (!this.queues[queueId] || this.queues[queueId].length === 0) {
      return null;
    }
    return this.queues[queueId].shift()!.message;
  }

  public getMessageCount(queueId: string): number {
    if (!this.queues[queueId]) {
      return 0;
    }
    return this.queues[queueId].length;
  }

  public getAllQueues(): { queueId: string; count: number }[] {
    return Object.keys(this.queues).map((queueId) => ({
      queueId,
      count: this.queues[queueId].length,
    }));
  }
}

const messageQueue = new MessageQueue();
export default messageQueue;
