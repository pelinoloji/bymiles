import axios from "axios";

const MyPolicy = ({ policy }) => {
  const noDash = policy?.policy?.policy_ref.split("-").join(" ");

  const carResult = [
    policy?.vehicle?.make,
    policy?.vehicle?.model,
    policy?.vehicle?.colour,
    policy?.vehicle?.reg,
  ];

  const capitalizeFirstLetter = carResult.map((item) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  });

  return (
    <div className="policyContainer">
      {policy ? (
        <div>
          <h3 className="pageTitle">My Policy</h3>

          <div>
            <label htmlFor="ref">Policy Reference:</label>
            <p id="ref">{noDash}</p>
          </div>

          <div className="resultItem">
            <label htmlFor="coverType">Cover Type</label>
            <p id="coverType">{policy?.policy?.cover}</p>
          </div>

          <div className="resultItem">
            <label htmlFor="car">Car</label>
            <p id="car">{capitalizeFirstLetter.join(" ")}</p>
          </div>

          <div className="resultItem">
            <label htmlFor="address">Address</label>
            <p id="address">
              {policy?.policy?.address?.line_1},{" "}
              {policy?.policy?.address?.line_2},{" "}
              {policy?.policy?.address?.postcode}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default MyPolicy;

MyPolicy.getInitialProps = async ({ token }) => {
  try {
    const requestConfig = {
      method: "get",
      url: "https://api.bybits.co.uk/policys/details",
      headers: {
        "Content-Type": "application/json",
        environment: "mock",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.request(requestConfig);
    return { policy: res.data };
  } catch (e) {
    alert("Ups! Can't get the data");
  }
};
