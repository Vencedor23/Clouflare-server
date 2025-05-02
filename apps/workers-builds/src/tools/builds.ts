import { z } from 'zod'

import { getLatestWorkersBuild } from '@repo/mcp-common/src/api/workers-builds.api'

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
		'get_latest_workers_build',
		`
Use the Workers Builds API to get the latest build for a Cloudflare Worker.
`.trim(),

		{
			scriptId: z.string(),
		},
		async ({ scriptId }) => {
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
				const res = await getLatestWorkersBuild({
					apiToken: agent.props.accessToken,
					accountId,
					scriptId,
				})
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
