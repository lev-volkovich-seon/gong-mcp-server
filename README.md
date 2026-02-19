# gong-mcp-server

[![npm version](https://img.shields.io/npm/v/gong-mcp-server.svg)](https://www.npmjs.com/package/gong-mcp-server)

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that provides tools for interacting with the [Gong API](https://gong.app.gong.io/settings/api/documentation). Enables AI assistants to access Gong call data, user information, activity stats, CRM integrations, and more.

## Available Tools

| Tool | Description |
|------|-------------|
| `getCalls` | List calls within a date range |
| `addCall` | Upload a new call |
| `getCallById` | Get a specific call by ID |
| `addCallMedia` | Add media to an existing call |
| `getCallsExtensive` | Retrieve detailed call data with filters |
| `getCallTranscripts` | Retrieve call transcripts |
| `getUsers` | List all users |
| `getUserById` | Get a specific user by ID |
| `getUserSettingsHistory` | Get user settings history |
| `getUsersExtensive` | List users with filters |
| `getActivityAggregate` | Aggregated user activity by date |
| `getActivityAggregateByPeriod` | Aggregated activity grouped by period |
| `getActivityDayByDay` | Daily activity for users |
| `getActivityScorecards` | Answered scorecards for users |
| `getInteractionStats` | Interaction stats by date |
| `getScorecards` | List all scorecards |
| `getTrackers` | List trackers |
| `getWorkspaces` | List workspaces |
| `getDataForEmailAddress` | Find references to an email address |
| `getDataForPhoneNumber` | Find references to a phone number |
| `eraseDataForEmailAddress` | Delete email address data (GDPR) |
| `eraseDataForPhoneNumber` | Delete phone number data (GDPR) |
| `getFolderContent` | List calls in a folder |
| `getLibraryFolders` | List library folders |
| `getCrmEntities` | Retrieve CRM objects |
| `uploadCrmEntities` | Upload CRM objects |
| `getCrmEntitySchema` | Get CRM schema fields |
| `uploadCrmEntitySchema` | Upload CRM object schema |
| `getCrmIntegrations` | List CRM integrations |
| `registerCrmIntegration` | Register a new CRM integration |

## Setup

### 1. Get Gong API Credentials

Generate an access key and secret in your [Gong API settings](https://app.gong.io/company/api).

### 2. Install

```bash
npm install -g gong-mcp-server
```

Or use directly with npx:

```bash
npx gong-mcp-server
```

### 3. Configure Your MCP Client

Add the server to your MCP client configuration. For example, in Claude Desktop's `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gong": {
      "command": "npx",
      "args": ["-y", "gong-mcp-server"],
      "env": {
        "GONG_ACCESS_KEY": "your-access-key",
        "GONG_ACCESS_KEY_SECRET": "your-access-key-secret"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GONG_ACCESS_KEY` | Yes | Your Gong API access key |
| `GONG_ACCESS_KEY_SECRET` | Yes | Your Gong API access key secret |

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build
npm run build

# Run built version
npm start
```

## License

MIT
