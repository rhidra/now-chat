class ApiProxy {
  static async getUsers() {
    const url = process.env.NODE_ENV === 'production' ? 'https://now-chat-1.herokuapp.com/users' : 'http://localhost:3001/users';
    const res = await fetch(url);
    return await res.json();
  }

  static async updateUsername(username, peerId) {
    const url = process.env.NODE_ENV === 'production' ? 'https://now-chat-1.herokuapp.com/username' : 'http://localhost:3001/username';
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({username, peerId})
    });
    if (!res.ok) {
      console.error('Error updating username:', res);
    }
    return;
  }
}

export default ApiProxy;