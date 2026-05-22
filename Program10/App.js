import React, { Component } from 'react';
import './App.css';

// Program 10: BCSL657B - VTU React Lab
// Class-based component with lifecycle methods:
// - componentDidMount: fetch data from JSONPlaceholder API on load
// - componentDidUpdate: re-fetch when search/filter state changes
// - Error handling for failed API calls
// - User interactions: search, filter by userId, pagination

class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      error: null,
      search: '',
      filterUser: '',
      page: 1,
      perPage: 5,
    };
  }

  // Lifecycle: runs after component mounts - initial API fetch
  componentDidMount() {
    this.fetchPosts();
  }

  // Lifecycle: runs when state/props change - re-fetch on search/filter
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.filterUser !== this.state.filterUser ||
      prevState.page !== this.state.page
    ) {
      this.fetchPosts();
    }
  }

  fetchPosts() {
    this.setState({ loading: true, error: null });
    const { page, perPage, filterUser } = this.state;

    let url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${perPage}`;
    if (filterUser) url += `&userId=${filterUser}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        this.setState({ posts: data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
      });
  }

  getFilteredPosts() {
    const { posts, search } = this.state;
    if (!search.trim()) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.body.toLowerCase().includes(search.toLowerCase())
    );
  }

  render() {
    const { loading, error, search, filterUser, page } = this.state;
    const filtered = this.getFilteredPosts();

    return (
      <div className="fetcher-container">
        <h2>VTU BCSL657B – Program 10: Class Component + Lifecycle Methods</h2>
        <p className="subtitle">Fetching from JSONPlaceholder API using componentDidMount & componentDidUpdate</p>

        {/* Controls */}
        <div className="controls">
          <input
            type="text"
            placeholder="🔍 Search posts..."
            value={search}
            onChange={(e) => this.setState({ search: e.target.value, page: 1 })}
            className="ctrl-input"
          />
          <select
            value={filterUser}
            onChange={(e) => this.setState({ filterUser: e.target.value, page: 1 })}
            className="ctrl-select"
          >
            <option value="">All Users</option>
            {[1, 2, 3, 4, 5].map((u) => (
              <option key={u} value={u}>User {u}</option>
            ))}
          </select>
          <button className="refresh-btn" onClick={() => this.fetchPosts()}>
            🔄 Refresh
          </button>
        </div>

        {/* Status */}
        {loading && <div className="status loading">⏳ Fetching data...</div>}
        {error && <div className="status error">❌ Error: {error}</div>}

        {/* Post Table */}
        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <p className="empty">No posts found matching your criteria.</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Title</th>
                    <th>Body Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((post) => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>User {post.userId}</td>
                      <td>{post.title}</td>
                      <td>{post.body.substring(0, 60)}...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Pagination */}
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => this.setState((s) => ({ page: Math.max(1, s.page - 1) }))}
                disabled={page === 1}
              >
                ← Prev
              </button>
              <span className="page-info">Page {page}</span>
              <button
                className="page-btn"
                onClick={() => this.setState((s) => ({ page: s.page + 1 }))}
                disabled={filtered.length === 0}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <DataFetcher />
      </div>
    );
  }
}

export default App;
