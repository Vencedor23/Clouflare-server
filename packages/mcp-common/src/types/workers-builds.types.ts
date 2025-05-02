import { z } from 'zod'

export type LatestBuildsByScriptResult = z.infer<typeof LatestBuildsByScriptResult>
export const LatestBuildsByScriptResult = z.object({
	builds: z.record(
		z.string(),
		z.object({
			build_uuid: z.string(),
			status: z.string(),
			build_outcome: z.string().nullable(),
			initializing_on: z.string().nullable(),
			running_on: z.string().nullable(),
			stopped_on: z.string().nullable(),
			created_on: z.string(),
			modified_on: z.string(),
			trigger: z.object({
				trigger_uuid: z.string(),
				external_script_id: z.string(),
				trigger_name: z.string(),
				build_command: z.string(),
				deploy_command: z.string(),
				root_directory: z.string(),
				branch_includes: z.array(z.string()),
				branch_excludes: z.array(z.string()),
				path_includes: z.array(z.string()),
				path_excludes: z.array(z.string()),
				build_caching_enabled: z.boolean(),
				created_on: z.string(),
				modified_on: z.string(),
				deleted_on: z.null(),
				repo_connection: z.object({
					repo_connection_uuid: z.string(),
					repo_id: z.string(),
					repo_name: z.string(),
					provider_type: z.string(),
					provider_account_id: z.string(),
					provider_account_name: z.string(),
					created_on: z.string(),
					modified_on: z.string(),
					deleted_on: z.null(),
				}),
			}),
			build_trigger_metadata: z.object({
				build_trigger_source: z.string(),
				branch: z.string(),
				commit_hash: z.string(),
				commit_message: z.string(),
				author: z.string(),
				build_command: z.string(),
				deploy_command: z.string(),
				root_directory: z.string(),
				build_token_uuid: z.string(),
				environment_variables: z.record(
					z.string(),
					z.object({
						is_secret: z.boolean(),
						created_on: z.string(),
						value: z.string(),
					})
				),
				repo_name: z.string(),
				provider_account_name: z.string(),
				provider_type: z.string(),
			}),
			pull_request: z.unknown(),
		})
	),
})
