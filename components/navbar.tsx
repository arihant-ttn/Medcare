import Link from 'next/link';
import Image from 'next/image';
import styles from "./styles/navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles["nav-container"]}>
        <div className={styles['list-container']}>

        
      <div className={styles['logo-title']}>
        <span><div className={styles['frame']}> <Image 
        src="/Trust.png" 
        alt="Logo"
        width={30} 
        height={30} 
      /></div></span> 
        <h1>MedCare</h1> 
      </div>
      <ul className={styles['link-list']}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/appointment">Appointment</Link></li>
        <li><Link href="/healthblog">Health Blog</Link></li>
        <li><Link href="/reviews">Reviews</Link></li>
      </ul>
      </div>
      <div className={styles['buttons']}>
        <Link href="/login"><button className={styles['login']}>Login</button></Link>
        <Link href="/signUp"><button className={styles['register']}>Register</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;
