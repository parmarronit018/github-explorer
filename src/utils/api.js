const BASE_URL = "https://api.github.com/users";

export const fetchUserData = async (username) => {
  const response = await fetch(`${BASE_URL}/${username}`);

  if (!response.ok) {
    throw new Error("User not found");
  }

  const data = await response.json();
  return data;
};

export const fetchUserRepos = async (username) => {
  const response = await fetch(
    `${BASE_URL}/${username}/repos?per_page=100`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repos");
  }

  const data = await response.json();

  const topRepos = data
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  return topRepos;
};