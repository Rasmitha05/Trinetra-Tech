import React from 'react';
import classNames from 'classnames';

const Card = ({ className, children }) => {
  return (
    <div className={classNames('bg-white shadow-md rounded-lg p-4', className)}>
      {children}
    </div>
  );
};

const CardContent = ({ className, children }) => {
  return <div className={classNames('p-2', className)}>{children}</div>;
};

export { Card, CardContent };
