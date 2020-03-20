import React from "react";

export const ListItemCategory = ({ item }) => {
  if (item.category === "recipe") {
    return (
      <a
        href={item.url}
        alt={item.words.join(" ")}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.words.join(" ")}
      </a>
    );
  } else if (item.category === "dog" || item.category === "cat") {
    return <span>{item.words.join(" ")}</span>;
  } else {
    return item.words.join(" "); // TODO: add support for other categories
  }
};
