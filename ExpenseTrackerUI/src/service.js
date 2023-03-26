export async function getTransactions () {
    try {
      const response = await fetch ("http://localhost:5000/history");
      return response.json();
    }catch(error) {
      return [];
  }
  }