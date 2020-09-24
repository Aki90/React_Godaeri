import React from 'react';
import PropTypes from 'prop-types';

const MenuList = ({ menus }) => {
  return (
    <section>
      <ul className="wrapper">
        {menus.map(menuItem => {
          return (
            <li className="menu" key={menuItem.id}>
              <span>
                <img src={menuItem.url} alt={menuItem.alt} />
                <em></em>
                <strong>{menuItem.alt}</strong>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

MenuList.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MenuList;
