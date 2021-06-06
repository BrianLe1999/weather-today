import React from 'react';
import { string, number } from 'prop-types';
import { Spinner } from 'react-bootstrap';
import './loading.css';

const Loading = ({
  type, color
}) => {
  if (type === 'icon') {
    return <Spinner animation="border" color={color} variant="primary" size="sm" />;
  }
  return (
    <div className="loading">
      <Spinner animation="border" variant="primary" />
    </div>

  );
};
Loading.defaultProps = {
  type: 'round',
  color: '#29A8F1',
  mode: null,
  width: 32,
  height: 32,
};

Loading.propTypes = {
  type: string,
  color: string,
  mode: string,
  width: number,
  height: number,
};

export default Loading;
