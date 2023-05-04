import "./home.scss";

//svg
import Image1 from "../../assets/svg/undraw_learning_re_32qv.svg";
import Image2 from "../../assets/svg/undraw_knowledge_re_5v9l.svg";
import Image3 from "../../assets/svg/undraw_learning_sketching_nd4f.svg";
import Image4 from "../../assets/svg/undraw_online_learning_re_qw08.svg";
import Image5 from "../../assets/svg/undraw_educator_re_ju47.svg";
import Creativity from "../../assets/svg/creativity-svgrepo-com.svg";
import Logic from "../../assets/svg/puzzle-svgrepo-com.svg";
import Activity from "../../assets/svg/football-svgrepo-com.svg";
import Health from "../../assets/svg/google-fit-svgrepo-com.svg";
import CreativityIcon from "../../assets/svg/creativity.svg";
import EduCapIcon from "../../assets/svg/educap.svg";
import BiologyIcon from "../../assets/svg/biology.svg";
import ComputerIcon from "../../assets/svg/computer.svg";
import MathIcon from "../../assets/svg/math.svg";
import SportIcon from "../../assets/svg/sport.svg";

//built-in hooks and components
import { Link } from "react-router-dom";
import { useRef } from "react";

//custom hooks
import useInView from "../../hooks/useInView";
import useToggleClass from "../../hooks/useToggleClass";
import useGetJsonData from "../../hooks/useGetJsonData";
import PostExcerpt from "../../components/Post/PostExcerpt";

//content variables
const heroImages = [
  {
    id: "hero__image-1",
    src: Image1,
  },
  {
    id: "hero__image-2",
    src: Image2,
  },
  {
    id: "hero__image-3",
    src: Image3,
  },
  {
    id: "hero__image-4",
    src: Image4,
  },
];

const cardsContent = [
  {
    img: Creativity,
    title: "Creativity",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    img: Logic,
    title: "Logic",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    img: Activity,
    title: "Activities",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    img: Health,
    title: "Health",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const postsContent = [
  {
    id: 1,
    title: "How to become Success",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem dolor sed viverra ipsum nunc aliquet. Imperdiet massa tincidunt nunc pulvinar. Dictum fusce ut placerat orci. Nisl suscipit adipiscing bibendum est ultricies. Est pellentesque elit ullamcorper dignissim cras tincidunt. Tempor id eu nisl nunc mi ipsum faucibus.",
    created_date: "2023-03-31T07:17:35.768Z",
  },
  {
    id: 2,
    title: "How to become Success",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem dolor sed viverra ipsum nunc aliquet. Imperdiet massa tincidunt nunc pulvinar. Dictum fusce ut placerat orci. Nisl suscipit adipiscing bibendum est ultricies. Est pellentesque elit ullamcorper dignissim cras tincidunt. Tempor id eu nisl nunc mi ipsum faucibus.",
    created_date: "2023-03-31T07:17:35.768Z",
  },
  {
    id: 3,
    title: "How to become Success",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem dolor sed viverra ipsum nunc aliquet. Imperdiet massa tincidunt nunc pulvinar. Dictum fusce ut placerat orci. Nisl suscipit adipiscing bibendum est ultricies. Est pellentesque elit ullamcorper dignissim cras tincidunt. Tempor id eu nisl nunc mi ipsum faucibus.",
    created_date: "2023-03-31T07:17:35.768Z",
  },
];

const Home = () => {
  const heroRef = useRef();
  const section2 = useRef();
  const section3 = useRef();
  const section4 = useRef();
  const intersectImg = useRef();

  const text = useGetJsonData("text");

  const elements = useInView(
    [heroRef, section2, intersectImg, section3, section4],
    {
      threshold: 0.5,
    }
  );
  useToggleClass(elements, "show");

  const heroImageRender = heroImages.map((image) => (
    <img key={image.id} className={image.id} src={image.src} alt={image.id} />
  ));

  const iconRender = (
    <>
      <img
        className="icon"
        src={EduCapIcon}
        style={{ top: "25dvh", left: "60dvw", transform: "rotate(10deg)" }}
      />
      <img
        className="icon"
        src={CreativityIcon}
        style={{ top: "70dvh", left: "25dvw", transform: "rotate(9deg)" }}
      />
      <img
        className="icon"
        src={BiologyIcon}
        style={{ top: "15dvh", left: "30dvw", transform: "rotate(17deg)" }}
      />
      <img
        className="icon"
        src={ComputerIcon}
        style={{ top: "45dvh", left: "5dvw", transform: "rotate(-7deg)" }}
      />
      <img
        className="icon"
        src={MathIcon}
        style={{ top: "55dvh", left: "80dvw", transform: "rotate(-14deg)" }}
      />
      <img
        className="icon"
        src={SportIcon}
        style={{ top: "60dvh", left: "60dvw", transform: "rotate(68deg)" }}
      />
    </>
  );

  const cardsRender = cardsContent.map((card) => (
    <figure key={card.title}>
      <img src={card.img} />
      <h3>{card.title}</h3>
      <figcaption>{card.caption}</figcaption>
    </figure>
  ));

  const postsRender = postsContent.map((post) => (
    <PostExcerpt key={post.id} post={post} />
  ));

  return (
    <div className="home">
      <section
        className="home__hero background-gradient"
        ref={heroRef}
        data-inview="hero"
      >
        <div className="home__inner custom-container">
          <div className="hero__content">
            <h1>Brand</h1>
            <p>{text}</p>
            {/* <Link>
              <button className="secondary-btn">GET STARTED</button>
            </Link> */}
          </div>
          {heroImageRender}
          {iconRender}
        </div>
      </section>

      <img
        ref={intersectImg}
        src={Image5}
        className="intersecting-img"
        alt="Intersecting Img"
        data-inview="intersectingImg"
      />

      <section
        className="home__section-2"
        ref={section2}
        data-inview="section2"
      >
        <div className="section-2__inner custom-container vertical-items-center">
          <div className="section-2__cards">{cardsRender}</div>
          <div className="section-2__content">
            <h1>The quickest way to hell is to shit on somebody's head</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              dolor sed viverra ipsum nunc aliquet. Imperdiet massa tincidunt
              nunc pulvinar. Dictum fusce ut placerat orci. Nisl suscipit
              adipiscing bibendum est ultricies. Est pellentesque elit
              ullamcorper dignissim cras tincidunt. Tempor id eu nisl nunc mi
              ipsum faucibus. Facilisis sed odio morbi quis commodo odio aenean
              sed.
            </p>
            <button className="secondary-outlined-btn mt-4">
              Read More &nbsp; &rarr;
            </button>
          </div>
        </div>
      </section>

      <section
        className="home__section-3 vertical-items-center"
        ref={section3}
        data-inview="section3"
      >
        <div className="section-3__inner custom-container">
          <div className="section-3__about">
            <h1>| About Us</h1>
            <p>We are One</p>
            <p>{text}</p>
            <button className="secondary-outlined-btn mt-3">
              Read More &nbsp; &rarr;
            </button>
          </div>
          <div className="section-3__img"></div>
        </div>
      </section>

      <section
        className="section-4 vertical-items-center"
        ref={section4}
        data-inview="section4"
      >
        <div className="section-4__inner custom-container">
          <h1 className="text-center">Our Blogs</h1>
          <div className="section-4__posts">{postsRender}</div>
        </div>
      </section>
    </div>
  );
};
export default Home;
