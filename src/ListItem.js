import React from "react";
import styled from "styled-components";

function ListItem({ Icon, title, onClick }) {
  return (
    <ListItemContainer onClick={onClick}>
      {Icon ? (
        <>
          <Icon style={{ fontSize: "small" }} />
          <p>{title}</p>
        </>
      ) : (
        <div>
          <p>
            <span>#</span> {title}
          </p>
        </div>
      )}
    </ListItemContainer>
  );
}

export default ListItem;

const ListItemContainer = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  margin: 1rem 0;
  cursor: pointer;
  opacity: 0.85;
  transition: 0.1s opacity ease;
  :hover {
    opacity: 1;
  }
  > p {
    margin-left: 10px;
    font-size: 14px;
  }
  > div span {
    margin-left: 2px;
    margin-right: 8px;
  }
  > div p {
    font-size: 14px;
  }
`;
