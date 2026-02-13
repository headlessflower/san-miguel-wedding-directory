<template>
    <div class="layout layout--default">
        <AppHeader />
        <main class="layout__main">
            <slot />
        </main>
        <AppFooter />
    </div>
</template>

<style scoped>
.layout__main {
    min-width: 0;
}
</style>
