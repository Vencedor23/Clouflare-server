import { z } from 'zod'

import {
	getBuildErrorReason,
	getLatestWorkersBuild,
} from '@repo/mcp-common/src/api/workers-builds.api'

import type { BuildsMCP } from '../index'

/**
 * Registers the logs analysis tool with the MCP server
 * @param server The MCP server instance
 * @param accountId Cloudflare account ID
 * @param apiToken Cloudflare API token
 */
export function registerBuildsTools(agent: BuildsMCP) {
	agent.server.tool(
		'get_latest_workers_build',
		`
Use the Workers Builds API to get the latest build for a Cloudflare Worker.

If the build failed, use get_workers_build_failure_reason to determine why it failed.
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
								error: `Error getting build: ${error instanceof Error && error.message}`,
							}),
						},
					],
				}
			}
		}
	)

	agent.server.tool(
		'get_workers_build_failure_reason',
		`
Use the Workers Builds API to get the latest build for a Cloudflare Worker.

If the build failed, use get_build_failure_reason to determine why it failed.
`.trim(),

		{
			buildUUID: z.string(),
		},
		async ({ buildUUID }) => {
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
				const res = await getBuildErrorReason({
					apiToken: agent.props.accessToken,
					accountId,
					buildUUID,
				})
				return {
					content: [
						{
							type: 'text',
							text: res,
						},
					],
				}
			} catch (error) {
				return {
					content: [
						{
							type: 'text',
							text: JSON.stringify({
								error: `Error getting build failure reason: ${error instanceof Error && error.message}`,
							}),
						},
					],
				}
			}
		}
	)
}
