import React, { memo } from 'react';

/**
 * 에러 정보를 표시하는 컴포넌트
 */

const ErrorView = memo(({error}) => {
  return (
    <div>
        <h1>Oops~!! {error.code} Error.</h1>
        <hr />
        <p>{error.message}</p>
    </div>
  )
});

export default ErrorView;