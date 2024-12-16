// import {
//   CopilotRuntime,
//   OpenAIAdapter,
//   copilotRuntimeNextJSAppRouterEndpoint,
// } from '@copilotkit/runtime';
// import OpenAI from 'openai';
// import { NextRequest } from 'next/server';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// const serviceAdapter = new OpenAIAdapter({ openai, model: "gpt-3.5-turbo" });
// const runtime = new CopilotRuntime({
//   // ... existing configuration
//   actions: ({ properties, url }) => {
//     // Note that actions returns not an array, but an array **generator**.
//     // You can use the input parameters to the actions generator to expose different backend actions to the Copilot at different times: 
//     // `url` is the current URL on the frontend application.
//     // `properties` contains custom properties you can pass from the frontend application.

//     return [
//       {
//         name: "fetchNameForUserId",
//         description: "Fetches user name from the database for a given ID.",
//         parameters: [
//           {
//             name: "userId",
//             type: "string",
//             description: "The ID of the user to fetch data for.",
//             required: true,
//           },
//         ],
//         handler: async ({ userId }: { userId: string }) => {
//           // do something with the userId
//           // return the user data
//           return {
//             name: "Darth Doe",
//           };
//         },
//       },
//     ]
//   }
// });

// export const POST = async (req: NextRequest) => {
//   const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
//     runtime,
//     serviceAdapter,
//     endpoint: '/api/copilotkit',
//   });

//   return handleRequest(req);
// };

import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from '@copilotkit/runtime';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest } from 'next/server';

const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);
const serviceAdapter = new GoogleGenerativeAIAdapter({ model: "gemini-1.5-flash" });
const runtime = new CopilotRuntime({
  actions: ({ properties, url }) => {
    return [
      {
        name: "generateContent",
        description: "Generates content based on a given prompt.",
        parameters: [
          {
            name: "prompt",
            type: "string",
            description: "The text prompt to generate content for.",
            required: true,
          },
        ],
        handler: async ({ prompt }: { prompt: string }) => {
          try {
            const result = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent(prompt);
            return { text: result.response.text() };
          } catch (error) {
            console.error(error);
            throw new Error("Unexpected Error!");
          }
        },
      },
    ];
  }
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: '/api/copilotkit',
  });

  return handleRequest(req);
};