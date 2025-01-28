import Link from 'next/link';

export default function StudentInfo() { // exporting the StudentInfo component
  return (
    <div>
      <p>Mhd Sami Rizk</p> 
      <p>
        GitHub Repository:{" "} {/* adding space after the : */}
        <Link href="https://github.com/5amiurai/CPRG306-assignments">
         5amiurai - cprg306-assignments
        </Link>
      </p>
    </div>
  );
}