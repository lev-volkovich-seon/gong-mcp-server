#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import axios from 'axios';

// Define a basic Zod schema for the OpenAPI spec structure we're interested in


async function main() {


  const gongApiBaseUrl = 'https://api.gong.io';

  const GONG_ACCESS_KEY = process.env.GONG_ACCESS_KEY;
  const GONG_ACCESS_KEY_SECRET = process.env.GONG_ACCESS_KEY_SECRET;

  if (!GONG_ACCESS_KEY || !GONG_ACCESS_KEY_SECRET) {
    console.warn('GONG_ACCESS_KEY and GONG_ACCESS_KEY_SECRET environment variables are not set. API calls will likely fail.');
  }

  const axiosInstance = axios.create({
    baseURL: gongApiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      ...(GONG_ACCESS_KEY && GONG_ACCESS_KEY_SECRET && {
        'Authorization': `Basic ${Buffer.from(`${GONG_ACCESS_KEY}:${GONG_ACCESS_KEY_SECRET}`).toString('base64')}`,
      })
    },
  });

  // Add request interceptor for debugging
  axiosInstance.interceptors.request.use(
    (config) => {
      console.error(`[DEBUG] Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
      console.error(`[DEBUG] Headers:`, JSON.stringify(config.headers, null, 2));
      console.error(`[DEBUG] Data:`, JSON.stringify(config.data, null, 2));
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const server = new McpServer(
    {
      name: "Gong API Complete Collection",
      version: "v2",
      description: "Complete Postman collection for the Gong API with all endpoints and detailed parameters",
    },
    {
      instructions: `This server provides access to the Gong API. All tools correspond to operations defined in the Gong OpenAPI specification.`,
    }
  );

// Register tools
server.registerTool(
  "getCalls",
  {
    description: `List calls that took place during a specified date range`,
    inputSchema: {fromDateTime: z.string(), toDateTime: z.string(), cursor: z.string(), workspaceId: z.string()},
  },
  async (args: any) => {
    try {
      let url = `/v2/calls`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.fromDateTime !== undefined) { query.fromDateTime = args.fromDateTime; }
      if (args.toDateTime !== undefined) { query.toDateTime = args.toDateTime; }
      if (args.cursor !== undefined) { query.cursor = args.cursor; }
      if (args.workspaceId !== undefined) { query.workspaceId = args.workspaceId; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getCalls:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "addCall",
  {
    description: `Upload a new call to Gong`,
    inputSchema: {clientUniqueId: z.string(), title: z.string(), actualStart: z.string().datetime(), duration: z.number(), parties: z.array(z.object({userId: z.string().optional(), emailAddress: z.string().optional(), name: z.string().optional(), title: z.string().optional(), speakerId: z.string().optional()})), direction: z.enum(['Inbound', 'Outbound', 'Conference', 'Unknown']), purpose: z.string().optional(), scheduledStart: z.string().datetime().optional(), scheduledEnd: z.string().datetime().optional(), disposition: z.string().optional(), downloadMediaUrl: z.string().optional(), language: z.string().optional(), workspaceId: z.string().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/calls`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};

      // Request body
      data = {
        clientUniqueId: args.clientUniqueId,
        title: args.title,
        actualStart: args.actualStart,
        duration: args.duration,
        parties: args.parties,
        direction: args.direction,
        purpose: args.purpose,
        scheduledStart: args.scheduledStart,
        scheduledEnd: args.scheduledEnd,
        disposition: args.disposition,
        downloadMediaUrl: args.downloadMediaUrl,
        language: args.language,
        workspaceId: args.workspaceId
      };
      // Remove undefined values
      Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);


      const response = await axiosInstance.request({
        method: "post",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for addCall:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getCallById",
  {
    description: `Retrieve data for a specific call by its ID`,
    inputSchema: {id: z.string()},
  },
  async (args: any) => {
    try {
      let url = `/v2/calls/${args.id}`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getCallById:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
    }
);

server.registerTool(
  "addCallMedia",
  {
    description: `Add media to an existing call`,
    inputSchema: {id: z.string(), mediaFile: z.string()},
  },
  async (args: any) => {
    try {
      let url = `/v2/calls/${args.id}/media`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};

      // Request body

      if (args.mediaFile !== undefined) {
        const formData = new FormData();
        formData.append('mediaFile', args.mediaFile); // Assuming args.mediaFile is a File object or similar
        data = formData;
        headers['Content-Type'] = 'multipart/form-data';
      }


      const response = await axiosInstance.request({
        method: "put",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for addCallMedia:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getCallsExtensive",
  {
    description: `Retrieve detailed call data by various filters`,
    inputSchema: {fromDateTime: z.string().datetime().optional(), toDateTime: z.string().datetime().optional(), cursor: z.string().optional(), workspaceId: z.string().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/calls/extensive`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.fromDateTime !== undefined) { query.fromDateTime = args.fromDateTime; }
      if (args.toDateTime !== undefined) { query.toDateTime = args.toDateTime; }
      if (args.cursor !== undefined) { query.cursor = args.cursor; }
      if (args.workspaceId !== undefined) { query.workspaceId = args.workspaceId; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getCallsExtensive:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getCallTranscripts",
  {
    description: `Retrieve the transcript of calls`,
    inputSchema: {filter: z.object({fromDateTime: z.string().datetime().optional(), toDateTime: z.string().datetime().optional(), callIds: z.array(z.string()).optional(), primaryUserIds: z.array(z.string()).optional()})},
  },
  async (args: any) => {
    try {
      let url = `/v2/calls/transcript`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Query parameters
      const query: Record<string, any> = {};

      // Request body
      data = { filter: args.filter };

      console.error(`getCallTranscripts - Request URL: ${url}`);
      console.error(`getCallTranscripts - Request data: ${JSON.stringify(data, null, 2)}`);

      const response = await axiosInstance.request({
        method: "post",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getCallTranscripts:`, error.message);
      if (error.response) {
        console.error(`Response status: ${error.response.status}`);
        console.error(`Response data: ${JSON.stringify(error.response.data, null, 2)}`);
      }
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}${error.response ? `\nStatus: ${error.response.status}\nDetails: ${JSON.stringify(error.response.data, null, 2)}` : ''}` }],
      };
    }
  }
);

server.registerTool(
  "getUsers",
  {
    description: `Retrieve a list of all users in the company`,
    inputSchema: {cursor: z.string().optional(), includeAvatars: z.boolean().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/users`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.cursor !== undefined) { query.cursor = args.cursor; }
      if (args.includeAvatars !== undefined) { query.includeAvatars = args.includeAvatars; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getUsers:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getUserById",
  {
    description: `Retrieve a specific user by their ID`,
    inputSchema: {id: z.string()},
  },
  async (args: any) => {
    try {
      let url = `/v2/users/${args.id}`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getUserById:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getUserSettingsHistory",
  {
    description: `Retrieve the settings history for a specific user`,
    inputSchema: {id: z.string(), fromDateTime: z.string().datetime().optional(), toDateTime: z.string().datetime().optional(), cursor: z.string().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/users/${args.id}/settings-history`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.fromDateTime !== undefined) { query.fromDateTime = args.fromDateTime; }
      if (args.toDateTime !== undefined) { query.toDateTime = args.toDateTime; }
      if (args.cursor !== undefined) { query.cursor = args.cursor; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getUserSettingsHistory:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getUsersExtensive",
  {
    description: `Retrieve a list of users based on specified filters`,
    inputSchema: {filter: z.object({createdFromDateTime: z.string().datetime().optional(), createdToDateTime: z.string().datetime().optional(), userIds: z.array(z.string()).optional()}), cursor: z.string().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/users/extensive`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};

      // Request body
      data = {
        filter: args.filter,
        cursor: args.cursor
      };
      // Remove undefined values
      Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);


      const response = await axiosInstance.request({
        method: "post",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getUsersExtensive:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getActivityAggregate",
  {
    description: `Retrieve aggregated activity for defined users by date`,
    inputSchema: {filter: z.object({fromDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), toDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), userIds: z.array(z.string()).optional(), createdFromDateTime: z.string().datetime().optional(), createdToDateTime: z.string().datetime().optional()}), cursor: z.string().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/stats/activity/aggregate`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};

      // Request body
      data = {
        filter: args.filter,
        cursor: args.cursor
      };
      // Remove undefined values
      Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);


      const response = await axiosInstance.request({
        method: "post",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getActivityAggregate:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getActivityAggregateByPeriod",
  {
    description: `Retrieve aggregated activity for defined users by date range with grouping in time periods`,
    inputSchema: {filter: z.object({fromDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), toDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), userIds: z.array(z.string()).optional(), period: z.enum(['DAY', 'WEEK', 'MONTH'])}), cursor: z.string().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/stats/activity/aggregate-by-period`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};

      // Request body
      data = args;


      const response = await axiosInstance.request({
        method: "post",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getActivityAggregateByPeriod:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getActivityDayByDay",
  {
    description: `Retrieve daily activity for applicable users for a date range`,
    inputSchema: {filter: z.object({fromDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), toDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), userIds: z.array(z.string()).optional()}).optional(), cursor: z.string().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/stats/activity/day-by-day`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};

      // Request body
      data = args;


      const response = await axiosInstance.request({
        method: "post",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getActivityDayByDay:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getActivityScorecards",
  {
    description: `Retrieve answered scorecards for applicable reviewed users or scorecards for a date range`,
    inputSchema: {fromDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), toDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), cursor: z.string().optional(), userIds: z.array(z.string()).optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/stats/activity/scorecards`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.fromDate !== undefined) { query.fromDate = args.fromDate; }
      if (args.toDate !== undefined) { query.toDate = args.toDate; }
      if (args.cursor !== undefined) { query.cursor = args.cursor; }
      if (args.userIds !== undefined) { query.userIds = args.userIds; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getActivityScorecards:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getInteractionStats",
  {
    description: `Retrieve interaction stats for applicable users by date`,
    inputSchema: {fromDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), toDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), cursor: z.string().optional(), userIds: z.array(z.string()).optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/stats/interaction`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.fromDate !== undefined) { query.fromDate = args.fromDate; }
      if (args.toDate !== undefined) { query.toDate = args.toDate; }
      if (args.cursor !== undefined) { query.cursor = args.cursor; }
      if (args.userIds !== undefined) { query.userIds = args.userIds; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getInteractionStats:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getScorecards",
  {
    description: `Retrieve all the scorecards within the Gong system`,
    inputSchema: {},
  },
  async (args: any) => {
    try {
      let url = `/v2/settings/scorecards`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getScorecards:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getTrackers",
  {
    description: `Retrieve details for trackers`,
    inputSchema: {cursor: z.string().optional(), createdFromDateTime: z.string().datetime().optional(), createdToDateTime: z.string().datetime().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/settings/trackers`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.cursor !== undefined) { query.cursor = args.cursor; }
      if (args.createdFromDateTime !== undefined) { query.createdFromDateTime = args.createdFromDateTime; }
      if (args.createdToDateTime !== undefined) { query.createdToDateTime = args.createdToDateTime; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getTrackers:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getWorkspaces",
  {
    description: `Retrieve a list of all company workspaces`,
    inputSchema: {cursor: z.string().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/workspaces`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.cursor !== undefined) { query.cursor = args.cursor; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getWorkspaces:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getDataForEmailAddress",
  {
    description: `Retrieve all references to an email address`,
    inputSchema: {emailAddress: z.string().email(), cursor: z.string().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/data-privacy/data-for-email-address`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.emailAddress !== undefined) { query.emailAddress = args.emailAddress; }
      if (args.cursor !== undefined) { query.cursor = args.cursor; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getDataForEmailAddress:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getDataForPhoneNumber",
  {
    description: `Retrieve all references to a phone number`,
    inputSchema: {phoneNumber: z.string(), cursor: z.string().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/data-privacy/data-for-phone-number`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.phoneNumber !== undefined) { query.phoneNumber = args.phoneNumber; }
      if (args.cursor !== undefined) { query.cursor = args.cursor; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getDataForPhoneNumber:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "eraseDataForEmailAddress",
  {
    description: `Delete the email address and all associated elements`,
    inputSchema: {emailAddress: z.string().email()},
  },
  async (args: any) => {
    try {
      let url = `/v2/data-privacy/erase-data-for-email-address`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.emailAddress !== undefined) { query.emailAddress = args.emailAddress; }

      // Request body


      const response = await axiosInstance.request({
        method: "delete",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for eraseDataForEmailAddress:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "eraseDataForPhoneNumber",
  {
    description: `Delete the phone number and all associated elements`,
    inputSchema: {phoneNumber: z.string()},
  },
  async (args: any) => {
    try {
      let url = `/v2/data-privacy/erase-data-for-phone-number`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.phoneNumber !== undefined) { query.phoneNumber = args.phoneNumber; }

      // Request body


      const response = await axiosInstance.request({
        method: "delete",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for eraseDataForPhoneNumber:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getFolderContent",
  {
    description: `Retrieve a list of calls in a specific folder`,
    inputSchema: {folderId: z.string(), cursor: z.string().optional(), fromDateTime: z.string().datetime().optional(), toDateTime: z.string().datetime().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/library/folder-content`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.folderId !== undefined) { query.folderId = args.folderId; }
      if (args.cursor !== undefined) { query.cursor = args.cursor; }
      if (args.fromDateTime !== undefined) { query.fromDateTime = args.fromDateTime; }
      if (args.toDateTime !== undefined) { query.toDateTime = args.toDateTime; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getFolderContent:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getLibraryFolders",
  {
    description: `Retrieve a list of library folders`,
    inputSchema: {cursor: z.string().optional(), workspaceId: z.string().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/library/folders`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.cursor !== undefined) { query.cursor = args.cursor; }
      if (args.workspaceId !== undefined) { query.workspaceId = args.workspaceId; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getLibraryFolders:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getCrmEntities",
  {
    description: `Retrieve CRM objects`,
    inputSchema: {integrationId: z.number().int(), objectType: z.enum(['ACCOUNT', 'CONTACT', 'DEAL', 'LEAD']), requestBody: z.object({objectsCrmIds: z.array(z.string())})},
  },
  async (args: any) => {
    try {
      let url = `/v2/crm/entities`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.integrationId !== undefined) { query.integrationId = args.integrationId; }
      if (args.objectType !== undefined) { query.objectType = args.objectType; }

      // Request body
      if (args.requestBody !== undefined) { data = args.requestBody; }


      const response = await axiosInstance.request({
        method: "post",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getCrmEntities:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "uploadCrmEntities",
  {
    description: `Upload CRM objects`,
    inputSchema: {integrationId: z.number().int(), requestBody: z.object({objects: z.array(z.object({objectType: z.enum(['ACCOUNT', 'CONTACT', 'DEAL', 'LEAD']).optional(), crmId: z.string().optional(), fields: z.record(z.any()).optional()})).optional()})},
  },
  async (args: any) => {
    try {
      let url = `/v2/crm/entities`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.integrationId !== undefined) { query.integrationId = args.integrationId; }

      // Request body
      data = args.requestBody;


      const response = await axiosInstance.request({
        method: "post",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for uploadCrmEntities:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getCrmEntitySchema",
  {
    description: `Retrieve a list of schema fields`,
    inputSchema: {integrationId: z.number().int(), objectType: z.enum(['ACCOUNT', 'CONTACT', 'DEAL', 'LEAD'])},
  },
  async (args: any) => {
    try {
      let url = `/v2/crm/entity-schema`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.integrationId !== undefined) { query.integrationId = args.integrationId; }
      if (args.objectType !== undefined) { query.objectType = args.objectType; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getCrmEntitySchema:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "uploadCrmEntitySchema",
  {
    description: `Upload an object schema`,
    inputSchema: {integrationId: z.number().int(), requestBody: z.object({objectType: z.enum(['ACCOUNT', 'CONTACT', 'DEAL', 'LEAD']).optional(), fields: z.array(z.object({name: z.string().optional(), type: z.string().optional(), required: z.boolean().optional()})).optional()})},
  },
  async (args: any) => {
    try {
      let url = `/v2/crm/entity-schema`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.integrationId !== undefined) { query.integrationId = args.integrationId; }

      // Request body
      data = args.requestBody;


      const response = await axiosInstance.request({
        method: "post",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for uploadCrmEntitySchema:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "getCrmIntegrations",
  {
    description: `Retrieve details for a generic CRM integration`,
    inputSchema: {cursor: z.string().optional()},
  },
  async (args: any) => {
    try {
      let url = `/v2/crm/integrations`;
      const headers: Record<string, string> = {};
      let data: any = undefined;

      // Path parameters are already interpolated in the URL string
      // Query parameters
      const query: Record<string, any> = {};
      if (args.cursor !== undefined) { query.cursor = args.cursor; }

      // Request body


      const response = await axiosInstance.request({
        method: "get",
        url,
        params: query,
        data,
        headers,
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      console.error(`Error calling Gong API for getCrmIntegrations:`, error.message);
      return {
        content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
      };
    }
  }
);

server.registerTool(
  "registerCrmIntegration",
  {
    description: `Register a new generic CRM integration`,
    inputSchema: {name: z.string(), crmType: z.string(), description: z.string().optional()},
  },
            async (args: any) => {
              try {
                let url = `/v2/crm/integrations`;
                const headers: Record<string, string> = {};
                let data: any = undefined;
  
                // Path parameters are already interpolated in the URL string
                // Query parameters
                const query: Record<string, any> = {};
  
                // Request body
                data = args;
  
  
                const response = await axiosInstance.request({
                  method: "post",
                  url,
                  params: query,
                  data,
                  headers,
                });
  
                return {
                  content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
                };
              } catch (error: any) {
                console.error(`Error calling Gong API for registerCrmIntegration:`, error.message);
                return {
                  content: [{ type: 'text', text: `Error calling Gong API: ${error.message}` }],
                };
              }
            });

  // Connect to standard I/O
  const transport = new StdioServerTransport();
  await server.connect(transport);

}

main().catch(console.error);