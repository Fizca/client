import styled from 'styled-components';

const Quote = styled.div`
  display: flex;
  padding: 0 20px;

  /* Blockquote main style */
  .blockquote {
    position: relative;
    max-width: 620px;
    margin: 80px auto;
    align-self: center;
  }

  /* Blockquote header */
  .blockquote h1 {
    overflow-wrap: break-word;
    // word-wrap: break-word;
    hyphens: auto;

    position: relative; /* for pseudos */
    color: var(--text);
    font-size: 2.8rem;
    font-weight: normal;
    line-height: 1;
    margin: 0;
    border: 2px solid #fff;
    border-radius:20px;
    border-color: var(--fox-color-shadow);
    padding: 25px;
  }

  /* Blockquote right double quotes */
  .blockquote h1:after {
    content:"";
    position: absolute;
    border: 2px solid #e74848;
    border-radius: 0 50px 0 0;
    width: 60px;
    height: 60px;
    bottom: -60px;
    left: 50px;
    border-bottom: none;
    border-left: none;
    z-index: 3;
  }

  .blockquote h1:before {
    content:"";
    position: absolute;
    width: 80px;
    border: 6px solid var(--bg);
    bottom: -3px;
    left: 50px;
    z-index: 2;
  }

  /* increase header size after 600px */
  @media all and (min-width: 600px) {
    .blockquote h1 {
      font-size: 3rem;
      line-height: 1.2;
    }
  }

  /* Blockquote subheader */
  .blockquote h4 {
    position: relative;
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 1.2;
    margin: 0;
    padding-top: 15px;
    z-index: 1;
    margin-left:150px;
    padding-left:12px;
  }

  .blockquote h4:first-letter {
    margin-left:-12px;
  }
`;

export const Bubble = styled(Quote)`
  padding: 0 10px;
  width: 100%;

  /* Blockquote main style */
  .blockquote {
    width: 100%;
    margin: 0px auto 80px auto;
  }

  /* Blockquote header */
  .blockquote h1 {
    text-align: left;
    white-space: pre-line;

    font-size: 2rem;
    text-transform: none;
    letter-spacing: initial;

    margin: 0;
    border-width: 0;
    border-bottom-width: 1px;
  }

  /* Blockquote right double quotes */
  .blockquote h1:after {
    border-width: 1px;
    z-index: 3;
  }
`;

export default Quote;
