import "./topbox.scss";

const TopBox = ({ title, data }) => {
  return (
    <div className="topbox">
      <h1 className="title">{title}</h1>
      <ul>
        {data?.map((category) => (
          <li className="usercontainer" key={category._id}>
            <div className="user">
              <div className="userInfo">
                <span>{category._id}</span>
              </div>
            </div>
            <p>$ {category.revenue}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopBox;
