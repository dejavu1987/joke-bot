import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Message as MessageProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useMachine } from "@xstate/react";
import Message from "./message";
import { JokeCategory, jokeBotMachine } from "@/jokeMachine";

const jokes = {
  "dad joke": [
    "'What do you call a fish with no eyes?' Fsh!",
    "'What do you call a deer with no eyes?' No idea!",
    "'What do you call a cow with no legs?' Ground beef!",
    "'What do you call a horse with no legs?' A walkin' horse!",
    "'What do you call a bird with no wings?' A walkin' bird!",
    "'What do you call a dog with no legs?' A crawl dog!",
    "'What do you call a cat with no legs?' A walkin' cat!",
    "'What do you call a mouse with no legs?' A walkin' mouse!",
    "'What do you call a snake with no legs?' A slitherin' snake!",
    "'What do you call a fish with no fins?' A flat fish!",
    "'What do you call a bird with no feathers?' A naked bird!",
    "'What do you call a cow with no tail?' A buttless cow!",
    "'What do you call a horse with no tail?' A headless horse!",
  ],
  pun: [
    "Why did Adele cross the road? To say hello from the other side",
    "What kind of concert only costs 45 cents? A 50 Cent concert featuring Nickelback",
    "What did the grape say when it got crushed? Nothing, it just let out a little wine",
    "I want to be cremated as it is my last hope for a smoking hot body",
    "Time flies like an arrow. Fruit flies like a banana",
  ],
  "chuck norris": [
    "'Chuck Norris can roundhouse kick a tornado and make it go back the other way.",
    "'Chuck Norris can eat a watermelon in one bite.",
    "'Chuck Norris can make a light bulb glow by staring at it.",
    "'Chuck Norris can make a baby cry by staring at it.",
  ],
};

const defaultMessages: MessageProps[] = [
  {
    user: "Joke Bot",
    message:
      "Hi there! I am Joke Bot! I'm here to make you laugh! Do you want to hear a joke?",
  },
];
export function Chat() {
  const [state, send] = useMachine(jokeBotMachine);
  const messageList = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  useEffect(() => {
    if (messageList.current) {
      messageList.current.scrollTop = messageList.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    switch (state.value) {
      case "initial":
        setMessages([...messages, ...defaultMessages]);
        break;
      case "categories":
        setMessages([
          ...messages,
          {
            user: "Jokes Bot",
            message: "Please select a category: pun, dad joke, chuck norris",
          },
        ]);
        break;
      case "end":
        setMessages([
          ...messages,
          {
            user: "Jokes Bot",
            message:
              "Okay Bye! If you want to hear another joke, just type hi!",
          },
        ]);
        break;
      case "jokes":
        setMessages([
          ...messages,
          {
            user: "Jokes Bot",
            message:
              "Here's a joke:\n" +
              jokes[state.context.currentCategory][
                Math.floor(
                  Math.random() * jokes[state.context.currentCategory].length
                )
              ] +
              ".\nDo you want to hear another one?",
          },
        ]);
        break;
    }
  }, [state.value]);

  const sendMessage = () => {
    setMessages([
      ...messages,
      {
        user: "Me",
        message: currentMessage,
      },
    ]);
    if (currentMessage.match(/yes/i)) {
      console.log("Yes");
      send({ type: "START" });
      send({ type: "NEXT_JOKE" });
    }
    if (currentMessage && currentMessage.match(/pun|dad joke|chuck norris/i)) {
      console.log("cat select");
      send({
        type: "CHOOSE_CATEGORY",
        category: currentMessage.match(
          /pun|dad joke|chuck norris/i
        )![0] as JokeCategory,
      });
    }

    if (
      currentMessage.trim().match(/^no$/) ||
      currentMessage.match(/nope|end|bye|quit|stop|exit/i)
    ) {
      console.log("stop");
      send({ type: "END" });
    }
    if (currentMessage.match(/restart|hi|hello|new|init/i)) {
      console.log("restart");
      send({ type: "RESTART" });
    }
    console.log(state.value);
    setCurrentMessage("");
  };

  return (
    <div className="flex w-full max-w-2xl rounded-lg border border-gray-200 dark:border-gray-500 overflow-hidden flex-col dark:border-gray-800">
      <div className="grid w-full border-b border-gray-500 dark:border-gray-500 p-4 items-start gap-1">
        <div className="flex items-center gap-4">
          <img
            alt="Avatar"
            className="rounded-full bg-white"
            height="40"
            src="/bot.svg"
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
            width="40"
          />
          <div className="flex flex-col">
            <h2 className="text-base font-semibold leading-none">Joke Bot</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Typing...
            </p>
          </div>
        </div>
      </div>
      <div
        ref={messageList}
        className="p-2 min-h-[50vh] max-h-[80vh] overflow-y-auto"
      >
        {messages.map((props, index) => (
          <Message key={index} {...props} />
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <form
          className="flex gap-4 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <Textarea
            className="flex-1 h-[40px]"
            placeholder="Type a message..."
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            onChange={(e) => setCurrentMessage(e.target.value)}
            value={currentMessage}
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}
