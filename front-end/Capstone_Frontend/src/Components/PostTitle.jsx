export default function PostTitle({ postTitle }) {
  return (
    <h3 className="font-bold truncate bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-fit text-transparent bg-clip-text">
      {postTitle}
    </h3>
  );
}
