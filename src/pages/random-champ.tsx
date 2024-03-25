import { createAsync } from "@solidjs/router"
import { For, Suspense, createResource } from "solid-js"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import * as Card from "~/components/ui/card"
import { RatingGroup } from "~/components/ui/rating-group"
import { getRandomChampion } from "~/lib/league-api/ddragon"

export const RandomChampPage = () => {
	const [champion, { refetch }] = createResource(getRandomChampion)

	return (
		<div>
			<Suspense>
				<Card.Root class="flex w-full flex-row">
					<img
						class="m-6 h-[400px] rounded-md border-2 border-accent-emphasized"
						src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion()?.id}_0.jpg`}
						alt={champion()?.name}
					/>

					<div class="flex w-full flex-col">
						<Card.Header>
							<Card.Title>{champion()?.name}</Card.Title>
							<Card.Description>{champion()?.title}</Card.Description>
							<RatingGroup value={champion()?.info.difficulty} readOnly />

							<div class="flex gap-2">
								<For each={champion()?.tags}>{(item) => <Badge>{item}</Badge>}</For>
							</div>
						</Card.Header>
						<Card.Body>
							<p>{champion()?.blurb}</p>
						</Card.Body>
						<Card.Footer>
							<Button onClick={refetch}>Reroll</Button>
						</Card.Footer>
					</div>
				</Card.Root>
			</Suspense>
		</div>
	)
}
