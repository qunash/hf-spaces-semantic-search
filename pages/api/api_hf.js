
const predict = async (query, num_results=10) => {
  try {
    
    const response = await fetch("https://anzorq-spaces-semantic-search-api.hf.space/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [query.trim(), num_results] }),
    })
    const json = await response.json()
    // console.debug("API response: ", json)
    return json.data[0].data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { predict }