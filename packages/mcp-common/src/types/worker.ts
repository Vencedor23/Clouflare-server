import { z } from 'zod'

export type WorkersService = z.infer<typeof WorkersService>
export const WorkersService = z.object({
	id: z.string(),
	default_environment: z.object({
		environment: z.string(),
		script_tag: z.string(),
		created_on: z.string(),
		modified_on: z.string(),
		script: z.object({
			created_on: z.string(),
			modified_on: z.string(),
			id: z.string(),
			tag: z.string(),
			tags: z.array(z.string()),
			deployment_id: z.string(),
			tail_consumers: z.null(),
			logpush: z.boolean(),
			has_assets: z.boolean(),
			has_modules: z.boolean(),
			etag: z.string(),
			handlers: z.array(z.string()),
			last_deployed_from: z.string(),
			compatibility_date: z.string(),
			compatibility_flags: z.array(z.string()),
			usage_model: z.string(),
		}),
	}),
	created_on: z.string(),
	modified_on: z.string(),
	usage_model: z.string(),
	environments: z.array(
		z.object({
			environment: z.string(),
			script_tag: z.string(),
			created_on: z.string(),
			modified_on: z.string(),
		})
	),
})
