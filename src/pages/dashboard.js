import styled from "@emotion/styled";
import Link from "next/link";

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 20%;
  background-color: #f3f3f3; /* Light gray for the sidebar */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #8e24aa; /* Purple background for the profile image */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProfileText = styled.span`
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const SidebarItem = styled.button`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  background-color: #9370db; /* Purple button */
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #7b1fa2; /* Darker purple on hover */
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #808080; /* Main gray content area */
  display: flex;
  flex-direction: column;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const NavLink = styled.a`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #333; /* Dark gray for readability */
  text-align: center;
  text-decoration: none;

  &.active {
    color: #3949ab; /* purple color for links */
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
  }
`;

const MainContent = styled.div`
  background-color: white;
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 1.5rem;
`;

export default function Dashboard() {
  return (
    <DashboardContainer>
      {/* Sidebar */}
      <Sidebar>
        <ProfileImage>
          <ProfileText>👤</ProfileText>
        </ProfileImage>
        <SidebarItem>Your Profile</SidebarItem>
        <SidebarItem>Voted</SidebarItem>
        <SidebarItem>Poll Created</SidebarItem>
        <SidebarItem>Logout</SidebarItem>
      </Sidebar>

      {/* Main Content Area */}
      <ContentArea>
        <NavBar>
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/dashboard" className="active">
            Dashboard
          </NavLink>
        </NavBar>
        <MainContent>Your details</MainContent>
      </ContentArea>
    </DashboardContainer>
  );
}
