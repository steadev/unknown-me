export namespace ChatQuery {
  export const getChats = async () => {
    return await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {},
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: "Hello, world!",
        store: true,
      }),
    });
  };
}
