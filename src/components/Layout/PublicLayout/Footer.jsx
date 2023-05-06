import "./footer.scss";

//svg
import Facebook from "../../../assets/svg/facebook-color-svgrepo-com.svg";
import Google from "../../../assets/svg/google-color-svgrepo-com.svg";
import Youtube from "../../../assets/svg/youtube-color-svgrepo-com.svg";
import Instagram from "../../../assets/svg/instagram-2016-logo-svgrepo-com.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__inner">
        <div className="footer__copy-right">&#169; Liu Liu Coporation</div>
        <div className="footer__contact">
          <p className="fw-400">Contact Us</p>
          <div className="footer__contact-icon">
            <a
              href="https://www.facebook.com/photo/?fbid=1197728193951834&set=pob.100011439946066"
              target="_blank"
            >
              <img src={Facebook} />
            </a>
            <a>
              <img src={Google} />
            </a>
            <a>
              <img src={Youtube} />
            </a>
            <a>
              <img src={Instagram} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
