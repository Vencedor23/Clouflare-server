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
