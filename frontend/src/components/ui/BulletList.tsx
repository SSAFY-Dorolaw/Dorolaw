import React from 'react';
import styles from '@/app/styles/BulletList.module.css';

interface BulletListProps {
  items: string[];
  bulletType?: 'default' | 'square' | 'circle' | 'arrow' | 'check';
}

// bulletType 원하는거로 바꾸면 됨
const BulletList = ({ items, bulletType = 'check' }: BulletListProps) => {
  let bulletClass = styles.bulletList;

  switch (bulletType) {
    case 'square':
      bulletClass += ` ${styles.squareBullet}`;
      break;
    case 'circle':
      bulletClass += ` ${styles.circleBullet}`;
      break;
    case 'arrow':
      bulletClass += ` ${styles.arrowBullet}`;
      break;
    case 'check':
      bulletClass += ` ${styles.checkBullet}`;
      break;
    default:
      break;
  }

  return (
    <ul className={bulletClass}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default BulletList;
