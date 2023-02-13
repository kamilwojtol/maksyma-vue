const URL = 'https://api.quotable.io';

const getRandomQuote = async () => {
  const request = await fetch(`${URL}/random`)
  const data = await request.json();

  return data;
}

export { getRandomQuote }