import PropTypes from 'prop-types';

export default function AccountProfile({ avatar, name, size, className }) {
  const SIZE = { SM: '24', MD: '32', LG: '48' };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img
        src={avatar}
        width={SIZE[size ?? 'MD']}
        height={SIZE[size ?? 'MD']}
        alt={name}
        className="rounded-full"
        data-testid="avatar"
      />
      <span className="font-bold">{name}</span>
    </div>
  );
}

AccountProfile.propTypes = {
  /** Avatar image url */
  avatar: PropTypes.string.isRequired,
  /** Avatar size */
  size: PropTypes.oneOf(['SM', 'MD', 'LG']).isRequired,
  /** User profile name  */
  name: PropTypes.string.isRequired,
};
