<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';

import { Email } from '../types/email';

interface Props {
	foundedEmails: Email[];
}

defineProps<Props>();
const emit = defineEmits(['selectEmail', 'changePage']);
</script>

<template>
	<section class="w-full h-full flex flex-col justify-between items-center">
		<div class="w-full max-h-[80%] overflow-y-auto">
			<table class="w-full table-fixed">
				<thead>
					<tr>
						<th class="table-head-th">Subject</th>
						<th class="table-head-th">From</th>
						<th class="table-head-th">To</th>
					</tr>
				</thead>

				<tbody>
					<tr
						@click="emit('selectEmail', email)"
						v-for="email in foundedEmails"
						class="border-t cursor-pointer transition-colors hover:bg-gray-700 max-w-full"
					>
						<td class="table-body-td">
							{{ email.subject }}
						</td>
						<td class="table-body-td">
							{{ email.from }}
						</td>
						<td class="table-body-td">
							{{ email.to }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="flex gap-3 items-center">
			<button type="button" title="previous page">
				<ChevronLeftIcon class="w-6 h-6 hover:opacity-75 transition-opacity" />
			</button>
			<p><span>1</span>/<span>10</span></p>
			<button type="button" title="next page">
				<ChevronRightIcon class="w-6 h-6 hover:opacity-75 transition-opacity" />
			</button>
		</div>
	</section>
</template>
