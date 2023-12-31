import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { ThreadMessage, ThreadMessagesPage } from "openai/resources/beta/threads/messages/messages.mjs";

const storedMessages: ThreadMessage[] = [];

export const createThread = async (): Promise<Thread> => {
    //console.log("createThread");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                "id": "thread_abc123",
                "object": "thread",
                "created_at": 1699012949,
                "metadata": {}
            });
        }, 300);
    });
}

export const sendMessageToThread = async(content: string, thread: Thread): Promise<ThreadMessage> => {
    //console.log("sendMessageToThread");
    const message = await createMessage(content, thread);
    storedMessages.push(message);
    return message;
}

export const runThreadAndWaitForResponse = async(thread: Thread): Promise<ThreadMessage[]> => {
    //console.log("runThreadAndWaitForResponse");
    const run = await createRun(thread, "asst_abc123");
    await waitForRunToComplete(thread, run);
    const messagesList = await getMessagesList(thread);
    return messagesList.data;
}

export const createMessage = async (content: string, thread: Thread): Promise<ThreadMessage> => {
    //console.log("createMessage");

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                "id": "msg_abc" + Math.ceil(Math.random() * 100000),
                "object": "thread.message",
                "created_at": 1698983503,
                "thread_id": "thread_abc123",
                "role": "assistant",
                "content": [
                  {
                    "type": "text",
                    "text": {
                      "value": content,
                      "annotations": []
                    }
                  }
                ],
                "file_ids": [],
                "assistant_id": "asst_abc123",
                "run_id": "run_abc123",
                "metadata": {}
            });
        }, 200);
    });
}

export const createRun = async (thread: Thread, assistantId: string): Promise<Run> => {
    //console.log("createRun");

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                "id": "run_abc123",
                "object": "thread.run",
                "created_at": 1699063290,
                "assistant_id": "asst_abc123",
                "thread_id": "thread_abc123",
                "status": "queued",
                "started_at": 1699063290,
                "expires_at": null,
                "cancelled_at": null,
                "failed_at": null,
                "completed_at": 1699063291,
                "last_error": null,
                "model": "gpt-4",
                "instructions": null,
                "tools": [
                  {
                    "type": "code_interpreter"
                  }
                ],
                "file_ids": [
                  "file-abc123",
                  "file-abc456"
                ],
                "metadata": {}
            });
        }, 500);
    });
}

const waitForRunToComplete = async (thread: Thread, run: Run) => {
    //console.log("waitForRunToComplete");

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, 500);
    });
}

export const retrieveRun = async (thread: Thread, run: Run): Promise<Run> => {
    //console.log("retrieveRun");

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                "id": "run_abc123",
                "object": "thread.run",
                "created_at": 1699075072,
                "assistant_id": "asst_abc123",
                "thread_id": "thread_abc123",
                "status": "completed",
                "started_at": 1699075072,
                "expires_at": null,
                "cancelled_at": null,
                "failed_at": null,
                "completed_at": 1699075073,
                "last_error": null,
                "model": "gpt-3.5-turbo",
                "instructions": null,
                "tools": [
                    {
                    "type": "code_interpreter"
                    }
                ],
                "file_ids": [
                    "file-abc123",
                    "file-abc456"
                ],
                "metadata": {}
            });
        }, 500);
    });
}

export const getMessagesList = async (thread: Thread): Promise<ThreadMessagesPage> => {
    //console.log("getMessagesList");

    createMockReponse();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                "object": "list",
                "data": storedMessages,
                "first_id": "msg_abc123",
                "last_id": "msg_abc456",
                "has_more": false
            });
        }, 1000);
    });
}

const createMockReponse = () => {
    storedMessages.push({
        "id": "msg_abc" + Math.ceil(Math.random() * 100000),
        "object": "thread.message",
        "created_at": 1698983503,
        "thread_id": "thread_abc123",
        "role": "assistant",
        "content": [
            {
            "type": "text",
            "text": {
                "value": getRandomStringFromArray(mockReponses),
                "annotations": []
            }
            }
        ],
        "file_ids": [],
        "assistant_id": "asst_abc123",
        "run_id": "run_abc123",
        "metadata": {}
    });
}

const mockReponses: string[] = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras rutrum, turpis ut luctus dignissim, justo dolor fermentum nunc, aliquam luctus diam ante a arcu. Etiam fermentum porttitor scelerisque. Nulla ultrices quam convallis tortor fermentum, tempor fermentum libero blandit. Praesent posuere quam bibendum turpis suscipit luctus. ',
    'Morbi ac lectus scelerisque, vehicula ipsum at, accumsan velit.',
    'Morbi et hendrerit tellus, et sodales diam. Praesent a libero vitae tortor efficitur rhoncus at ac felis. Ut in tincidunt diam, nec suscipit orci. Suspendisse tristique luctus vehicula. Donec consequat nulla massa, sit amet fermentum erat convallis in. Integer ac malesuada risus, malesuada porttitor lorem. ',
    'Duis auctor pretium nulla, nec tempor libero dictum a. Nullam ornare mauris ut scelerisque accumsan. Sed quis nunc eu libero consectetur cursus. Ut nisi justo, ultrices eu mi et, dictum vulputate ipsum. Donec eu vulputate urna. Sed consectetur diam dolor, sit amet vestibulum dui iaculis et. Sed consectetur sollicitudin quam, quis cursus quam ornare a.',
    'Aliquam venenatis, dui quis tempor elementum.',
    'Maecenas odio nisl, gravida ac nunc et, pretium ultrices nulla. Nulla vehicula, velit et fermentum tincidunt.',
];

const getRandomStringFromArray = (array: string[]): string => {
    return array[Math.floor(Math.random() * array.length)];
}