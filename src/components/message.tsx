import { cn } from "@/lib/utils";
import { FC } from "react";

export type MessagePropsType = {
  user: string;
  message: string;
};

const Message: FC<MessagePropsType> = ({ user, message }) => {
  return (
    <div
      className={cn(
        "flex gap-2 mb-2",
        user === "Me" ? "justify-end" : "justify-start"
      )}
    >
      <img
        alt="Avatar"
        className={cn(
          "rounded-full w-12 h-12 bg-white p-1",
          user === "Me" ? "order-2" : ""
        )}
        height="40"
        src={user === "Me" ? "/user.svg" : "/bot.svg"}
        style={{
          aspectRatio: "40/40",
          objectFit: "cover",
        }}
        width="40"
      />
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-sm line-numbers-[inherit] max-w-96">
        <pre className=" text-wrap">{message}</pre>
      </div>
    </div>
  );
};

export default Message;
