<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';

import { Email } from '../types/email';

interface Props {
	foundedEmails: Email[];
	actualPage: number;
	totalPages: number;
}

defineProps<Props>();
const emit = defineEmits(['selectEmail', 'upPage', 'downPage']);
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
						:key="email.message_id"
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
			<button
				type="button"
				title="previous page"
				@click="emit('downPage')"
				:disabled="totalPages <= 1"
				class="disabled:opacity-75 hover:opacity-75 transition-opacity"
			>
				<ChevronLeftIcon class="w-6 h-6" />
			</button>
			<p>
				<span>{{ actualPage }}</span
				>/<span>{{ totalPages }}</span>
			</p>
			<button
				type="button"
				title="next page"
				@click="emit('upPage')"
				:disabled="totalPages <= 1"
				class="disabled:opacity-75 hover:opacity-75 transition-opacity"
			>
				<ChevronRightIcon class="w-6 h-6" />
			</button>
		</div>
	</section>
</template>
