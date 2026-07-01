function UserCard({ user }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center text-center">
      <img
        src={user.avatar_url}
        alt="avatar"
        className="w-32 h-32 rounded-full border-2 border-gray-700 mb-4"
      />
      <h2 className="text-xl font-bold text-white">
        {user.name ? user.name : user.login}
      </h2>
      <p className="text-gray-400 text-sm mt-1 mb-4">
        {user.bio ? user.bio : "No bio available"}
      </p>
      <div className="flex gap-6 text-sm text-gray-300">
        <span>Followers: {user.followers}</span>
        <span>Following: {user.following}</span>
        <span>Public Repos: {user.public_repos}</span>
      </div>
    </div>
  );
}

export default UserCard;