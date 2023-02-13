<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Maxim from './Maxim.vue';
import { getRandomQuote } from '../services/MaximService';

const randomQuote = ref(<any>[]);
const quoteHistory = ref(<any>[]);
let activeQuote = ref(0);

const refreshQuote = async () => {
  const quote = await getRandomQuote();
  quoteHistory.value.push(quote);
  activeQuote.value++;

  randomQuote.value = quote;
}

const prevQuote = () => {
  console.log('prevQuote');
  if (activeQuote.value > 1) {
    console.log('go 1 step back');
    activeQuote.value--;
    randomQuote.value = quoteHistory.value[activeQuote.value - 1]
  }
}

const nextQuote = async () => {
  console.log('nextQuote');
  if (quoteHistory.value.length > activeQuote.value) {
    console.log('go next 1 step next')
    randomQuote.value = quoteHistory.value[activeQuote.value];
    activeQuote.value++;
  } else {
    console.log('generate new quote');
    await refreshQuote();
  }
}

onMounted(async () => {
  await refreshQuote();
})
</script>

<template>
  <div v-if="randomQuote" class="random-quote">
    <p>Yours quote is:</p>
    <Maxim :quote="randomQuote"/>
    <button @click="nextQuote">Next Quote</button>
    <button @click="prevQuote" :disabled="activeQuote === 1">Previous Quote</button>
  </div>
</template>