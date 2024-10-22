interface Message {
  message: string;
  createdAt: number;
}

class MessageQueue {
  private queues: { [key: string]: Message[] } = {};

  constructor() {
    this.addMessage("queue1", "first message");
    this.addMessage("queue1", "second message");
    this.addMessage("queue1", "third message");

    this.addMessage("queue2", "first message");
    this.addMessage("queue2", "second message");
    this.addMessage("queue2", "third message");
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
