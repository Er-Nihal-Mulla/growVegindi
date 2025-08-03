import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="Grow Vejindi Logo">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M12 2L8 6H16L12 2Z"
          fill="#90EE90"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 9L5 6H19L22 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 22V6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 20C16 17.7909 14.2091 16 12 16C9.79086 16 8 17.7909 8 20C8 21.1046 8.89543 22 10 22H14C15.1046 22 16 21.1046 16 20Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
         <path
          d="M12 16V12C12 10.3431 13.3431 9 15 9C16.6569 9 18 10.3431 18 12C18 13.3431 17.1667 14.6667 16 15.5"
          stroke="#90EE90"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-headline text-2xl font-bold text-primary">Grow Vejindi</span>
    </div>
  );
}
