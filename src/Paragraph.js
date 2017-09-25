import React from 'react';
import PropTypes from 'prop-types';
import site from './site';

const Paragraph = ({ mapper, uuid, page, index, paragraphProps }) => {
  const paragraph = site.getData(uuid);

  if(!paragraph) {
    return null;
  }

  const bundle = `${paragraph.__hn.entity.type}__${paragraph.__hn.entity.bundle}`;

  const Component = (typeof mapper === 'object' && page.type) ? mapper[bundle] : mapper(page, bundle);

  if(!Component) {
    return null;
  }

  return (
    <Component
      type={paragraph.type.target_id}
      page={page}
      paragraph={paragraph}
      index={index}
      {...paragraphProps}
    />
  );
};

Paragraph.propTypes = {
  mapper: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.func,
  ]).isRequired,
  uuid: PropTypes.string.isRequired,
  page: PropTypes.shape({}),
  index: PropTypes.number.isRequired,
  paragraphProps: PropTypes.shape(),
};

Paragraph.defaultProps = {
  paragraphProps: {}
};

export default Paragraph;
