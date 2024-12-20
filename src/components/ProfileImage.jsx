import React from 'react';
import Image from 'next/image';


export default function ProfileImage({ gender }) {
  // Define paths for male and female images
  const maleImage = '/assets/images/male.webp';
  const femaleImage = '/assets/images/female.webp';

  return (
    <div
      style={{
        borderRadius: '50%',
        marginBottom: '10px'
      }}
    >
      <Image
        src={gender === 'male' ? maleImage : femaleImage}
        alt="User avatar"
        width={150}
        height={150}
        objectFit="cover"
      />
    </div>
  );
}
