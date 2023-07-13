import React from "react";
import styled from "styled-components";

const PageUl = styled.ul`
  text-align: center;
  border-radius: 3px;
  color: black;
  // background-color: #ffb06a;
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #ffb06a;
  }
  &:focus::after {
    color: #ffb06a;
    // background-color: #ffb06a;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    color: white;
    background-color: #ffb06a;
  }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <PageUl className="pagination">
          {pageNumbers.map((number) => (
            <PageLi key={number} className="page-item">
              <PageSpan onClick={() => paginate(number)} className="page-link">
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

export default Pagination;