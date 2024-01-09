<script setup lang="ts">
import Highlighter from 'vue-highlight-words';

interface EmailContentProps {
	content: string | null | undefined;
	searchWords: string[];
}

defineProps<EmailContentProps>();
</script>

<template>
	<section class="p-8 bg-gray-800 rounded-xl h-full overflow-y-auto">
		<span v-if="!content">No e-mails selected</span>
		<Highlighter
			class="whitespace-pre-wrap"
			v-if="content && searchWords"
			:search-words="searchWords"
			:auto-escape="true"
			:text-to-highlight="content"
		/>
	</section>
</template>
