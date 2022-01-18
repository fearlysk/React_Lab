import styles from "./Footer.module.scss";
import footerLinks from "../../constants/footer";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.headline}>
        <h2>Incredible convinient</h2>
      </div>
      <div className={styles.companies}>
        {footerLinks.map((link) => (
          <div key={link.id}>
            <a href={link.url} rel="noreferrer" target="_blank">
              <img className={styles.image} src={link.image} alt="Not found" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;
