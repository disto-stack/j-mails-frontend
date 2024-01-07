<script setup lang="ts">
import EmailContent from './EmailContent.vue';
import ResultsTable from './ResultsTable.vue';
import { Ref, ref } from 'vue';
import { EmailSearchService } from '../services/email-search';
import { Email } from '../types/email';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';

const searchInputText = ref('');
const emails: Ref<Email[]> = ref([]);
const selectedEmail: Ref<Email | null> = ref(null);

async function searchEmails() {
	emails.value = [];
	selectedEmail.value = null;

	const value = searchInputText.value;

	if (value.length === 0) {
		return;
	}

	try {
		const foundedElements = await EmailSearchService.searchByTerm(value);

		const foundedEmails = foundedElements.data.data.hits.hits.map((dataHit) => {
			return dataHit._source;
		});

		emails.value = foundedEmails;
	} catch (error) {
		console.error(error);
	}
}

function updateSelectedEmail(email: Email) {
	selectedEmail.value = email;
	console.log(selectedEmail.value);
}
</script>

<template>
	<div
		class="grid grid-cols-4 grid-rows-6 h-screen bg-gray-900 text-gray-200 p-8 gap-5"
	>
		<header class="flex justify-between col-span-2">
			<h1
				class="text-3xl font-bold text-gray-100 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
			>
				Jmails
			</h1>
			<div class="relative">
				<input
					class="border-gray-100 focus:outline-none border-0 bg-gray-800 text-gray-200 p-2 w-64 rounded-full pl-10"
					type="search"
					name="search"
					v-model="searchInputText"
					@keyup.enter="searchEmails"
					placeholder="Search email"
				/>

				<button @click="searchEmails">
					<MagnifyingGlassIcon
						class="w-6 h-6 text-gray-400 absolute top-2 left-2"
					/>
				</button>
			</div>
		</header>

		<main class="p-2 col-span-2 row-start-2 row-end-7">
			<ResultsTable
				:founded-emails="emails"
				@select-email="updateSelectedEmail"
			></ResultsTable>
		</main>

		<aside class="col-span-2 row-start-1 row-end-7">
			<EmailContent :content="selectedEmail?.content"></EmailContent>
		</aside>
	</div>
</template>
