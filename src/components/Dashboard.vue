<script setup lang="ts">
import EmailContent from './EmailContent.vue';
import ResultsTable from './ResultsTable.vue';
import { Ref, ref, computed } from 'vue';
import { EmailSearchService } from '../services/email-search';
import { Email } from '../types/email';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';

const searchInputText = ref('');
const emails: Ref<Email[]> = ref([]);
const selectedEmail: Ref<Email | null> = ref(null);

const fromEmail = ref(0);

let lastSearchedValue: string;

const actualPage = computed(() => {
	return Math.trunc(fromEmail.value / 10) + 1;
});
const totalPages = ref(1);

async function searchEmails() {
	const value = searchInputText.value;

	if (value.length === 0) {
		return;
	}

	emails.value = [];
	selectedEmail.value = null;
	fromEmail.value = 0;

	lastSearchedValue = value;

	searchInServer(value);
}

async function searchInServer(term: string) {
	try {
		const foundedElements = await EmailSearchService.searchByTerm(
			term,
			fromEmail.value
		);
		const foundedEmails = foundedElements.data.data.hits.hits.map((dataHit) => {
			return dataHit._source;
		});

		const totalPagesValue = foundedElements.data.data.hits.total.value;

		emails.value = foundedEmails;

		totalPages.value = Math.ceil(totalPagesValue / 10);
	} catch (error) {
		console.error(error);
	}
}

function updateSelectedEmail(email: Email) {
	selectedEmail.value = email;
}

function upNextPage() {
	if (actualPage.value >= totalPages.value) {
		return;
	}

	fromEmail.value += 10;
	searchInServer(lastSearchedValue);
}

function downPreviousPage() {
	if (actualPage.value === 1) {
		return;
	}

	fromEmail.value -= 10;
	searchInServer(lastSearchedValue);
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
				:actual-page="actualPage"
				:total-pages="totalPages"
				@select-email="updateSelectedEmail"
				@up-page="upNextPage"
				@down-page="downPreviousPage"
			></ResultsTable>
		</main>

		<aside class="col-span-2 row-start-1 row-end-7">
			<EmailContent :content="selectedEmail?.content"></EmailContent>
		</aside>
	</div>
</template>
