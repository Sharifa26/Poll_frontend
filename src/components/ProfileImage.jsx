import React from 'react';

export default function ProfileImage({ gender }) {
  // Define paths for male and female images
  const maleImage = '/assets/images/male.webp';
  const femaleImage = '/assets/images/female.webp';

  return (
    <img
      src={gender === 'male' ? maleImage : femaleImage}
      alt="User avatar"
      style={{
        borderRadius: '50%',
        marginBottom: '10px',
        width: '150px', // Adjust size
        height: '150px', // Adjust size
        objectFit: 'cover',
      }}
    />
  );
}
