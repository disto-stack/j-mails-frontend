<script setup lang="ts">
interface EmailContentProps {
	content: string | null | undefined;
}

defineProps<EmailContentProps>();
</script>

<template>
	<section class="p-8 bg-gray-800 rounded-xl h-full overflow-y-auto">
		<span v-if="!content">No e-mails selected</span>
		<p v-if="content" class="whitespace-pre-wrap">{{ content }}</p>
	</section>
</template>
