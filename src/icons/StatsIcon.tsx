import React from 'react';

const StatsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    width="30"
    height="20"
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.9688 0.878906V1.75781H24.9727H26.9824L22.7812 5.95898L18.5742 10.166L15.9375 7.5293L13.3008 4.89258L6.65039 11.543L0 18.1934L0.597656 18.791C0.931641 19.125 1.22461 19.3945 1.25977 19.3945C1.28906 19.3945 4.01367 16.6992 7.30664 13.4062L13.3008 7.41211L15.9375 10.0488L18.5742 12.6855L23.4082 7.85156L28.2422 3.01758V5.02734V7.03125H29.1211H30V3.51562V0H26.4844H22.9688V0.878906Z"
      fill="currentColor"
      fillOpacity="0.6"
    />
  </svg>
);
export default StatsIcon;
