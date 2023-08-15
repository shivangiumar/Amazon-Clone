import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
function Navbar() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch({
      type: "SET_USER",
      user: null,
    });

    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div>
      <Container>
        <Inner>
          <Logo onClick={() => navigate("/")}>
            <img src="./amazon_logo1.png" alt="" />
          </Logo>

          <SearchBar>
            <input type="text" placeholder="Search..." />
            <SearchIcon onClick={() => navigate("/addproduct")}>
              <img src="./searchIcon.png" alt="" />
            </SearchIcon>
          </SearchBar>
          <RightContainer>
            <NavButton
              onClick={user ? () => signOut() : () => navigate("/login")}
            >
              <p>Hello,</p>
              <p>{user ? user?.fullName : "Guest"}</p>
            </NavButton>
            <NavButton onClick={() => navigate("/orders")}>
              <p>Return</p>
              <p>& Orders</p>
            </NavButton>
            <BasketButton onClick={() => navigate("/checkout")}>
              <img src="./basket-icon.png" alt="" />
              <p>{basket?.length}</p>
            </BasketButton>
          </RightContainer>
        </Inner>
        <MobileSearchbar>
          <input type="text" placeholder="Search..." />
          <SearchIcon onClick={() => navigate("/addproduct")}>
            <img src="./searchIcon.png" alt="" />
          </SearchIcon>
        </MobileSearchbar>
      </Container>
      <NavbarFooter>
        <div className="navbar__footer_text">Best Seller</div>
        <div className="navbar__footer_text">Mobile</div>
        <div className="navbar__footer_text">Amazon Pay</div>
        <div className="navbar__footer_text">Fashion</div>
        <div className="navbar__footer_text">Electronics</div>
        <div className="navbar__footer_text">Prime</div>
        <div className="navbar__footer_text">New Release</div>
        <div className="navbar__footer_text">Customer Service</div>
        <div className="navbar__footer_text">Computers</div>
        <div className="navbar__footer_text">Home & Kitchen</div>
      </NavbarFooter>
    </div>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #131a22;
  display: flex;
  align-items: center;
  position: relative;

  @media only screen and (max-width: 767px) {
    height: 120px;
    flex-direction: column;
  }
`;
const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 767px) {
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  margin-left: 20px;
  cursor: pointer;
  img {
    width: 100px;
    margin-top: 10px;
  }
`;

const SearchBar = styled.div`
  height: 35px;
  flex: 1;
  margin: 0px 15px;
  display: flex;
  align-items: center;

  input {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;

    &::placeholder {
      padding-left: 5px;
    }
  }

  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const MobileSearchbar = styled.div`
  height: 35px;
  width: 90%;
  display: flex;
  align-items: center;
  padding: 10px;

  input {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;

    &::placeholder {
      padding-left: 10px;
    }
  }

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;
const SearchIcon = styled.div`
  background-color: #febd69;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0px 5px 5px 0px;
  img {
    width: 22px;
  }
`;
const RightContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: space-around;
  height: 100%;
  padding: 5px 15px;
`;

const NavButton = styled.div`
  color: #fff;
  padding: 5px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin-right: 15px;

  p {
    &:nth-child(1) {
      font-size: 12px;
      margin-bottom: 0px;
    }

    &:nth-child(2) {
      font-size: 14px;
      font-weight: 600;
      margin-top: 4px;
    }
  }
`;

const BasketButton = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
  cursor: pointer;

  img {
    width: 30px;
    margin-right: 10px;
  }

  p {
    color: #fff;
    font-weight: 500;
  }
`;
const NavbarFooter = styled.div`
  width: 100vw;
  height: 30px;
  background-color: #22303e;
  color: white;
  display: flex;
  div {
    margin: 5px 10px;
    font-size: 14px;
    font-weight: bold;
  }
`;
export default Navbar;
