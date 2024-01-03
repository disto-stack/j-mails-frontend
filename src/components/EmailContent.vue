<script setup lang="ts">
interface EmailContentProps {
	content: string | null | undefined;
}

defineProps<EmailContentProps>();
</script>

<template>
	<div
		class="shadow-md rounded-2xl lg:w-2/3 border-gray-100 m-2 p-4 block overflow-y-auto"
	>
		<span v-if="!content">No e-mails selected</span>
		<p v-if="content" class="whitespace-pre-wrap">{{ content }}</p>
	</div>
</template>
