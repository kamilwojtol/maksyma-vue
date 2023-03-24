const URL = "https://api.quotable.io";

const getRandomQuote = async () => {
  try {
    const request = await fetch(`${URL}/random`);
    const data = await request.json();

    return data;
  } catch {
    throw new Error("Problem with fetching random quote data");
  }
};

const getQuotesListWithTag = async (tag: string) => {
  try {
    const request = await fetch(`${URL}/quotes?tags=${tag}`);
    const data = await request.json();

    return data;
  } catch {
    throw new Error("Problem with fetching list data");
  }
};

export { getRandomQuote, getQuotesListWithTag };
