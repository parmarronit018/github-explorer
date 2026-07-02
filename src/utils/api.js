const BASE_URL = "https://api.github.com/users";

export const fetchUserData = async (username) => {
  const response = await fetch(`${BASE_URL}/${username}`);
  if (response.status === 403 || response.status === 429) throw new Error("rate_limit");
  if (response.status === 404) throw new Error("not_found");
  if (!response.ok) throw new Error("fetch_error");
  return response.json();
};

export const fetchUserRepos = async (username) => {
  const response = await fetch(
    `${BASE_URL}/${username}/repos?sort=stars&per_page=5`
  );
  if (response.status === 403 || response.status === 429) throw new Error("rate_limit");
  if (!response.ok) throw new Error("fetch_error");
  return response.json();
};
