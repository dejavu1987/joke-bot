import { setup } from "xstate";
export type JokeCategory = "dad joke" | "pun" | "chuck norris";
export const jokeBotMachine = setup({
  types: {
    context: {} as { currentCategory: JokeCategory },
    events: {} as
      | { type: "START" }
      | { type: "CHOOSE_CATEGORY"; category: string }
      | { type: "END" }
      | { type: "NEXT_JOKE" }
      | { type: "RESTART" },
  },
  schemas: {
    events: {
      START: {
        type: "object",
        properties: {},
      },
      CHOOSE_CATEGORY: {
        type: "object",
        properties: {
          category: {
            type: "string",
          },
        },
        description: "ahehlaksdf",
      },
      END: {
        type: "object",
        properties: {},
      },
      NEXT_JOKE: {
        type: "object",
        properties: {},
      },
      RESTART: {
        type: "object",
        properties: {},
      },
    },
    context: {
      currentCategory: {
        type: "string",
        description:
          'Generated automatically based on the key: "currentCategory" in initial context values',
      },
    },
  },
}).createMachine({
  context: {
    currentCategory: "pun",
  },
  id: "jokeBot",
  initial: "initial",
  states: {
    initial: {
      on: {
        START: {
          target: "categories",
        },
      },
    },
    categories: {
      on: {
        CHOOSE_CATEGORY: {
          target: "jokes",
          actions: ({ context: ctx, event: event }) => {
            ctx.currentCategory = event.category as JokeCategory;
          },
        },
        END: {
          target: "end",
        },
      },
    },
    jokes: {
      on: {
        END: {
          target: "end",
        },
        NEXT_JOKE: {
          target: "categories",
        },
      },
    },
    end: {
      on: {
        RESTART: {
          target: "initial",
        },
      },
    },
  },
});
