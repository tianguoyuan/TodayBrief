<template>
  <div class="text-gray-800 bg-gray-100 min-h-screen transition-colors dark:text-gray-200 dark:bg-gray-900">
    <div
      class="mx-auto border-x border-gray-200/70 bg-gray-100 flex flex-col max-w-md min-h-screen shadow-xl dark:border-gray-700/70 dark:bg-gray-900"
    >
      <AppHeader />
      <main class="flex-1">
        <RouterView v-slot="{ Component }">
          <Transition mode="out-in" name="page">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
      <AppTabbar />
    </div>
  </div>
</template>

<style scoped>
  .page-enter-active,
  .page-leave-active {
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }

  .page-enter-from {
    opacity: 0;
    transform: translateY(8px);
  }

  .page-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }
</style>
