import { fetchCloudflareApi } from '../cloudflare-api'
import { LatestBuildsByScriptResult } from '../types/workers-builds.types'
import { V4Schema } from '../v4-api'

export async function getLatestWorkersBuild({
	apiToken,
	accountId,
	scriptId,
}: {
	apiToken: string
	accountId: string
	scriptId: string
}) {
	const data = await fetchCloudflareApi({
		endpoint: `/builds/builds/latest?external_script_ids=${scriptId}`,
		accountId,
		apiToken,
		responseSchema: V4Schema(LatestBuildsByScriptResult),
		options: {
			method: 'GET',
		},
	})
	if (!data.result) {
		return null
	}
	const build = data.result.builds[scriptId]
	if (!build) {
		return null
	}
	return build
}

export async function getBuildErrorReason({
	apiToken,
	accountId,
	buildUUID,
}: {
	apiToken: string
	accountId: string
	buildUUID: string
}) {
	return `
You are a debugging machine!

You will be provided information about a Cloudflare Workers Build and you will need to debug it.

For now, you can only validate that the user has remembered to provide a wrangler configuration file.
If the build failed for an unrelated reason, just say "build failed for an unknown reason. check logs for more info".

If the user forgot the wrangler file, suggest a new 'wrangler.jsonc' based on the following template.
Use the build details and local files (if available) to determine the correct entrypoint.

If you have access to create the file, go ahead and create it instead of just suggesting it.

{
  "name": "<fill in the name of the worker>",
  "main": "<find the correct main entrypoint file based on the framework>",
  "compatibility_date": "2025-04-28",
  "compatibility_flags": ["nodejs_compat"],
  "observability": {
    "enabled": true
  }
}
	`.trim()
}
