import { Hono } from "hono"

type Environment = {
	readonly ERROR_QUEUE: Queue<Error>
	readonly ERROR_BUCKET: R2Bucket
}
