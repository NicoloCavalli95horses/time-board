<template>
	<div class="lang-icon" @click="toggleLang">{{ flagIcon }}</div>
</template>

<script setup>
//===========================
// Import
//===========================
import { computed, ref } from 'vue';
import { currentLanguage, availableLanguages, setLanguage } from "../i18n";


//===========================
// Const
//===========================
const flagIcon = computed(() =>
	currentLanguage.value === "it" ? "🇮🇹" :
	currentLanguage.value === "fr" ? "🇫🇷" :
	"🇬🇧"
);

//===========================
// Functions
//===========================
function toggleLang() {
	const idx = availableLanguages.indexOf(currentLanguage.value);
	const next = availableLanguages[(idx + 1) % availableLanguages.length];
	setLanguage(next);
}
</script>

<style lang="scss" scoped>
.lang-icon {
	font-size: 22px;
	cursor: pointer;
}
</style>