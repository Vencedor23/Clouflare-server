import {
	handleWorkerLogsKeys,
	handleWorkerLogsValues,
	queryWorkersObservability,
} from '@repo/mcp-common/src/api/workers-observability'
import {
	zKeysRequest,
	zQueryRunRequest,
	zValuesRequest,
} from '@repo/mcp-common/src/types/workers-logs-schemas'

import type { BuildsMCP } from '../index'

/**
 * Registers the logs analysis tool with the MCP server
 * @param server The MCP server instance
 * @param accountId Cloudflare account ID
 * @param apiToken Cloudflare API token
 */
export function registerBuildsTools(agent: BuildsMCP) {
	// Register the worker logs analysis tool by worker name
	agent.server.tool(
		'list_workers_builds',
		`
Query the Workers Builds API to view builds from your Cloudflare Workers.
`.trim(),

		{
			query: zQueryRunRequest,
		},
		async ({ query }) => {
			const accountId = await agent.getActiveAccountId()
			if (!accountId) {
				return {
					content: [
						{
							type: 'text',
							text: 'No currently active accountId. Try listing your accounts (accounts_list) and then setting an active account (set_active_account)',
						},
					],
				}
			}
			try {
				const res = await queryWorkersObservability(agent.props.accessToken, accountId, query)
				return {
					content: [
						{
							type: 'text',
							text: JSON.stringify(res),
						},
					],
				}
			} catch (error) {
				return {
					content: [
						{
							type: 'text',
							text: JSON.stringify({
								error: `Error analyzing worker logs: ${error instanceof Error && error.message}`,
							}),
						},
					],
				}
			}
		}
	)
}
