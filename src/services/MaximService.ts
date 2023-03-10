const URL = "https://api.quotable.io";

const getRandomQuote = async () => {
  const request = await fetch(`${URL}/random`);
  const data = await request.json();

  return data;
};

const getQuotesListWithTag = async (tag: string) => {
  const request = await fetch(`${URL}/quotes?tags=${tag}`);
  const data = await request.json();

  return data;
};

export { getRandomQuote, getQuotesListWithTag };
