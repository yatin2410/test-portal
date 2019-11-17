import React from 'react';
import { css } from '@emotion/core';
// First way to import
// import { GridLoader } from 'react-spinners';
import FadeLoader from 'react-spinners/FadeLoader';
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    top:30px;
    left:50%;
    height: 15px;
    width: 5px;
    radius: 2px;
    border-color: #BA55D3;
    
`;
 
class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading mt-5'>
        <FadeLoader
          css={override}
          sizeUnit={"px"}
          size={25}
          color={'rgb(57, 70, 78)'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}

export default Loading;