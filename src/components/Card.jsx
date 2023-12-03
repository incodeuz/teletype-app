import parse from "html-react-parser";
import { ViewIcon } from "@chakra-ui/icons";
import { Code } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ title, body, views, user, id, createdAt }) => {
  const index = title.indexOf("^*^");
  const navigate = useNavigate();
  return (
    <div className="w-full rounded-lg p-4 border-1 border my-7 hover:border-black duration-150">
      {index > 0 && (
        <div className="w-full h-[200px] bg-slate-200 mb-3 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-contain"
            src={`https://nest-blog.up.railway.app/api/image/${title.slice(
              0,
              index
            )}`}
            alt="poster"
          />
        </div>
      )}
      <div>
        <Link to={`/details/${id}`}>
          <h2 className="card-title text-[27px] font-bold mb-4">
            {title.includes("^*^")
              ? title.slice(index + 3, title.length + 1)
              : title}
          </h2>
        </Link>
        <div className="max-h-[100px] overflow-hidden rounded-md">
          {parse(body)}
        </div>
        <div className="flex items-center justify-between rounded-lg bg-slate-100 py-2 px-3 mt-4">
          <p
            onClick={() => navigate(`/profile/user/${user?.id}`)}
            className="font-bold py-[2px] px-[8px] cursor-pointer rounded-md hover:bg-blue-200"
          >
            {user.username}
          </p>

          <div className="flex items-end flex-col gap">
            <Code>{new Date(createdAt).toDateString()}</Code>

            <div className="flex items-center gap-[2px]">
              <ViewIcon className="text-[20px]" />
              <Code>{views}</Code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
