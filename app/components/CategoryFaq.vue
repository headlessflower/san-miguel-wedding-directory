<template>
    <section v-if="items?.length" class="catFaq">
        <div class="container catFaq__inner">
            <h2 class="catFaq__title">{{ title }}</h2>

            <div class="catFaq__list">
                <details v-for="(it, i) in items" :key="i" class="catFaq__item">
                    <summary class="catFaq__q">{{ it.q }}</summary>
                    <div class="catFaq__a">
                        <p>{{ it.a }}</p>
                    </div>
                </details>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    items: Array<{ q: string; a: string }> | undefined;
}>();
</script>

<style scoped>
.catFaq {
    padding: var(--s-7) 0;
}
.catFaq__title {
    font-size: 24px;
}
.catFaq__list {
    margin-top: var(--s-4);
    display: grid;
    gap: var(--s-3);
}
.catFaq__item {
    padding: var(--s-4);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--surface);
}
.catFaq__q {
    cursor: pointer;
    font-weight: 900;
}
.catFaq__a {
    margin-top: var(--s-2);
    color: rgba(20, 20, 20, 0.78);
}
</style>
