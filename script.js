const list = document.getElementById("starred-list");

async function fetchStarredRepos() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error("Failed to load repositories");
    }

    const repos = await response.json();
    renderRepos(repos);
  } catch (error) {
    list.innerHTML = `<li class="starred-item">Unable to load starred repositories.</li>`;
    console.error(error);
  }
}

function renderRepos(repos) {
  list.innerHTML = repos.map(repo => {
    const starCount = repo.stars.toLocaleString();
    const starredDate = new Date(repo.starred_at).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });

    return `
      <li class="starred-item">
        <div class="repo-header">
          <div class="repo-name">
            <a href="${repo.url}" target="_blank" rel="noreferrer">
              ${repo.owner}/${repo.name}
            </a>
          </div>
          <span class="repo-language">${repo.language}</span>
        </div>

        <p class="repo-description">${repo.description}</p>

        <div class="repo-meta">
          <span class="star-count">⭐ ${starCount}</span>
          <span class="star-date">Starred ${starredDate}</span>
        </div>
      </li>
    `;
  }).join("");
}

fetchStarredRepos();
