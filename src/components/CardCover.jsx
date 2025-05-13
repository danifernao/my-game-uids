import { CardContext } from "./Card";
import { useContext, useEffect } from "react";

function Cover() {
  const [data, pathname] = useContext(CardContext);
  const cover = data[pathname].cover;

  const coverHas = (name) => {
    return typeof cover !== "undefined" && typeof cover[name] !== "undefined";
  };

  useEffect(() => {
    document.body.classList.toggle("has-avatar", coverHas("avatar"));
    document.body.classList.toggle(
      "has-cover-background",
      coverHas("background")
    );
  });

  return (
    cover && (
      <div
        className="cover"
        style={{
          backgroundImage: cover.background
            ? `url("images/${cover.background}")`
            : "none",
        }}
      >
        {cover.avatar && (
          <img
            className="avatar"
            src={`images/${cover.avatar}`}
            alt=""
            key={cover.avatar}
          />
        )}
      </div>
    )
  );
}

export default Cover;
