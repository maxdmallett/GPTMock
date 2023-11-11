import OpenAI from "openai";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { ThreadMessage, ThreadMessagesPage } from "openai/resources/beta/threads/messages/messages.mjs";

const openai = new OpenAI();

export const createThread = async (): Promise<Thread> => {
    return await openai.beta.threads.create();
}

export const sendMessageToThread = async(content: string, thread: Thread): Promise<ThreadMessage> => {
    const message = await createMessage(content, thread);
    return message;
}

export const runThreadAndWaitForResponse = async(thread: Thread): Promise<ThreadMessage[]> => {
    const run = await createRun(thread, "asst_abc123");
    await waitForRunToComplete(thread, run);
    const messagesList = await getMessagesList(thread);
    return messagesList.data;
}

export const createMessage = async (content: string, thread: Thread): Promise<ThreadMessage> => {
    return await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: content
        }
    );
}

export const createRun = async (thread: Thread, assistantId: string): Promise<Run> => {
    return await openai.beta.threads.runs.create(
        thread.id,
        { assistant_id: assistantId }
    );
}

const waitForRunToComplete = async (thread: Thread, run: Run) => {
    if (await isRunComplete(thread, run)) return;

    const interval = setInterval(async () => {
        if (await isRunComplete(thread, run)) {
            clearInterval(interval);
            return;
        }
    }, 1000);
}

const isRunComplete = async (thread: Thread, run: Run): Promise<boolean> => {
    const thisRun = await retrieveRun(thread, run);
    return thisRun.status === "completed";
}

export const retrieveRun = async (thread: Thread, run: Run): Promise<Run> => {
    return await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
    );
}

export const getMessagesList = async (thread: Thread): Promise<ThreadMessagesPage> => {
    return await openai.beta.threads.messages.list(
        thread.id
    );
}