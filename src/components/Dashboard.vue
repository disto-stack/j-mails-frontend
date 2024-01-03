<script setup lang="ts">
import EmailContent from './EmailContent.vue';
import ResultsTable from './ResultsTable.vue';
import { Ref, ref } from 'vue';
import { EmailSearchService } from '../services/email-search';
import { Email } from '../types/email';

const searchInputText = ref('');
const emails: Ref<Email[]> = ref([]);
const selectedEmail: Ref<Email | null> = ref(null);

const actualPage = ref(1);

async function searchEmails() {
	emails.value = [];
	selectedEmail.value = null;

	const value = searchInputText.value;

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
	<div class="min-h-screen flex flex-col justify-start">
		<header class="w-full p-2 h-[10vh]">
			<div>
				<input
					class="border shadow-md rounded-2xl border-gray-100 w-full p-2 focus:outline-none"
					type="search"
					name="search"
					v-model="searchInputText"
					@keyup.enter="searchEmails"
					placeholder="Search email"
				/>
			</div>
		</header>

		<main class="w-full lg:flex h-[88vh]">
			<ResultsTable
				:founded-emails="emails"
				@select-email="updateSelectedEmail"
			></ResultsTable>
			<EmailContent :content="selectedEmail?.content"></EmailContent>
		</main>
	</div>
</template>
