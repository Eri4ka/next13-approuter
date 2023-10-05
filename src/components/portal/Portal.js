'use client';

import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const Portal = ({ children, container }) => {
  const [isMounted, setIsMounted] = useState(null);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted && createPortal(children, container);
};

Portal.propTypes = {
  children: PropTypes.node,
  container: PropTypes.node,
};
