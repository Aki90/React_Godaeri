import React from 'react';
import PropTypes from 'prop-types';

import AppHeader from '@/components/common/AppHeader';
import AppFooter from '@/components/common/AppFooter';
import MobileSlide from '@/components/common/MobileSlide';

const AppLayout = ({ children }) => {
  return (
    <>
      <AppHeader />
      <main>
        <div className="container">
          <div className="row">{children}</div>
        </div>
      </main>
      <AppFooter />
      <MobileSlide />
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
