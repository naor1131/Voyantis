import React, { useEffect, useState } from "react";
import { MessageQueue } from "./types";
import { fetchQueueNextMessage, fetchQueues } from "./services/queue-service";

import "./App.css";

function App() {
  const [messageQueues, setMessageQueues] = useState<MessageQueue[]>([]);
  const [selectedQueueId, setSelectedQueueId] = useState<string | null>(null);
  const [nextMessage, setNextMessage] = useState<string>("");

  useEffect(() => {
    getAllQueues();
  }, []);

  const getAllQueues = async () => {
    const allQueues = await fetchQueues();
    setMessageQueues(allQueues);
  };

  function onItemClick(queueId: string) {
    setSelectedQueueId(queueId);
  }

  async function onButtonClick() {
    if (!selectedQueueId) return;
    const message = await fetchQueueNextMessage(selectedQueueId);
    setNextMessage(message);
  }

  return (
    <div className="App">
      <div className="queue-list">
        {messageQueues?.map((queue) => {
          return (
            <div
              className={`list-item ${queue.queueId === selectedQueueId ? "selected-item" : ""}`}
              onClick={() => onItemClick(queue.queueId)}
            >
              <div style={{ marginRight: 10 }}>{queue.queueId}</div>
              <div>{queue.count}</div>
            </div>
          );
        })}
      </div>
      <button disabled={!selectedQueueId} onClick={onButtonClick}>
        GO
      </button>

      <h1>{`Selected Queue's next message is: ${nextMessage}`}</h1>
    </div>
  );
}

export default App;
