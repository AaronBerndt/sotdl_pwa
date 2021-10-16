import styled from "styled-components";

export const Unselectable = styled.div`
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;

  /*
     Introduced in Internet Explorer 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
  -ms-user-select: none;
  user-select: none;
`;
