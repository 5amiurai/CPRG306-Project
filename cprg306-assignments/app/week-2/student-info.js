import Link from 'next/link';

export default function StudentInfo() { // exporting the StudentInfo component
  return (
    <div>
      <p>Your Name: Mhd Sami Rizk</p>
      <p>
        GitHub Repository: 
        <Link href="https://github.com/5amiurai?tab=repositories">
          <a target="_blank">5amiurai - cprg306-assignments</a>
        </Link>
      </p>
    </div>
  );
}