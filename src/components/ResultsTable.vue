<script setup lang="ts">
import { ref } from 'vue';
import { Email } from '../types/email';

interface Props {
	foundedEmails: Email[];
}

const actualPage = ref(1);

defineProps<Props>();
const emit = defineEmits(['selectEmail', 'changePage']);
</script>

<template>
	<section class="shadow-md rounded-2xl lg:w-1/3 border-gray-100 m-2 h-full">
		<div class="block overflow-y-auto h-5/6">
			<article
				v-for="email in foundedEmails"
				:key="email.message_id"
				@click="emit('selectEmail', email)"
				class="border-y-2 overflow-hidden text-nowrap cursor-pointer hover:bg-slate-200"
			>
				<p class="p-2 w-1/3 text-ellipsis">
					<span class="font-bold">Subject:</span> {{ email.subject }}
				</p>
				<p class="p-2 w-1/3 text-ellipsis">
					<span class="font-bold">To:</span> {{ email.to }}
				</p>
				<p class="p-2 w-1/3 text-ellipsis">
					<span class="font-bold">From:</span> {{ email.from }}
				</p>
			</article>
		</div>
		<div
			class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between h-1/6 justify-center"
		>
			<span class="text-xs xs:text-sm text-gray-900">
				Showing page {{ actualPage }}</span
			>
			<div class="inline-flex mt-2 xs:mt-0">
				<button
					class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
				>
					Prev
				</button>
				<button
					@click="onNextPage()"
					class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
				>
					Next
				</button>
			</div>
		</div>
	</section>
</template>
