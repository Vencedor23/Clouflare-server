import { fetchCloudflareApi } from '../cloudflare-api'
import {
	zKeysResponse,
	zReturnedQueryRunResult,
	zValuesResponse,
} from '../types/workers-logs-schemas'
import { V4Schema } from '../v4-api'

import type { z } from 'zod'
import type { zKeysRequest, zQueryRunRequest, zValuesRequest } from '../types/workers-logs-schemas'

export async function listWorkersBuilds(
	apiToken: string,
	accountId: string
): Promise<z.infer<typeof zReturnedQueryRunResult> | null> {
	const data = await fetchCloudflareApi({
		endpoint: '/workers/observability/telemetry/query',
		accountId,
		apiToken,
		responseSchema: V4Schema(zReturnedQueryRunResult),
		options: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	})

	return data.result
}
